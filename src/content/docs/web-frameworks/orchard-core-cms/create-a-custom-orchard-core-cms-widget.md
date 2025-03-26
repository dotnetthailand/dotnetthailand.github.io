---
title: Create a custom Orchard Core CMS widget
showMetadata: true
editable: true
showToc: true
order: 2
---

# Setup a new Orchard project
- Follow steps in [Setup Orchard Core CMS](/web-frameworks/orchard-core-cms/setup-orchard-core-cms) document to setup a new Orchard Core CMS.
- Please make sure you can login to an admin panel.
- After you have setup a project you should have a project structure like this:
```sh
$ tree -I 'bin|obj' orchard-example
orchard-example
└── src
    └── Orchard.Web
        ├── NLog.config
        ├── Orchard.Web.csproj
        ├── Program.cs
        ├── Properties
        │   └── launchSettings.json
        ├── Startup.cs
        ├── appsettings.json
        └── wwwroot

```
