---
title: Move files and folders to parent directory
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Code Snippets

The following command will move all files & directories, including hidden files in the current directory to the parent directory.

For example. If you are in `/home/user/test` and you run this command, it will move all files and directories in `/home/user/test` to `/home/user`

<Tabs groupId="move-files">
<TabItem value="bash" label="bash">

```bash title="bash"
find . -maxdepth 1 -exec mv {} .. \;
```

It will throw an error when it tries to move `.` (current directory) but this will not be an issue:

```bash
mv: cannot move `.' to `../.': Device or resource busy
```

</TabItem>
<TabItem value="powershell" label="PowerShell">

```powershell title="Powershell"
Get-ChildItem -Path . -Depth 0 | Move-Item -Destination ..
```

</TabItem>
</Tabs>

## Example

### Execute

```bash title="bash"
$ find . -maxdepth 1 -exec mv {} .. \;
mv: cannot move '.' to '../.': Device or resource busy
$ cd ..
```

<table>
<tr>
<th>Before</th>
<th>After</th>
</tr>
<tr>
<td>

```bash title="bash"
$ pwd
/home/aiden/tmp/subfolder
$ tree
.
├── file3
└── folder1
    ├── file1
    └── folder2
        └── file2

3 directories, 3 files
```


</td>
<td>

```bash title="bash"
$ pwd 
/home/aiden/tmp
$ tree
.
├── file3
├── folder1
│   ├── file1
│   └── folder2
│       └── file2
└── subfolder

5 directories, 2 files
```

</td>
</tr>
</table>