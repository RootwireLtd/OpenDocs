---
title: Tasks Checklist
---

For this checklist, we will assume a mixed Windows and Linux based business environment, with the majority of users working from Windows workstations.

## Create Systems of Record

- [ ] Documentation / Wiki
- [ ] IP Address Management

## Plan the deployment

- [ ] Create a Subnetting strategy
  - [ ] Routable Networks
    - [ ] OOB Networks
      - [ ] Administrative Access
      - [ ] Network Device Management
      - [ ] Storage Device Management
      - [ ] Physical Server Management
    - [ ] Virtualisation Application Network
    - [ ] Supply Networks
      - [ ] Data Tier
      - [ ] Application Tier
      - [ ] DMZ Tier
    - [ ] Corporate Network
      - [ ] Data Tier
      - [ ] Application Tier
      - [ ] DMZ Tier
  - [ ] Non-Routable Sundry networks
    - [ ] iSCSI
    - [ ] Heartbeats
- [ ] Allocate interface connections

## Provision Physical Infrastructure

- [ ] Provision Physical Network Infrastructure
- [ ] Provision Physical Storage
- [ ] Provision Physical Servers

## Provision Administrative Network

- [ ] Create the Administrative Out-Of-Band Networks
  - [ ] OOB Administrative Access
  - [ ] OOB Network Device Management
  - [ ] OOB Storage Device Management
  - [ ] OOB Physical Server Management

## Provision Virtualisation Infrastructure

- [ ] Create the logical Virtualisation Networks
  - [ ] Hypervisor Application Tier
- [ ] Provision Logical Storage Volumes
- [ ] Provision Hypervisors

## Provision the Supply systems

- [ ] Create the Logical Supply Network
  - [ ] Data Tier
  - [ ] Application Tier
  - [ ] DMZ Tier
- [ ] Provision Monitoring System
  - [ ] Monitoring Database
  - [ ] Monitoring Application
- [ ] Provision Logging System
  - [ ] Logging Database
  - [ ] Logging Application
- [ ] Provision Internal DNS Servers
- [ ] Provision External DNS Servers
- [ ] Provision Domain / LDAP
  - [ ] Configure OU structure
  - [ ] Configure AD Groups and Delegations
  - [ ] Configure Default Computer container (redircmp)
  - [ ] Configure Auth and AD Auditing in Default Domain Controllers Policy GPO
  - [ ] Restrict ms-DS-MachineAccountQuota to 0
  - [ ] Empty default AD Administrative groups
    - [ ] Administrators (Leave only dedicated highly restricted accounts)
    - [ ] Domain Admins (Leave only dedicated highly restricted accounts)
    - [ ] Enterprise Admins (Leave only dedicated highly restricted accounts)
    - [ ] Server Operators
    - [ ] Print Operators
    - [ ] Backup Operators
    - [ ] Schema Admins (Add users only when schema changes are required, then remove)
    - [ ] Cert Publishers
- [ ] Provision Identity Provider
  - [ ] Ms Entra / Okta / KeyCloak / etc
  - [ ] Integrate with Domain / LDAP

## Provision the Corporate systems

- [ ] Provision File Servers
  - [ ] Create Group Policy governing file servers
    - [ ] Enforce ACLs on root data folders
- [ ] Provision DFS
  - [ ] Users Namespace (UDS)
  - [ ] Departmental Namespace
    - [ ] IT
    - [ ] Finance
    - [ ] HR
  - [ ] Common Resources Namespace
    - [ ] Software
    - [ ] Policy Documents
