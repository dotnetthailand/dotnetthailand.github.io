---
title: Setup Orchard Core CMS
showMetadata: true
editable: true
showToc: true
order: 1
---

# Install .NET 5
- Launch a new shell.
- Use the following commands to install .NET 5 on Ubuntu Linux.
```sh
wget https://packages.microsoft.com/config/ubuntu/20.10/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb

sudo apt-get update; \
  sudo apt-get install -y apt-transport-https && \
  sudo apt-get update && \
  sudo apt-get install -y dotnet-sdk-5.0
```

- To in stall .NET on other platforms, please check https://docs.microsoft.com/en-us/dotnet/core/install/.
- Check .NET SDK version.
```
dotnet --list-sdks
```
- It should return `5.0.202 [/usr/share/dotnet/sdk]` or a newer version of .NET 5.
- Then, use the following command to install a new project template.
```sh
dotnet new -i OrchardCore.ProjectTemplates::1.0.0-rc2-* --nuget-source https://nuget.cloudsmith.io/orchardcore/preview/v3/index.json
```

- Use dotnet command to create OrchardCore CMS project with name `Orchard.Web`.
- You can change a name to any name that you want.
```sh
dotnet new occms --name Orchard.Web
```

# Open the project with VS Code
- CD to `Orchard.Web` folder.
- Open the project with VS Code.
```sh
cd Orchard.Web
code .
```

# Add preview package source
- At root of the project, create `nuget.config` file.
- Add the following code to the file.
```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <clear />
    <add key="NuGet" value="https://api.nuget.org/v3/index.json" />
    <add key="OrchardCorePreview" value="https://nuget.cloudsmith.io/orchardcore/preview/v3/index.json" />
  </packageSources>
  <disabledPackageSources />
</configuration>
```

# Project file structure
```
Orchard.Web/
├── NLog.config
├── Orchard.Web.csproj
├── Program.cs
├── Properties
│   └── launchSettings.json
├── Startup.cs
├── appsettings.json
├── nuget.config
└── wwwroot
```

# Restore all Nuget packages and run a website
- Use VS Code integrated terminal by typing **ctrl+`**
- Run the following command at the root of the project.
``` sh
dotnet restore
```

*Note* Please make sure you save all changes before running the command.
- Wait until we have restored all packages successfully.
- Then run:
```
dotnet run
```

# Set up new Orchard CMS website
- Open a browser and navigate to http://localhost:5000.
- You will find Orchard Core CMS setup page.

![Orchard setup page](./images/orchard-setup-page.png)
- *Tip* you can put **chrome://flags/#allow-insecure-localhost** command setting in Chrome's address bar, enable that setting and relaunch Chrome to not show warning message on localhost.
- Set up a new website with any name you want and use **Blog recipe**.
- Use SQLite to simplify our project. For using it as production database, please check  https://www.sqlite.org/whentouse.html.
- *Note* If you are going to use other database types,  you need to create an empty database before setting up a website.**.
- Set admin username and email to any value you want.
- Click `Finish setup` button.
- You will be redirected to a home page.
- Go to an admin panel by navigating to http://localhost:5000/admin and log in with your admin's username and password.

# Example of home page with blog recipe
![](images/orchard-core-cms-home-page.png)

# Example of admin page
![](images/orchard-core-cms-admin-page.png)
