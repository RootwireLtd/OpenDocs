---
title: Move files and folders to parent directory
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Code Snippets

The following command will move all files, including hidden files in the current directory to the parent directory

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
