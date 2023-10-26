---
title: Active Directory Organisational Unit Hierarchy examples
sidebar_label: AD OU Hierarchy examples
tags:
- active directory
- os:windows
---

## Naming Structure

OU hierarchy should be structured to facilitate ease of long-term administration, rather then modelling around configuration. Configuration is likely to change frequently, where as a well modelled administrative-focused hierarchy is less likely to change so frequently.

When faced with a decision regarding how to organise OU's, always prioritise the structure that makes administering the system easier. more efficient, and more productive.

Finding ways to reduce users reliance on the helpdesk to accomplish IT tasks not only reduces the burden on IT department time, but it also helps the business move faster and compete in the market.

Delegating permissions to manage Active Directory are applied to OU's, facilitating administrative management of items contained within. This conflicts with the configuration management practice of assigning Group Policies to a low-level OU for maximum potential for propagation. However, Group Policies offer their own tools for overcoming this problem - Group Policies can be scoped to security groups.

### Administrative vs Configuration OU Hierarchy example.

#### Example A - Hierarchy Prioritising Administrative Category First

```null title="Example A"
- Clients
  - London (London Office Location)
    - Laptops (Laptops Devices)
    - Desktops (Desktop Devices)
```

vs

#### Example B - Hierarchy Prioritising Configuration Category First

```null title="Example B"
- Clients
  - Laptops (Laptops Devices)
    - London (London Office Location)
  - Desktops (Desktop Devices)
    - London (London Office Location)
```


Take for example users at Refurbalot's London office, who routinely buy laptops, refurbish them, use them as their daily workstation for a few days to ensure they're working well, then wipes them and sells them.

In this example, users at the London office currently have to call the Helpdesk whenever they need to swap out their current workstation for the one they've just refurbished. IT Management have decided to delegate the users permission to reset their own client computers on the domain so they are able to seamlessly swap in new devices themselves.

IT Support Technicians are already assigned delegated rights over the whole Clients OU scope rather than delegating separate scopes for managing laptops vs managing desktops.

In `Example B` delegating that access would require delegation to two different scopes, and adding further devices in future would require additional administrative effort.

Conversely, in `Example A`, delegating access to the `London` scope allows the permitted user to swap in Laptops and Desktops as required. In future a `Mobile Phone` OU might be added under London, and no further administrative action is required to permit rotating mobile phones in the same way.

Considering the requirements in this example, `Example A` below is the more optimal choice requiring a lower amount of initial and ongoing administrative effort from IT.

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
    - Supply (Provides common services to Corporate systems)
      - Internal DNS Server
      - Monitoring Database
      - Monitoring Application
      - Logging Database
      - Logging Application
      - Mail Database
      - Mail Server
      - Mail Relay (Internal Mail Relay)
    - Corporate (Provides services to the internal corporate business users and systems)
      - File Servers
      - LineOfBusiness Database
      - LineOfBusiness Web Application
    - Production (Provides services to external customers)
      - Widget Database
      - Widget Application Server
```

## Representative DMZ Domain OU Hierarchy

A Domain that has resources facing the public internet has a higher risk of compromise, therefore, resources that will be internet facing are better placed in to their own separate DMZ Domain

The DMZ Domain should primarily contain resources, with minimal user accounts.

```null title="AD OU Hierarchy"

- STAGING (New Users and Computers)
  - New Users
  - New Computers
- SYS (System Administrative Facing Objects)
  - Servers
    - Supply (Provides common services to Corporate systems)
      - External DNS Server
      - Mail Gateway
      - NTP Server
      - Mail Relay (Outbound Mail Relay)
    - Corporate (Provides services to the internal corporate business users and systems)
      - VPN Server
      - WAF (Web Application Firewall)
      - Reverse Proxy (Reverse Proxy / Http Gateway)
      - Load Balancer (Load Balancer)
    - Production (Provides services to external customers)
      - External DNS Sever 
      - Reverse Proxy (Production outbound traffic)
      - WAF (Web Application Firewall)
      - NoSQL Cache
      - Widget Web App
```
