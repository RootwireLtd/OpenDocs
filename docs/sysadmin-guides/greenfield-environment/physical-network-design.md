---
title: Physical Network Design
---

## Basic Design

This is the simplest solution, suitable for small businesses with a single office.

As it has no built in redundancy, it has the risk that the entire network will go down if any single component fails. It is recommended that a contingency plan is in place to handle the risk of a complete network failure

Most noteworthy is that there will be a requirement for managed outages when network systems require a reboot for maintenance, updates or other reasons.

```mermaid

graph TD

subgraph WAN[Wan Zone]
    WAN1[Internet Connection Modem]
end

subgraph Edge[Edge Zone]
    Firewall[Firewall / Router]
end

WAN1 --> Firewall

subgraph Spine[Network Spine]
    LanSwitch[Lan Switch]
end

subgraph ServerZone[Server Room]
    Server[Server]
    Storage[Storage NAS]
end

subgraph EUCZone[Corporate User Offices]
    WiFiAP[Wifi Access Point]
    EUC1[Corporate User 1]
    EUC2[Corporate User 2]
    EUC3[Corporate User 3]
    EUC4[Corporate User 4]
    EUC5[Corporate User 5]
end    

LanSwitch --> Server
LanSwitch --> Storage
LanSwitch --> EUC1
LanSwitch --> EUC2
LanSwitch --> EUC3
LanSwitch --> WiFiAP
WiFiAP --> EUC4
WiFiAP --> EUC5


Firewall --> LanSwitch

```

## An example High Availability Design

We are making the following assumptions to facilitate a high-availability setup.

- There are two separate and independent internet connections
- Each internet connection provides at least 2 IP addresses, one for each firewall

The below setup is suitable for most small to medium businesses where the cost of downtime is higher.

Redundant Internet connections mean that in most cases when a single internet connection fails, the business will still be able to operate.

The next layer of redundancy is the Firewall/Router - a firewall requires periodic reboots to install updates, and having a pair in a high-availability setup means that the network will continue to operate even when one firewall is rebooting.

Next is our LAN switches. A bad configuration change to one may cause a switch to stop handling network traffic correctly, so having a secondary switch means the network is likely to still function.

It's rare for switches to fail, but it does happen.

Finally, we have our servers, which in this example are clustered with a shared storage device. If a single server needs to reboot for updates, the services it operates can be migrated to another server in the cluster, and the server can be rebooted without any business-facing downtime.

For the sake of simplicity, we have not included a backup solution in this diagram, nor any replication links between like-for-like devices, however it is highly recommended that a backup solution is implemented.

It's clear from the diagram below that a high availability configuration introduces a lot of additional complexity and cost, however the benefits are worth it for most businesses. Typically High Availability is implemented in line with the business' risk vectors, appetite, and availability targets.

```mermaid

graph TD

subgraph WAN[Wide Area Network]
    WAN1[Primary Internet Connection Modem]
    WAN2[Secondary Internet Connection Modem]
    WanSwitch1[Primary WAN Leaf Switch]
    WanSwitch2[Secondary WAN Leaf Switch]
end

WAN1 --> WanSwitch1
WAN2 --> WanSwitch2

subgraph Edge[Edge]
    Firewall1[Firewall / Router 1]
    Firewall2[Firewall / Router 2]
    EdgeLeafSwitch1[Primary Edge Leaf Switch]
    EdgeLeafSwitch2[Secondary Edge Leaf Switch]

    Firewall1 --> EdgeLeafSwitch1
    Firewall1 --> EdgeLeafSwitch2
    Firewall2 --> EdgeLeafSwitch1
    Firewall2 --> EdgeLeafSwitch2
end

WanSwitch1 --> Firewall1
WanSwitch1 --> Firewall2
WanSwitch2 --> Firewall1
WanSwitch2 --> Firewall2

subgraph Spine[Network Spine]
    SpineLanSwitch1[Primary Spine Leaf Switch]
    SpineLanSwitch2[Secondary Spine Leaf Switch]
end

EdgeLeafSwitch1 --> SpineLanSwitch1
EdgeLeafSwitch1 --> SpineLanSwitch2
EdgeLeafSwitch2 --> SpineLanSwitch1
EdgeLeafSwitch2 --> SpineLanSwitch2


subgraph Server[Server Room]
    ServerLanSwitch1[Primary Server Leaf Switch]
    ServerLanSwitch2[Secondary Server Leaf Switch]
    Server1[Server 1]
    Server2[Server 2]
    Server3[Server 3]
    ServerLanSwitch1 --> Server1
    ServerLanSwitch1 --> Server2
    ServerLanSwitch1 --> Server3
    ServerLanSwitch2 --> Server1
    ServerLanSwitch2 --> Server2
    ServerLanSwitch2 --> Server3

    SpineLanSwitch1 --> ServerLanSwitch1
    SpineLanSwitch1 --> ServerLanSwitch2
    SpineLanSwitch2 --> ServerLanSwitch1
    SpineLanSwitch2 --> ServerLanSwitch2


    Server1 --> StorageSwitch1
    Server1 --> StorageSwitch2
    Server2 --> StorageSwitch1
    Server2 --> StorageSwitch2
    Server3 --> StorageSwitch1
    Server3 --> StorageSwitch2

    subgraph Storage[Storage Systems]
        StorageSwitch1[Storage Switch 1]
        StorageSwitch2[Storage Switch 2]
        StorageDevice1[Storage Device 1]
        StorageDevice2[Storage Device 2]
        StorageSwitch1 --> StorageDevice1
        StorageSwitch1 --> StorageDevice2
        StorageSwitch2 --> StorageDevice1
        StorageSwitch2 --> StorageDevice2
    end
end

subgraph EUC[Corporate User Offices]
    EUCLeafSwitch1[Primary EUC Leaf Switch]
    EUCLeafSwitch2[Secondary EUC Leaf Switch]
    WiFiAP1[Wifi Access Point 1]
    WiFiAP2[Wifi Access Point 2]
    EUC1[Corporate User 1]
    EUC2[Corporate User 2]
    EUC3[Corporate User 3]
    EUC4[Corporate User 4]
    EUC5[Corporate User 5]
    EUCLeafSwitch1 --> WiFiAP1
    EUCLeafSwitch2 --> WiFiAP2
    EUCLeafSwitch1 --> EUC1
    EUCLeafSwitch2 --> EUC2
    EUCLeafSwitch2 --> EUC3
    WiFiAP1 --> EUC4
    WiFiAP2 --> EUC5
end

SpineLanSwitch1 --> EUCLeafSwitch1
SpineLanSwitch1 --> EUCLeafSwitch2
SpineLanSwitch2 --> EUCLeafSwitch1
SpineLanSwitch2 --> EUCLeafSwitch2

```
