---
title: Shape in Orchard Core CMS
showMetadata: true
editable: true
showToc: true
order: 2
---

# What is a shape?

A Shape is an object that holds some data, like a view model, and also some metadata about how to render it.
Any class that implements IShape is a shape.
Shapes are used to as a way to render some html, and to do so you need to call the IDisplayHelper.DisplayAsync(shape) that returns Task`<IHmlContent>`.

When calling this method you don't need to specify a template, it will trigger an event to allow any component in the system to chose what template is best suited to render this specific shape.
This is why a shape can be rendered using a cshtml file, a liquid file, some template from the database, some code, ... it's completely extensible, but from your point of view you just ask it to be rendered.
This is an advantage over Views in MVC where when return a ViewResult from an action the template is strongly associated with the action.

This indirection is very useful for theming, such that templates can come from different modules, or any module can redefine what template to use for a shape.
So as a developer you can provide one default template with your shape that represents a Menu, but allow any other module or theme to redefine it.

Then to allow for better granularity in ways to select a template, the shape has a **Metadata.Alternates** property that contains which templates names are better suited for this shape, in order of priority.
Like a shape representing an Article, which is a Content item, could accept template for an with a specific name, or a template for any article, or a template for any content item.
This allows the themes to be able to customize the templates for very specific instances of shapes, or group of shapes.

When working in the decoupled CMS mode, you are removing theming altogether, and not using shapes at all, because you implement each view and route handler, and don't expect anything else to be able to override these.
But most modules that expose front-end views need to use shapes in order to allow a theme to customizes parts of the system without having to re-implement all handlers and views.

Content from [GitHub Discussion](https://github.com/OrchardCMS/OrchardCore/issues/4121#issuecomment-539608731) & credit to `Sébastien Ros`

# Dynamically create a shape in a view
- In any cshtml page, we can create a new shape with `New` property of the current view which holds a `ShapeFactory` object reference and use `DisplayAsync` method to display a shape.
  ```html
    @* Views/Home/Index.cshtml *@
    @{
     // Create a shape
      var shape = await New.Foo(Message: "Hello World");
    }

    @* Display a shape *@
    <h1>
      @await DisplayAsync(shape)
    </h1>
  ```
- The shape `Foo` will use `Foo.cshtml` as a template and pass a model with Message property to it.
- Then we can access `Model.Message` in `Foo.cshtml`.
  ```html
    @* Foo.cshtml *@
    <span>@Model.Message</span>
  ```
- We can create any shape for our requirement, e.g. `header`, `branding`.

## Example file structure of Foo shape
  ```sh
    $ tree Views
    Views
    ├── Foo.cshtml
    └── Home
        └── Index.cshtml
  ```

# Create a shape without ViewModel in a DisplayDriver class
- We usually use `DisplayDriverBase.Initialize<TModel>` to create a ShapeResult for a content part.
- However, this method requires a view model which sometimes we don't need it.
- We can use other methods to create a ShapeResult without a view model. For example:
  ```cs
    var shapeResult = Dynamic(nameof(FooPart)).Location("Detail", "Content");
  ```

  ```cs
    return Factory(
        nameof(FooPart),
        async context => await context.New.FooPart()
    ).Location("Detail", "Content");
  ```

# Useful resource of how to override a template
- [Orchard Core CMS's templates document](https://docs.orchardcore.net/en/dev/docs/reference/modules/Templates/)
- Alternated shapes are attached to a shape metadata (Shape.MetaData.Alternates) in [OrchardCore.Contents.Shape](https://github.com/OrchardCMS/OrchardCore/blob/main/src/OrchardCore.Modules/OrchardCore.Contents/Shapes.cs#L28)
- Available display types:
  - Detail
  - Summary
  - DetailAdmin
  - SummaryAdmin
- Useful template names to override, shape and template
  - Content_[DisplayType]__[ContentType] => Content-Book.Summary.cshtml
  - [ContentType]_[DisplayType]__[PartType] => ContentType-TitlePart.Summary.cshtml

# How a template (.cshtml file) is mapped to a type name:
- `.` will be converted to `_` e.g. Item.Mata.cshml => Item_Mata
- `-` will be converted to `__` e.g. Item-Mata.cshml => Item__Mata
- `--` will be converted to `__` e.g. Item--Mata.cshml => Item__Mata
- It is defined in [BasicShapeTemplateHarvester.cs](https://github.com/OrchardCMS/OrchardCore/blob/main/src/OrchardCore/OrchardCore.DisplayManagement/Descriptors/ShapeTemplateStrategy/BasicShapeTemplateHarvester.cs#L45)

# Add a new shape to an existing content item
- We can create a derived class class of `ContentDisplayDriver` and override the following method to attached a new shape which will be rendered along with a content item.
- Available methods to override:
  - public virtual methods defined in [OrchardCore.DisplayManagement.Handlers.DisplayDriver](https://github.com/OrchardCMS/OrchardCore/blob/main/src/OrchardCore/OrchardCore.DisplayManagement/Handlers/DisplayDriver.cs#L61-L114)
- Example code to attach a `Content_SaveButton` shape to a Product content item rendered along with the content item on an edit page in an admin site.
  ```cs
      using OrchardCore.ContentManagement;
      using OrchardCore.ContentManagement.Display.ContentDisplay;
      using OrchardCore.DisplayManagement.Views;

      namespace MyCustomModule
      {
          public class ProductContentDisplayDriver : ContentDisplayDriver
          {
              private const string contentTypeName = "Product";

              public override IDisplayResult Edit(ContentItem contentItem)
              {
                  if (contentItem.ContentType != contentTypeName)
                  {
                      return null;
                  }

                  // It uses Content.SaveButton.cshtml template in a Views folder of the current module.
                  return Dynamic("Content_SaveButton").Location("DetailAdmin", "Action:0");
              }
          }
      }
  ```
  - You also need to register a custom ContentDisplayDriver in a Startup.cs file of the current module as following code:
  ```cs
      services.AddScoped<IContentDisplayDriver, ProductContentDisplayDriver>();
  ```
  - You can also use `Combine(params IDisplayResult[] results)` method to return multiple shapes from `ContentDisplayDriver`.

# placement.json tip
- We can control how to place our shape with placement.json which is added to the root of a module.
- Here are code examples of how to use placement.json:
  - Hide an existing shape of a specific content type:
    ```json
      // placement.json
      {
        "ContentPreview_Button": [
          {
            "contentType": [
              "Blog"
            ],
            "place": "-"
          }
        ]
      }
    ```
  - Change a local zone position of an existing shape only an frontend summary page (list item page):
    ```json
      // placement.json
      {
        "TaxonomyField_Display__Tags": [
          {
            "contentType": ["BlogPost"],
            "displayType": "Summary",
            "place": "Footer:0"
          }
        ]
      }
    ```
- Orchard can parse `placement.json` with a comment, so we can enable VS Code to support JSON comment by adding the following code to a settings.json in your `.vscode` folder at the root level of your project.
  ```json
    {
      "files.associations": {
        "*.json": "jsonc"
      }
    }
  ```
- To learn more about placement.json, please check [placement document](https://docs.orchardcore.net/en/dev/docs/reference/core/Placement/).

# Useful source code for referencing
- https://github.com/OrchardCMS/OrchardCore/blob/dev/src/OrchardCore.Modules/OrchardCore.Demo/ContentElementDisplays/TestContentElementDisplayDriver.cs
- https://github.com/OrchardCMS/OrchardCore/blob/dev/src/OrchardCore/OrchardCore.DisplayManagement/Views/ShapeResult.cs
- https://github.com/OrchardCMS/OrchardCore/blob/dev/src/OrchardCore/OrchardCore.DisplayManagement/Implementation/DefaultShapeFactory.cs
- https://github.com/OrchardCMS/OrchardCore/blob/dev/src/OrchardCore/OrchardCore.DisplayManagement/Handlers/DisplayDriverBase.cs
