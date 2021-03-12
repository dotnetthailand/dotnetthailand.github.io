---
title: Install .NET on WSL2
showMetadata: true
editable: true
showToc: true
---

# How to install .NET on Ubuntu 18.04 LTS

Open a terminal and run the following commands:
```
wget https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
```
Then run:
```
sudo apt-get update; \
  sudo apt-get install -y apt-transport-https && \
  sudo apt-get update && \
  sudo apt-get install -y dotnet-sdk-5.0
```

To install other versions, use this format `{product}-{type}-{version}`.

Available values are:

- For product: dotnet, aspnetcore
- For type: sdk, runtime
- For version: 5.0, 3.1, 3.0, 2.1

To install .NET Core 3.1 SDK, use the following command:
```
sudo apt-get install -y dotnet-sdk-3.1
```

To list all installed .NET SDK on your computer, run:
```
dotnet --list-sdks
```

Example output:
```
3.1.407 [/usr/share/dotnet/sdk]
5.0.101 [/usr/share/dotnet/sdk]
```

REF https://docs.microsoft.com/en-us/dotnet/core/install/linux-ubuntu
