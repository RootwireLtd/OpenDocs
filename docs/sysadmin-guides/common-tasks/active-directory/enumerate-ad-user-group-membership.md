---
title: Enumerate Active Directory User and Computer group membership
sidebar_label: Enumerate AD User and Computer group membership
tags: [os:windows, active directory, identity & role management, powershell]
---

## Overview

### Summary

Enumerate the group memberships for a user or computer

### Features / Tools

- Active Directory
- CMD
- DSGet
- DSQuery
- Powershell
- [ActiveDirectory Module][psAdModule]

### Benefits

- Answer "Which groups does ____ belong to?"

## Guidance

### Current Logged in User

```powershell title="PowerShell"
Get-ADPrincipalGroupMembership -Identity $env:USERNAME | select DistinguishedName
```

### User by samAccountName

```powershell title="PowerShell"
$identity = "john.doe" # Replace with users samAccountName
Get-ADPrincipalGroupMembership -Identity $identity | select DistinguishedName
```

```dos title="CMD"
dsquery user -samid john.doe | dsget user -memberof -expand
```

### Current Computer

```powershell title="PowerShell"
# Computer samAccountNames end in a $, so we append it to $env:computername
Get-ADPrincipalGroupMembership -Identity $("$env:COMPUTERNAME$") | select DistinguishedName
```

### Computer by samAccountName

```powershell title="PowerShell"
$computerName = "Desktop-1234"
# Computer samAccountNames end in a $, so this must be appended
$samAccountName = $computerName + "$"
Get-ADPrincipalGroupMembership -Identity $samAccountName | select DistinguishedName
```

Note we do not append `$` to the computer name for dsquery

```dos title="CMD"
dsquery computer -name Desktop1234 | dsget computer -memberof -expand
dsquery computer -name Desktop1234 | dsget computer -memberof -expand
```

[psAdModule]: https://learn.microsoft.com/en-us/powershell/module/activedirectory/?view=windowsserver2022-ps
