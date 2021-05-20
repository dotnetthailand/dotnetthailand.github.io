---
title: Remove .NET on WSL2
showMetadata: true
editable: true
showToc: true
---

# For Ubuntu:

- First list the dotnet packages installed:
```
sudo apt --installed list | grep "dotnet"
```
- You'll have a result like this:
```
dotnet-apphost-pack-3.0    dotnet-hostfxr-3.1         dotnet-runtime-deps-5.0
dotnet-apphost-pack-3.1    dotnet-hostfxr-5.0         dotnet-sdk-5.0
dotnet-apphost-pack-5.0    dotnet-runtime-5.0         dotnet-targeting-pack-3.0
dotnet-host                dotnet-runtime-deps-2.2    dotnet-targeting-pack-3.1
dotnet-hostfxr-2.2         dotnet-runtime-deps-3.0    dotnet-targeting-pack-5.0
dotnet-hostfxr-3.0         dotnet-runtime-deps-3.1
```
- To uninstall the packages of linked to version 3 for example just type:
```
$ sudo apt-get remove --purge dotnet-*3*
```

# Credit
https://stackoverflow.com/a/43232120/1872200
