---
title: Move files and folders to parent directory
---

## Linux

The following command will move all files, including hidden files in the current directory to the parent directory

```bash
find . -maxdepth 1 -exec mv {} .. \;
```

It will throw an error when it tries to move `.` (current directory) but this will not be an issue:

```bash
mv: cannot move `.' to `../.': Device or resource busy
```

## Windows

The following command will move all files, including hidden files in the current directory to the parent directory

```powershell
Get-ChildItem -Path . -Depth 0 | Move-Item -Destination ..
```
