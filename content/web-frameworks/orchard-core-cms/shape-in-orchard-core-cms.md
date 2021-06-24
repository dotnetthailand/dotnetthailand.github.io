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

Content from [GitHub Discussion](https://github.com/OrchardCMS/OrchardCore/issues/4121#issuecomment-539608731) & credit to Sébastien Ros


# Dynamically create a shape in a view
- In any cshtml page, create a new shape with `New` property which holding a ShapeFactory reference.
- Display a shape with `DisplayAsync`.
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

- The shape `Foo` will use `Foo.cshtml` as a template and pass Model with Message property to it.
- You can create any shape to match your requirement, e.g. `header`, `branding`.
- Then we can access `Model.Message` in `Foo.cshtml`.

```html
@* Foo.cshtml *@

<span>@Model.Message</span>

```

## File structure

```
tree Views
Views
├── Foo.cshtml
└── Home
    └── Index.cshtml

```

# Create a shape without ViewModel in DisplayDriver class

We usually use `DisplayDriverBase.Initialize<TModel>` to create a ShapeResult for a content part.
However, this method requires a view model which sometime we don't need it.

We can use other methods to create ShapeResult. For example:

```c#
var shapeResult = Dynamic(nameof(FooPart)).Location("Detail", "Content");
```

```c#
return Factory(
    nameof(FooPart),
    async context => await context.New.FooPart()
).Location("Detail", "Content");
```

# Useful code reference
- https://github.com/OrchardCMS/OrchardCore/blob/dev/src/OrchardCore.Modules/OrchardCore.Demo/ContentElementDisplays/TestContentElementDisplayDriver.cs
- https://github.com/OrchardCMS/OrchardCore/blob/dev/src/OrchardCore/OrchardCore.DisplayManagement/Views/ShapeResult.cs
- https://github.com/OrchardCMS/OrchardCore/blob/dev/src/OrchardCore/OrchardCore.DisplayManagement/Implementation/DefaultShapeFactory.cs
- https://github.com/OrchardCMS/OrchardCore/blob/dev/src/OrchardCore/OrchardCore.DisplayManagement/Handlers/DisplayDriverBase.cs
