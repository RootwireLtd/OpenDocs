---
title: Active Directory Organisational Unit Hierarchy examples
sidebar_label: AD OU Hierarchy examples
---

## Naming Structure

OU hierarchy should be structured to facilitate ease of administration, then referencing configuration. When faced with a decision regarding how to organise OU's, always prioritise the structure that makes administering the system easier.

### For example:

Delegating permissions to manage Active Directory are applied to OU's, facilitating administrative management. This conflicts with the configuration management practice of assigning Group Policies to a low-level OU for propagation. However, Group Policies can also be scoped to security groups. 

In the below example, users at the London office might be assigned delegated permissions over the scope London OU in order to manage their own devices.
IT Support Technicians are more likely to be assigned delegated rights over the whole Clients scope. 
In `Example B` it would not be possible to easily delegate device management permissions to specific site office users, therefore, in this example `Example A` below is the more optimal choice.

```null title="Example A"
- Clents
  - London (London Office Location)
    - Laptops (Laptops Devices)
```

vs

```null title="Example B"
- Clients
  - Laptops (Laptops Devices)
    - London (London Office Location)
```

## Representative OU Hierarchy

Below is an example of a well structured OU Hierarchy

```null title="AD OU Hierarchy"
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
    - REM (Renote / Non-office based)
  - Users
    - LON (London)
    - BMT (Bournemouth)
    - EXT (External / 3rd Party)
    - REM (Renote / Non-office based)
  - Groups
    - JobTitles
    - Roles
  - Departmental Resources
    - Common
      - FileShares
        - OrgPolicies
          - ACLs
      - Applications
        - EmployeePortal
          - ACLs
    - Finance
      - FileShares
        - Accounts
          - ACLs
      - Apps
        - AccountingSoftware
          - ACLs
    - IT
      - FileShares
        - IT
          - ACLs
      - Apps
        - Helpdesk
          - ACLs
- STAGING (New Users and Computers)
  - New Users
  - New Computers
- SYS (System Administrative Facing Objects)
  - Admins
    - T0 (Tier 0 / Highest Privilege - Enterprise / Domain / Global Administrative access)
    - T1 (Tier 1 / Administrative Access over servers or groups of servers)
    - T2 (Tier 2 / Administrative Access over workstations or groups of workstations)
    - T3 (Tier 3 / Administrative Access over applications or groups of applications)
  - Groups
    - Roles
    - ACLs
    - AdDelegation (Active Directory Delegation)
  - Servers
    - Application
    - Database
    - Exchange
    - File Servers
    - Hypervisor
    - NonProduction
    - Web
```

