---
title: Create a custom Orchard Core CMS theme
showMetadata: true
editable: true
showToc: true
order: 2
---

# Setup a new Orchard project
- Follow steps in [Setup Orchard Core CMS document](/web-frameworks/orchard-core-cms/setup-orchard-core-cms) to create a new Orchard Core CMS only.
- Please do not launch a project and setup a new website.
- You should have a project structure like this:
  ```sh
  $ tree -I 'bin|obj' .
  .
  └── src
      └── OrchardExample.Cms
          ├── NLog.config
          ├── OrchardExample.Cms.csproj
          ├── Program.cs
          ├── Properties
          │   └── launchSettings.json
          ├── Startup.cs
          ├── appsettings.json
          └── wwwroot
  ```

# Create a new theme
- CD to `orchard-example/src` folder.
- Create a new folder with name `Themes` folder.
- CD to `Themes` folder.
- Create a theme with name `OrchardExample.Theme` by using `dotnet new octheme` command.
- *Note*, you can change a theme's name to any name that you want.
  ```sh
  $ cd orchard-example/src
  $ mkdir Themes
  $ cd Themes
  $ dotnet new octheme --name OrchardExample.Theme --AddLiquid false
  ```
- *Note* Orchard Core CMS's theme/view supports Liquid template and it is set a default value to Liquid template.
  However we want to use Razor template because we can debug it with stepping into/stepping over and we can also use C# code inside a view.

# Our project structure after adding a theme
- Inside the root folder (orchard-example), excecute the follow command to see the project structure.
```
$ tree -I 'bin|obj|' .
.
└── src
    ├── OrchardExample.Cms
    │   ├── NLog.config
    │   ├── OrchardExample.Cms.csproj
    │   ├── Program.cs
    │   ├── Properties
    │   │   └── launchSettings.json
    │   ├── Startup.cs
    │   ├── appsettings.json
    │   └── wwwroot
    │       └── .placeholder
    └── Themes
        └── OrchardExample.Theme
            ├── Manifest.cs
            └── OrchardExample.Theme.csproj
```

# Create a layout file
- CD to `orchard-example` (the root folder) and use `code .` command to launch VS Code.
- Create `Views/Layout.cshtml` file inside `OrchardExample.Theme` folder.
- Add the following content to `Layout.cshtml`.
  ```html
  <!DOCTYPE html>
  <html lang="@Orchard.CultureName()">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@RenderTitleSegments(Site.SiteName, "before")</title>
    <resources type="Meta" />

    <!-- INSERT REQUIRED RESOURCES HERE -->
    <style asp-name="bootstrap" version="4" at="Head"></style>
    <script asp-name="bootstrap" version="4" at="Foot"></script>

    <resources type="HeadLink" />
    <resources type="Stylesheet" />
    <resources type="HeadScript" />
  </head>
  <body dir="@Orchard.CultureDir()">

    @await RenderBodyAsync()

    <footer>
      @await RenderSectionAsync("Footer", required: false)
    </footer>

    <resources type="FootScript" />
  </body>
  </html>
  ```
- *Please note that `Layout.cshtml` is the main document of our theme which contains header, body and footer*.
- Add `_ViewImports.cshtml` file inside the `Views` folder and add the following content to it.
  ```html
  @inherits OrchardCore.DisplayManagement.Razor.RazorPage<TModel>
  @addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
  @addTagHelper *, OrchardCore.DisplayManagement
  @addTagHelper *, OrchardCore.ResourceManagement
  @addTagHelper *, OrchardCore.Menu
  @using Microsoft.AspNetCore.Routing
  @using Microsoft.Extensions.Options
  @using OrchardCore.ContentManagement
  @using OrchardCore.ContentManagement.Routing
  ```

# Our project structure after adding Layout.cshtml
```sh
$ tree -I 'bin|obj|App_Data|Localization|wwwroot' .
.
└── src
    ├── OrchardExample.Cms
    │   ├── NLog.config
    │   ├── OrchardExample.Cms.csproj
    │   ├── Program.cs
    │   ├── Properties
    │   │   └── launchSettings.json
    │   ├── Startup.cs
    │   └── appsettings.json
    └── Themes
        └── OrchardExample.Theme
            ├── Manifest.cs
            ├── OrchardExample.Theme.csproj
            └── Views
                ├── Layout.cshtml
                └── _ViewImports.cshtml
```

# Launch a website
- In VS Code, open an integrated terminal at the root level (orchard-example).
- Reference the theme project to the solution file and `OrchardExample.Cms` project by running the following commands:
  ```sh
  $ dotnet sln add ./src/Themes/OrchardExample.Theme/OrchardExample.Theme.csproj
  $ dotnet add ./src/OrchardExample.Cms/OrchardExample.Cms.csproj reference ./src/Themes/OrchardExample.Theme/OrchardExample.Theme.csproj

  ```
- Launch the project with `dotnet run` and specify the main CMS project.
  ```sh
  $ dotnet run --project ./src/OrchardExample.Cms
  ```
- Open a browser and navigate to https://localhost:5001/admin.
- Fill your admin's username and password that you have setup on a setup new website page.
- After you have logged in an admin site, on left-hand side menu, click Design > Themes.
- You should find our `OrchardExample.Theme`, click `Make Current` button to set it as a default frontend theme.
- Go back to the home page (https://localhost:5001/) and you should find that our custom theme has been applied.
- *Note*, the layout of our theme is very simple and it does not have a menu. We will add a menu later when we go deeper in theme development.
