---
title: Read a file in an Orchard Core module
showMetadata: true
editable: true
showToc: true
order: 2
---

Here is a code snippet to read a file which is in a root of a module project:

```cs
// Migrations.cs
public Task<string> ReadFileAsync(){
    // _typeFeatureProvider from constructor DI
    var featureInfo = _typeFeatureProvider.GetFeatureForDependency(typeof(Migrations));

    // featureInfo.Extension.SubPath returns /Areas/ModuleName.
    // content.txt is in a root of a module project.
    var filePath = Path.Combine(featureInfo.Extension.SubPath, "content.txt").Replace('\\', '/');

    // We need to get a file info from hostingEnvironment and use it to create a file stream.
    var fileInfo = _hostingEnvironment.ContentRootFileProvider.GetFileInfo(filePath);

    using var stream = fileInfo.CreateReadStream();
    using var reader = new StreamReader(stream);

    // Just return a task.
    return reader.ReadToEndAsync();
}
```
