---
title: Install PowerShell on WSL2
showMetadata: true
editable: true
showToc: true
---

# Install PowerShell on Ubuntu 18.04
- Run the following commands to install PowerShell:
```sh
# Update the list of packages
sudo apt-get update

# Install pre-requisite packages.
sudo apt-get install -y wget apt-transport-https software-properties-common

# Download the Microsoft repository GPG keys
wget -q https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb

# Register the Microsoft repository GPG keys
sudo dpkg -i packages-microsoft-prod.deb

# Update the list of products
sudo apt-get update

# Enable the "universe" repositories
sudo add-apt-repository universe

# Install PowerShell
sudo apt-get install -y powershell

```

# Test if you have install PowerShell successfully
- Run the following command:
```sh
$ pwsh -v
```
- You should get `PowerShell 7.1.3` version or a new version.
- Now you are ready to use PowerShell on Linux.
- To start PowerShell session.
- Open a terminal and type `pwsh`.

# Install PowerShell on other Linux distributions
- https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-core-on-linux
