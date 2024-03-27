# Delete Failed Domain Controllers from Active Directory

This process will help you to remove a failed or otherwise unavailable domain controller that can no longer be demoted in a structured way.
Where possible, demote the server in a supported manner, this is guide is for when a typical demotion is not possible for a variety of reasons, such as server crash or unresolvable replication problem.

## Step 1. Remove Metadata via Active Directory Users & Computers

1. Open `Active Directory Users and Computers` as a Domain / Enterprise Administrator either on the Domain Controller directly, or from your management workstation
2. Expand the `Domains` > `Domain Controllers` tree
3. Right click on the Domain controller you would like to remove
4. Click Delete
5. In the pop-up `Active Directory Domain Services` confirmation box, click `Yes`.
6. In the `Deleting Domain Controller` dialogue box, be sure to read and understand the warning, then check the `Delete this Domain controller anyway` checkbox and click `Delete`
7. If the domain controller holds any FSMO roles, click `OK` to migrate them to another available domain controller

## Step 2. Remote the Domain Controller from Active Directory Sites and Services

1. Open `Active Directory Sites and Services` as a Domain / Enterprise Administrator
2. Expand the site in which the Domain Controller exists
3. Expand the `Servers` tree under the site
4. Right click the server you would like to remove and click `Delete`
5. Click `Yes` to confirm

## Step 3. Remove remaining metadata through ntdsutil

1. Open Command Prompt as a Domain Administrator / Enterprise Administrator
2. Type `ntdsutil` and hit `Enter`

   ```cmd
   ​C:\WINDOWS>ntdsutil
   ntdsutil:
   ```

3. Type `metadata cleanup` and hit `Enter`

   ```cmd
   ​ntdsutil: metadata cleanup
   metadata cleanup:
   ```

4. Type `connections` and hit Enter

   ```cmd
   ​metadata cleanup: connections
   server connections:
   ```

5. Type `connect to server <servername>` where `<servername>` is the name of any functional domain controller in the same domain as the failed domain controller

   ```cmd
   ​server connections: connect to server svr-dc-01
   Binding to svr-dc-01 ...
   Connected to svr-dc-01 using credentials of locally logged on user.
   server connections:
   ```

6. Type `quit` and press `Enter` to return to the metadata cleanup prompt

   ```cmd
   ​server connections: quit
   metadata cleanup:
   ```

7. Type `Select operation target` and hit `Enter`

   ```cmd
   ​metadata cleanup: Select operation target
   select operation target:
   ```

8. Type `list domains` and hit `Enter`. This lists all the domains in the forest alongside an index number for each

   ```cmd
   ​select operation target: list domains
   Found 2 domain(s)
   0 - DC=lab,DC=rootwire,DC=dev
   1 - DC=tech,DC=lab,DC=rootwire,DC=dev
   select operation target:
   ```

9. Type `select domain <number>` where `<number>` is the index number of the domain in which the failed server is located

   ```cmd
   ​select operation target: Select domain 1
   No current site
   Domain - DC=tech,DC=lab,DC=rootwire,DC=dev
   No current server
   No current Naming Context
   select operation target:
   ```

10. Type `list sites` and press `Enter`

    ```cmd
    ​select operation target: List sites
    Found 1 site(s)
    0 - CN=Default-First-Site-Name,CN=Sites,CN=Configuration,DC=tech,DC=lab,DC=rootwire,DC=dev
    1 - CN=Another-Site-Elsewhere,CN=Sites,CN=Configuration,DC=tech,DC=lab,DC=rootwire,DC=dev
    select operation target:
    ```

11. Type `select site <number>` where `<number>` is the index number of the site in which the failed server is located

    ```cmd
    ​select operation target: Select site 0
    Site - CN=Default-First-Site-Name,CN=Sites,CN=Configuration,DC=tech,DC=lab,DC=rootwire,DC=dev
    Domain - DC=tech,DC=lab,DC=rootwire,DC=dev
    No current server
    No current Naming Context
    select operation target:
    ```

12. Type `list servers in site` and hit `Enter`. This will list all the servers in the site alongside a corresponding index number.

    1. If metadata was correctly cleared through `AD Users and Computers` / `AD Sites and Services` in an earlier step, the domain controller may not appear here.

    ```cmd
    ​select operation target: List servers in site
    Found 2 server(s)
    0 - CN=svr-dc-02,CN=Servers,CN=Default-First-Site-Name,CN=Sites,CN=Configuration,DC=tech,DC=lab,DC=rootwire,DC=dev
    1 - CN=svr-dc-01,CN=Servers,CN=Default-First-Site-Name,CN=Sites,CN=Configuration,DC=tech,DC=lab,DC=rootwire,DC=dev
    select operation target:
    ```

13. Type `select server <number>` where `<number>` is the index number of the server you want to remove

    ```cmd
    ​select operation target: Select server 0
    Site - CN=Default-First-Site-Name,CN=Sites,CN=Configuration,DC=tech,DC=lab,DC=rootwire,DC=dev
    Domain - DC=tech,DC=lab,DC=rootwire,DC=dev
    Server - CN=svr-dc-02,CN=Servers,CN=Default-First-Site-Name,CN=Sites,CN=Configuration,DC=tech,DC=lab,DC=rootwire,DC=dev
    DSA object - CN=NTDS Settings,CN=svr-dc-02,CN=Servers,CN=Default-First-Site-Name,CN=Sites,CN=Configuration,DC=tech,DC=lab,DC=rootwire,DC=dev
    DNS host name - svr-dc-02.tech.lab.rootwire.dev
    Computer object - CN=svr-dc-02,OU=Domain Controllers,DC=tech,DC=lab,DC=rootwire,DC=dev
    No current Naming Context
    select operation target:
    ```

14. Type `quit` to return to the `metadata cleanup` prompt

    ```cmd
    ​select operation target: q
    metadata cleanup:
    ```

15. Type `remove selected server` and press `Enter`

    1. You will receive a warning message. Read and understand it. If you agree, click "Yes"

    ```cmd
    ​metadata cleanup: Remove selected server
    "CN=svr-dc-02,CN=Servers,CN=Default-First-Site-Name,CN=Sites,CN=Configuration,DC=tech,DC=lab,DC=rootwire,DC=dev" removed from server "svr-dc-01"
    metadata cleanup:
    ```

    At this stage, if Active Directory indicates that the domain controller has been successfully removed, great! However, if an error stating that the object couldn't be located appears, it's possible that Active Directory has previously been deleted from the domain controller.

## Step 4. Remove the server from DNS

1. Open DNS Manager
2. In the forward lookup zone for the domain, locate any records for the Domain controller and remove them
3. Expand the tree under the forward lookup zone for the domain. `_msdcs` > `dc` > `_sites` > `<Domain controller site>` where `<Domain controller site>` is the site in which the Domain controller to be removed existed
   1. Remove the `_kerberos` and `_ldap` records corresponding to the removed domain controller.
4. Expand the tree under the forward lookup zone for the domain. `_msdcs` > `dc` > `_tcp_` and remove the `_kerberos` and `_ldap` records corresponding to the removed domain controller.
5. Expand the tree under the forward lookup zone for the domain. `_sites` > `<Domain controller site>` > `_tcp` where `<Domain controller site>` is the site in which the Domain controller to be removed existed
   1. Remove the `_kerberos` and `_ldap` records corresponding to the removed domain controller.
6. Expand the tree under the forward lookup zone for the domain. `_tcp`
   1. Remove the `_kerberos`, `_kpasswd` and `_ldap` records corresponding to the removed domain controller
7. Expand the tree under the forward lookup zone for the domain. `_udp`
   1. Remove the `_kerberos`, `_kpasswd` and `_ldap` records corresponding to the removed domain controller
8. Expand the tree under the forward lookup zone for the domain. `DomainDnsZones`
   1. Remove the IP address relating to the removed domain controller
9. Expand the tree under the forward lookup zone for the domain. `DomainDnsZones` > `_tcp`
   1. Remove the `_ldap` records corresponding to the removed domain controller
10. Expand the tree under the forward lookup zone for the domain. `DomainDnsZones` > `_sites` > `<Domain controller site>` > `_tcp` where `<Domain controller site>` is the site in which the Domain controller to be removed existed
    1. Remove the `_ldap` records corresponding to the removed domain controller
