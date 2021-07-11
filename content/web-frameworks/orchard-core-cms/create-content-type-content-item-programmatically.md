---
title: Create a content type and a content item programmatically
showMetadata: true
editable: true
showToc: true
order: 2
---


# Prerequisite
- We assume that you have a basic knowledge of how to create a custom Orchard Core CMS module. If not, you can learn it by following this content
[orchard-core-cms/create-a-custom-orchard-core-cms-module](orchard-core-cms/create-a-custom-orchard-core-cms-module).
- Code example of how to create a custom module is at [https://github.com/codesanook/orchard-examples](https://github.com/codesanook/orchard-examples).
- We assume that we've already created a map part and its required components, e.g. driver, models, views.
- This content will be focusing on how to create an event content type and an event content item from a map part programmatically.

# Update a migration file
- We are going to update our existing `Migration.cs` in this content [orchard-core-cms/create-a-custom-orchard-core-cms-module](orchard-core-cms/create-a-custom-orchard-core-cms-module).
- However, you can apply this technique to create a content type and a content item programmatically for your requirement.
- Here is the example code after updating:

```cs
using OrchardCore.ContentManagement.Metadata.Settings;
using OrchardCore.ContentManagement.Metadata;
using OrchardCore.Data.Migration;
using Codesanook.Map.Models;

namespace Codesanook.Map
{
    public class Migrations : DataMigration
    {
        IContentDefinitionManager _contentDefinitionManager;
        public Migrations(IContentDefinitionManager contentDefinitionManager) =>
          _contentDefinitionManager = contentDefinitionManager;

        public int Create()
        {
            _contentDefinitionManager.AlterPartDefinition(
                nameof(MapPart),
                part => part
                    .Attachable()
                    .WithDescription("Provide a map part for a content item")
            );

            return 1;
        }

        public async Task<int> UpdateFrom1Async()
        {
            CreateOrganizationProfilePart();
            CreateEventContentType();
            await CreateEventContentItemAsync();

            return 2;
        }

        private void CreateEventContentType()
        {
            _contentDefinitionManager.AlterTypeDefinition(
                "Event",
                type => type
                    .WithPart( nameof(AutoroutePart))
                    .WithPart(
                        nameof(TitlePart),
                        part => part.WithPosition("0") // Move a title input at the top of an editor page in the admin panel.
                    )
                    .WithPart(
                        nameof(HtmlBodyPart),
                        part => part
                            .WithEditor("Wysiwyg") // Use HTML what you see is what you get editor.
                            .WithPosition("1")
                    )
                    .WithPart(
                        nameof(MapPart),
                        part => part.WithPosition("2")
                    )
                    .Creatable()
                    .Listable()
            );
        }

        private async Task CreateEventContentItemAsync()
        {
            var contentItem = await _contentManager.NewAsync("Event");
            var titlePart  =contentItem.As<TitlePart>();
            titlePart.Title = "Orchard Core CMS meetup";
            contentItem.DisplayText = titlePart.Title; // Text box for a title part in an admin panel read a value from DisplayText
            titlePart.Apply(); // We need to explicitly call Apply to apply a change to content item

            var htmlBodyPart = contentItem.As<HtmlBodyPart>();
            htmlBodyPart.Html = "Orchard Core CMS meetup is coming soon";
            htmlBodyPart.Apply();

            var mapPart = contentItem.As<MapPart>();
            htmlBodyPart.Latitude = -25.344;
            htmlBodyPart.Longitude = 131.036;
            htmlBodyPart.Apply();

            await _contentManager.CreateAsync(contentItem, VersionOptions.Published);
        }
    }
}
```

- Note, because we use a strongly type of model parts e.g. TitlePart, HtmlBodyPart, AutoroutePath, we need to reference the following packages to our module project (.csproj file).

```xml
  <ItemGroup>
    <PackageReference Include="OrchardCore.Title" Version="1.0.0-rc2-16349" />
    <PackageReference Include="OrchardCore.Html" Version="1.0.0-rc2-16349" />
    <PackageReference Include="OrchardCore.Autoroute" Version="1.0.0-rc2-16349" />
  </ItemGroup>
```
- Start a project with `dotnet watch run` or `dotnet run`, your migration version should be updated to version `2` and a content type and a content item will be created successfully.
- To check if an event content item is created properly, login to admin panel and navigate to Content > Content Items.
- You will find your event content item created by `Migration.cs file.
- Optionally, you can check your current migration version in a database with the following SQL query (Work for SQL server only).
```sql
SELECT * WHERE [Type] = 'OrchardCore.Data.Migration.Records.DataMigrationRecord, OrchardCore.Data'
```
