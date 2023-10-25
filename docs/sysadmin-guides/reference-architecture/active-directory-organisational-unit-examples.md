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

## Representative Corporate OU Hierarchy

Below is an example of a well structured OU Hierarchy for a corporate domain

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
    - REM (Remote / Non-office based)
  - Users
    - LON (London)
    - BMT (Bournemouth)
    - EXT (External / 3rd Party)
    - REM (Remote / Non-office based)
  - Groups
    - JobTitles
    - Roles
  - Departments
    - Common
      - Groups
        - JobTitles (Could be delegated to HR)
        - Roles
      - Resources
        - FileShares
          - OrgPolicies
            - ACLs
        - Applications
          - EmployeePortal
            - ACLs
    - Finance
      - Groups
        - Roles (Departmental roles like Accounts Payable / Accounts Receivable)
      - Resources
        - FileShares
          - Accounts
            - ACLs
        - Apps
          - AccountingSoftware
            - ACLs
    - IT
      - Groups
        - Roles (Departmental roles like Documentation Contributor / Helpdesk Auditor)
      - Resources
        - FileShares
          - SoftwareLibrary
            - ACLs
        - Apps
          - Helpdesk
            - ACLs (EG: Read Ticket / Update Ticket)
- STAGING (New Users and Computers)
  - New Users
  - New Computers
- SYS (System Administrative Facing Objects)
  - Admins
    - Corp (Administrative Accounts for working with the Corporate Domain)
      - T0C (Tier 0 / Highest Privilege - Enterprise / Domain / Global Administrative access)
      - T1C (Tier 1 / Administrative Access over Corporate servers or groups of servers)
      - T2C (Tier 2 / Administrative Access over Corporate workstations or groups of workstations)
      - T3C (Tier 3 / Administrative Access over Corporate applications or groups of applications)
    - DMZ (Separate Administrative accounts for working with the DMZ Domain)
      - T0D (Tier 0 / Highest Privilege - Enterprise / Domain / Global Administrative)
      - T1D (Tier 1 / Administrative Access over DMZ servers or groups of servers)
      - T2D (Tier 2 / Administrative Access over DMZ workstations or groups of workstations)
      - T3D (Tier 3 / Administrative Access over DMZ applications or groups of applications)
  - Groups
    - Roles
    - ACLs
    - AdDelegation (Active Directory Delegation)
  - Departmental Resources
    - Common
      - Servers
    - Infrastructure
      - Servers
        - Hypervisors
    - Supply
      - Servers
        - Monitoring Database
        - Monitoring Application
        - Logging Database
        - Logging Application
    - Virtualisation Team
      - Servers
        - Hypervisors
  - Servers
    - NonProduction
    - Infrastructure
      - Hypervisors
    - Supply
      - Monitoring Database
      - Monitoring Application
      - Logging Database
      - Logging Application
      - Mail Database
      - Mail Server
      - Mail Relay
    - Corporate
      - File Servers
      - LineOfBusiness Database
      - LineOfBusiness Web Application
```

## Representative DMZ Domain OU Hierarchy

A Domain that has resources facing the public internet has a higher risk of compromise, therefore, resources that will be internet facing are better placed in to their own separate DMZ Domain

The DMZ Domain should primarily contain resources, with minimal user accounts.

```null title="AD OU Hierarchy"

```