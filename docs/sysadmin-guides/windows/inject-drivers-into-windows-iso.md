---
title: Inject drivers into a Windows Installation ISO
---
Some systems have hardware that isn't automatically recognised by Windows. While these are often fetched down via Windows Updates, or with post-installation configuration, it can save a lot of time to inject the necessary drivers directly into the Windows installation disk so they're automatically installed with Windows.

## Tools

You will require:

- A Windows installation ISO
  - For this demonstration we will use [Windows Server 2022 Evaluation ISO](https://www.microsoft.com/en-gb/evalcenter/download-windows-server-2022)
- [The Deployment and Imaging Tools toolkit](https://docs.microsoft.com/en-us/windows-hardware/get-started/adk-install)

## 01. Preparation

We will create a folder for our workspace at `C:\WinImg`

Under `C:\WinImg` create four folders:

- `Drivers` - this is where we'll put the drivers we want to install
- `Mount` - this is where we'll mount the install.wim
- `ISO` - this is where we'll extract the Windows ISO
- `Export` - this is where we'll save our custom ISO

```dos
C:\WinImg>tree
Folder PATH listing
Volume serial number is 38D2-6B92
C:.
├───Drivers
├───Export
├───ISO
└───Mount
```

Next, mount the ISO and copy the files from the mounted disk to `C:\WinImg\ISO`

Prepare the driver files and copy them into `C:\WinImg\Drivers`. You can create subfolders for each driver if you want to stay organised. The driver files are usually `.inf`, `.cat`, and `.sys` files. If you have `.exe` files, you may need to extract the contents. [7zip](https://www.7-zip.org/download.html) can be used to extract self-extracting `.exe's`, others may need to be installed and then the driver files exported.

## 02. Get the Index of the Image to mount

Windows images often contain multiple editions or variants. We first need to check the image index of the version we want to install

```powershell title="powershell (elevated)"
Get-WindowsImage -ImagePath C:\WinImg\ISO\sources\install.wim
```

<details>
<summary>
<strong>Click here</strong> to see an example output
</summary>

```powershell
PS C:\> Get-WindowsImage -ImagePath C:\WinImg\ISO\sources\install.wim

ImageIndex       : 1
ImageName        : Windows Server 2022 Standard Evaluation
ImageDescription : (Recommended) This option omits most of the Windows graphical environment. Manage with a command
                   prompt and PowerShell, or remotely with Windows Admin Center or other tools.
ImageSize        : 8,351,119,400 bytes

ImageIndex       : 2
ImageName        : Windows Server 2022 Standard Evaluation (Desktop Experience)
ImageDescription : This option installs the full Windows graphical environment, consuming extra drive space. It can be
                   useful if you want to use the Windows desktop or have an app that requires it.
ImageSize        : 14,387,114,687 bytes

ImageIndex       : 3
ImageName        : Windows Server 2022 Datacenter Evaluation
ImageDescription : (Recommended) This option omits most of the Windows graphical environment. Manage with a command
                   prompt and PowerShell, or remotely with Windows Admin Center or other tools.
ImageSize        : 8,351,903,100 bytes

ImageIndex       : 4
ImageName        : Windows Server 2022 Datacenter Evaluation (Desktop Experience)
ImageDescription : This option installs the full Windows graphical environment, consuming extra drive space. It can be
                   useful if you want to use the Windows desktop or have an app that requires it.
ImageSize        : 14,385,600,817 bytes

```

</details>

In our example, we're going to add drivers to `Windows Server 2022 Datacenter Evaluation (Desktop Experience)` which has an `ImageIndex` of `4`

## 03. Mount the Image

Mount the Image in to `C:\WinImg\Mount` - wait a few moments while the `install.wim` file is unpacked and mounted.

```powershell title="powershell (elevated)"
Mount-WindowsImage -Path C:\WinImg\Mount\ -ImagePath C:\WinImg\ISO\sources\install.wim -Index 4
```

<details>
<summary>
<strong>Click here</strong> to see an example output
</summary>

```powershell
PS C:\> Mount-WindowsImage -Path C:\WinImg\Mount\ -ImagePath C:\WinImg\ISO\sources\install.wim -Index 4


Path          : C:\WinImg\Mount\
Online        : False
RestartNeeded : False
```

</details>

## 04. Inject driver files to the image

Once the image has been mounted, we can now add drivers from the Drivers directory.
I favour `DISM` over `Add-WindowsDriver` here as it is more explicit about the success or failure of the operation. Feel free to use `Add-WindowsDriver` if you prefer

```powershell title="powershell (elevated)"
dism /image:C:\WinImg\Mount /Add-Driver /Driver:C:\WinImg\Drivers\ /Recurse
```

<details>
<summary>
<strong>Click here</strong> to see an example output
</summary>

```powershell
PS C:\> dism /image:C:\WinImg\Mount /Add-Driver /Driver:C:\WinImg\Drivers\ /Recurse

Deployment Image Servicing and Management tool
Version: 10.0.22621.1

Image Version: 10.0.20348.587

Searching for driver packages to install...
Found 3 driver package(s) to install.
Installing 1 of 3 - oem0.inf: The driver package was successfully installed.
Installing 2 of 3 - oem1.inf: The driver package was successfully installed.
Installing 3 of 3 - oem2.inf: The driver package was successfully installed.
The operation completed successfully.
```

</details>

## 05. Commit changes and dismount the image

We can now dismount and commit the changes to the image - wait a few moments for the changes to save and the image to dismount.

```powershell title="powershell (elevated)"
Dismount-WindowsImage -Path C:\WinImg\Mount\ -Save
```

<details>
<summary>
<strong>Click here</strong> to see an example output
</summary>

```powershell
PS C:\> Dismount-WindowsImage -Path C:\WinImg\Mount\ -Save


LogPath : C:\Windows\Logs\DISM\dism.log
```

</details>

## 06. Repackage changes in to a new ISO

We now need to open up `Deployment and Imaging Tools Environment`

Once in the prompt, run `cd c:\` to change to the root of C:\

Next, enter the following command - adapting to suit your needs

```dos title="Deployment and Imaging Tools Environment CMD"
oscdimg.exe -m -o -u2 -udfver102 -bootdata:2#p0,e,bC:\WinImg\ISO\boot\etfsboot.com#pEF,e,bC:\WinImg\ISO\efi\microsoft\boot\efisys.bin C:\WinImg\ISO C:\WinImg\Export\CustomISO.iso
```

[Review the Microsoft Documentation for OSCDIMG for more details](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/oscdimg-command-line-options?view=windows-11)

The parameters in use above are:

- `-m` ignores the maximum size limit of an image.
- `-o` uses a MD5 hashing algorithm to compare files.
- `-u2` produces an image that contains a UDF image only
- `-udfver102` specifies the udf version of 1.02
- `-bootdata:2#p0,e,b` specifies a multiboot image with 2 boot entries. The first targets BIOS
  - followed by `C:\WinImg\ISO\boot\etfsboot.com` which is the path to etfsboot.com
  - followed by `#pEF,e,b` The second multiboot entry targets UEFI
  - followed by `C:\WinImg\ISO\efi\microsoft\boot\efisys.bin` which is the path to efisys.bin
- `C:\WinImg\ISO` which is the path containing the source ISO files
- `C:\WinImg\Export\CustomISO.iso` which is the path to which the packaged ISO will be saved

Wait a few moments for the ISO to be written. Once complete, you can now mount/burn the image as you require!

<details>
<summary>
<strong>Click here</strong> to see an example output
</summary>

```dos
c:\>oscdimg.exe -m -o -u2 -udfver102 -bootdata:2#p0,e,bC:\WinImg\ISO\boot\etfsboot.com#pEF,e,bC:\WinImg\ISO\efi\microsoft\boot\efisys.bin C:\WinImg\ISO C:\WinImg\Export\CustomISO.iso

OSCDIMG 2.56 CD-ROM and DVD-ROM Premastering Utility
Copyright (C) Microsoft, 1993-2012. All rights reserved.
Licensed only for producing Microsoft authorized content.


Scanning source tree (1000 files in 86 directories)
Scanning source tree complete (1021 files in 88 directories)

Computing directory information complete

Image file is 5068390400 bytes (before optimization)

Writing 1021 files in 88 directories to C:\WinImg\Export\CustomISO.iso

100% complete

Storage optimization saved 5 files, 28672 bytes (0% of image)

After optimization, image file is 5070641152 bytes
Space saved because of embedding, sparseness or optimization = 28672

Done.

```

</details>
