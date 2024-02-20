---
title: Naming Convention - End User Devices
sidebar_label: End User Devices
tags: 
- naming convention
- end user compute
---

Naming conventions for client computers, laptops, desktops, and phones should meet the following requirements

1. The name is guaranteed to be unique
2. The name can be derived by knowing properties of the system
3. The name is not dependent on the current location of the system - meaning it can be moved without requiring renaming
4. The name is not dependent on the user to whom it is assigned - meaning it can be reassigned without requiring renaming
5. The computer name can be generated automatically
6. The name reflects fixed properties about the system that are otherwise cumbersome to determine

Most systems have an asset tag or serial number, which satisfies requirements 1-4

Many that have a serial number expose it through the BIOS or UEFI, satisfying requirement 5

Most systems have no easy way to determine requirement 6 programmatically - which leads to a manual requirement. We therefore prefix a letter to the system name

| Prefix | Device Type         |
| ----- | ------------------- |
| **D**   | Desktop / Workstation |
| **L**   | Laptop              |
| **T**   | Tablet              |
| **M**   | Mobile Phone        |
| **U**   | Unknown / Undefined |

For a laptop with serial number `XYZ0123` - this results in `L-XYZ0123`
Where the serial number is exposed through the BIOS, this element of the system name can be generated automatically.

Whether you decide on using the Serial Number or the Asset Tag, most important is to be consistent.
