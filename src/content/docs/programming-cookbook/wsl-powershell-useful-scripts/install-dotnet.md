---
title: Install .NET on WSL2
showMetadata: true
editable: true
showToc: true
---

# How to install .NET on Ubuntu LTS

- Open a terminal and run the following commands:
  ```sh
  $ wget https://packages.microsoft.com/config/ubuntu/$(lsb_release -rs)/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
  $ sudo dpkg -i packages-microsoft-prod.deb
  $ rm packages-microsoft-prod.deb
  ```
- Then run:
  ```sh
  $ sudo apt update; \
    sudo apt install -y apt-transport-https && \
    sudo apt update && \
    sudo apt install -y dotnet-sdk-6.0
  ```

# Install other versions
- To install other versions, use this format `{product}-{type}-{version}`.
- Available values are:
  - For product: `dotnet`, `aspnetcore`
  - For type: `sdk`, `runtime`
  - For version: `6.0`, `5.0`, `3.1`, `3.0`, `2.1`

- To install .NET Core 3.1 SDK, use the following command:
  ```sh
  $ sudo apt install -y dotnet-sdk-3.1
  ```

# Check all installed .NET
- To list all installed .NET SDK on your computer, run:
  ```sh
  $ dotnet --list-sdks
  ```

- Example output:
  ```sh
  3.1.407 [/usr/share/dotnet/sdk]
  5.0.101 [/usr/share/dotnet/sdk]
  6.0.100 [/usr/share/dotnet/sdk]
  ```

# Optionally install .NET preview version with Snap tool
- Run the following command to install the latest .NET Core SDK:
  ```sh
  $ sudo snap install dotnet-sdk --channel=6.0/beta --classic
  ```
- Wait several minutes until the installation has finished.
- The default .NET Core command is `dotnet-sdk.dotnet` for not conflict with a globally installed .NET Core version that you may have.
- You can also set its alias to `dotnet` with `sudo snap alias dotnet-sdk.dotnet dotnet` and remove it with `sudo snap unalias dotnet`.
- Run `dotnet-sdk.dotnet --version`, you should find `6.0.100-preview.5.21302.13` or a newer version of .NET.
- You can now use .NET project which installed with Snap.

# More information for installation document
- https://docs.microsoft.com/en-us/dotnet/core/install/linux-ubuntu
