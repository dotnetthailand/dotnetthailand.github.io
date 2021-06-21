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
