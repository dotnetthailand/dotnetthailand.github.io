---
title: ASP.NET Core tips
showMetadata: true
editable: true
---

## Get query string value on a Razor page (*.cshtml)
```cs
  @{
    var queryStringValue = Context.Request.Query["queryStringName"];
  }
```

## Get route data value on a Razor page (*.cshtml)

``` cs
  @{
    var routeDataValue = Context.Request.RouteValues["routeDataKey"];
  }
```
