---
title: Install .NET on WSL2
showMetadata: true
editable: true
showToc: true
---

# How to install .NET on Ubuntu 18.04 LTS

- Open a terminal and run the following commands:
  ```
  wget https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
  sudo dpkg -i packages-microsoft-prod.deb
  rm packages-microsoft-prod.deb
  ```
- Then run:
  ```
  sudo apt-get update; \
    sudo apt-get install -y apt-transport-https && \
    sudo apt-get update && \
    sudo apt-get install -y dotnet-sdk-6.0
  ```

# Install other versions
- To install other versions, use this format `{product}-{type}-{version}`.
- Available values are:
  - For product: `dotnet`, `aspnetcore`
  - For type: `sdk`, `runtime`
  - For version: `6.0`, `5.0`, `3.1`, `3.0`, `2.1`

- To install .NET Core 3.1 SDK, use the following command:
  ```
  sudo apt-get install -y dotnet-sdk-3.1
  ```

# Check all installed .NET
- To list all installed .NET SDK on your computer, run:
  ```
  dotnet --list-sdks
  ```
- Example output:
  ```
  3.1.407 [/usr/share/dotnet/sdk]
  5.0.101 [/usr/share/dotnet/sdk]
  6.0.100 [/usr/share/dotnet/sdk]
  ```

# Opitionally install .NET preview with Snap
- Run the following command to install the latest .NET Core SDK:
```sh
  sudo snap install dotnet-sdk --channel=6.0/beta --classic
```
- Wait several minutes until installation has finished.
- The default .NET Core command is `dotnet-sdk.dotnet` to not conflict with a globally installed .NET Core version you may have.
- Optionally, you can set an alias to `dotnet` with `sudo snap alias dotnet-sdk.dotnet dotnet` and remove with `sudo snap unalias dotnet`.
- Run `dotnet-sdk.dotnet --version`, you should find `6.0.100-preview.5.21302.13` or a newer version of .NET 6.
- You can now use .NET 6 project.

# More for installation document
- https://docs.microsoft.com/en-us/dotnet/core/install/linux-ubuntu
