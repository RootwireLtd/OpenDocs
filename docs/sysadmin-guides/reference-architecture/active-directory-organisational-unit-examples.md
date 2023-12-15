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

### Administrative vs Configuration OU Hierarchy

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

Below is an example of an OU heirarchy for a Corporate domain. 
This doesn't necessarily follow the direct examples elsewhere in the document, but serves as a reference pattern for a well structured pattern for you to adapt to your own needs

```null title="AD OU Hierarchy"
- CORP (Corporate Facing Objects)
  - Identity
    - Users
      - LON (London)
      - BMT (Bournemouth)
      - EXT (External / 3rd Party)
      - REM (Remote / Non-office based)
    - Devices # End User client devices
      - LON (London)
        - Laptops (Laptops)
        - Desktops (Desktops Workstations)
        - Mobiles (Mobile Devices)
        - Tablets (Tablet Devices)
      - BMT (Bournemouth)
        - Laptops (Laptops)
        - Desktops (Desktops Workstations)
        - Mobiles (Mobile Devices)
        - Tablets (Tablet Devices)
      - REM (Remote / Non-office based)
  - Groups
    - Global
      - Roles (Business Level Roles / Job Titles)
        - Staff # Example Domain Global Security Group for all members of staff
    - Finance
      - Roles (Business Level Roles / Job Titles)
        - Finance Apprentice # Example Domain Global Security Group for Finance Apprentices
    - IT
      - Roles (Business Level Roles / Job Titles)
        - Support Agent # Example Domain Global Security Group for IT Support Agents
        - Network Admin # Example Domain Global Security Group for IT Network Admins
        - System Admin # Example Domain Global Security Group for IT System Admins
- STAGING (New Users and Computers)
  - New Users
  - New Computers
- SYS (System Administrative Facing Objects)
  - Identity
    - PAM Accounts # Privileged Access Management User Accounts
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
  - Resources
    - Infrastructure # Covers Networking, Storage, Servers, and Virtualisation
      - Networking
        - Global
          - ACLs
          - Roles
          - ServiceAccounts
      - Storage
        - Global
          - ACLs
          - Roles
          - ServiceAccounts
      - Physical Servers
        - Global
          - ACLs
            - ACL_PhysicalServer_LocalAdministrator_Global # Example Domain Local Security Group
          - Roles
            - Physical Server Administrator - Global # Example Global Security Group
          - ServiceAccounts
        - Svr-1234
          - ACLs
            - ACL_PhysicalServer_LocalAdministrator_Global # Example Domain Local Security Group
          - Roles
            - Physical Server Administrator - Global # Example Global Security Group
          - ServiceAccounts
      - Virtualisation
        - Global
          - ACLs
            - ACL_Virtualisation_Administrator_Global # Example Domain Local Security Group
          - Roles
            - Virtualisation Administrator - Global # Example Global Security Group
          - ServiceAccounts
    - Platform # Covers VirualMachines/OS, Middleware, Runtime
      - VirtualMachines
        - Global
          - ACLs
            - ACL_VirtualMachine_LocalAdministrator_Global # Example Domain Local Security Group
            - ACL_VirtualMachine_RemoteLogin_Global # Example Domain Local Security Group
          - Roles
            - Virtual Machine Administrator - Global # Example Global Security Group
            - Virtual Machine Remote User - Global # Example Global Security Group
          - ServiceAccounts
      - Middleware
        - Global
          - ACLs
          - Roles
          - ServiceAccounts
      - Runtime
        - Global
          - ACLs
          - Roles
          - ServiceAccounts
    - Software # Covers Data and Applications
      - Data
        - Global
          - ACLs
            - ACL_Data_Administrator_Global # Example Domain Local Security Group
          - Roles
            - Data Administrator - Global
          - ServiceAccounts
      - Applications
        - Global
          - ACLs
            - ACL_Application_Administrator_Global # Example Domain Local Security Group
          - Roles
            - Application Administrator - Global
          - ServiceAccounts
        - LOB-Application-1
          - ACLs
            ACL_Application_Administrator_LOB-Application-1 # Example Domain Local Security Group
          - Roles
            - Application Administrator - LOB Application 1 # Example Global Security Group
          - ServiceAccounts
            - Svc.LOBApplication1-Runtime # Example Service account for the Application to run under
            - Svc.LobApplication1-Cron-DataLoad # Example Service account for scheduled task/chron job to periodically load data
```

## Representative DMZ Domain OU Hierarchy

A Domain that has resources facing the public internet has a higher risk of compromise, therefore, resources that will be internet facing are better placed in to their own separate DMZ Domain

The DMZ Domain should primarily contain resources, with minimal user accounts.

There is some debate as to whether a trust should be formed between the DMZ domain and the corporate domain. In my experience, managing a large Windows-based DMZ without Active Directory quickly becomes as complicated as managing a large Windows-based Corporate domain.

In my opinion, using Selective Authentication with a Master (Corp) forest and Resource (DMZ) forest is the optimal solution.

[Selective Authentication](http://technet.microsoft.com/en-us/library/cc787623%28v=ws.10%29.aspx) can then be used to allow only pre-determined sets of users to authenticate in to the DMZ resource forest. This limits the exposure of the internal AD forest while allowing for centralised administration of accounts.

In the above Corp Domain OU hierarchy, DMZ accounts are under "SYS > Admins > DMZ" and accounts in these OU's would be granted minimal permissions to the Corp domain.

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
