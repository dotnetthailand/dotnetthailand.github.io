---
title: Docker Images
showMetadata: true
editable: true
showToc: true
---

# จะหา tag Docker images ของ .NET Core และ ASP.NET Core MVC ได้จากที่ใด
- .NET Core **new** repository [mcr.microsoft.com/dotnet/sdk:tag](https://mcr.microsoft.com/v2/dotnet/sdk/tags/list)
- .NET Core old repository [mcr.microsoft.com/dotnet/core/sdk:tag](https://mcr.microsoft.com/v2/dotnet/core/sdk/tags/list)
- ASP.NET Core MVC **new** repository [mcr.microsoft.com/dotnet/aspnet:tag](https://mcr.microsoft.com/v2/dotnet/aspnet/tags/list)
- ASP.NET Core MVC old repository [mcr.microsoft.com/dotnet/core/aspnet:tag](https://mcr.microsoft.com/v2/dotnet/core/aspnet/tags/list)
- .NET Framework และ Windows container for a legacy project [mcr.microsoft.com/dotnet/framework/sdk:tag](https://mcr.microsoft.com/v2/dotnet/framework/sdk/tags/list)

# ตัวอย่างการใช้งานคำสั่ง docker pull

```sh
docker pull mcr.microsoft.com/dotnet/sdk:2.1
docker pull mcr.microsoft.com/dotnet/core/sdk:2.2
```
เนื่องจาก .NET Core 2.2 ไม่ได้ถูก pull ไปยัง new repository

# Useful resources
- .NET Docker repository has been renamed https://github.com/dotnet/dotnet-docker/issues/2375
- With the release of .NET 5.0, all Docker tags for .NET Core 2.1/3.1 and .NET 5.0 will be published to one set of unified Docker repositories.

