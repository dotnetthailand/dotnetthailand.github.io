---
title: Orchard Core CMS Troubleshooting
showMetadata: true
editable: true
showToc: true
order: 2
---

# All CSS files are not included to a layout page when running a website
It is possible that you've included a CSS that is not defined in the current theme.

For example, you may include `thetheme-bootstrap-oc` which is defined in `src/OrchardCore.Themes/TheTheme/ResourceManifestOptionsConfiguration.cs`
and `TheTheme` is not the current theme.

This causes all CSS files in a layout page not included when running a website.

However, if you directly include an non-existent file with `asp-src`, this does not cause an issue.


# Tag helper is not rendered correctly

If you include tag helper and it is not rendered correctly. This means you may forgot to add `@addTagHelper` to `_ViewImports.cshtml` file.

Given this example, you may want to include a style sheet to head tag of HTML document. Your code may look like:

```html
<style asp-src="~/MyModuleName/styles/site.css" at="Head"></style>
```

However, this code get rendered where it is and showed in head tag of HTML document. This is not what we expect.

We can solve this problem by adding the following code to `_ViewImports.chtml` in a root of `Views` folder of a module.

```html
@* _ViewImport.cshtml *@
@inherits OrchardCore.DisplayManagement.Razor.RazorPage<TModel>
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
@addTagHelper *, OrchardCore.DisplayManagement
@addTagHelper *, OrchardCore.ResourceManagement

```
