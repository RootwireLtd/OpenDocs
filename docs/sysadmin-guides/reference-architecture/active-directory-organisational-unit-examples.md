---
title: Active Directory Organisational Unit Hierarchy examples
sidebar_label: AD OU Hierarchy examples
---

OU hierarchy should be structured to facilitate ease of administration, then referencing configuration. When faced with a decision regarding how to organise OU's, always prioritise the structure that makes administering the system easier.

For example, an Active Directory Admin is more likely to need to apply GPO's and delegated permissions to a site vs a different device types, so `Example A` below is the more optimal choice.

```null title="Example A"
- Clents
  - LOC (Location)
    - DEV (Device Type)
```

vs

```null title="Example B"
- Clients
  - DEV (Device Type)
    - LOC (Location)
```
```
- CORP (Corporate Facing Objects)
  - Clients
    - LON (London)
      - LT (Laptops)
      - DT (Desktops)
      - MP (MobilePhones)
      - TB (Tablets)
    - BMT (Bournemouth)
      - LT (Laptops)
      - DT (Desktops)
      - MP (MobilePhones)
      - TB (Tablets)
- STAGING (New Users and Computers)
  - New Users
  - New Computers
- SYS (System Administrative Facing Objects)
  - Admins
  - Servers
    - Application
    - Database
    - Exchange
    - File Servers
    - Hypervisor
    - NonProduction
    - Web
```

