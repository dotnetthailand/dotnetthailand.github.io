---
title: File
showMetadata: true
editable: true
showToc: true
---

# Powershell

## Convert end of line CRLF to LF

```ps
$path = ".\file-name.txt"; (Get-Content $path -Raw).Replace("rn", "`n") | Set-Content $Path -NoNewline -Force
```

## Find all folders contain a specific file name
- For example, find yarn.lock and are not in node_modules folder
  ```ps
  Get-ChildItem -Path . -Recurse -Filter "yarn.lock" | Select-Object -ExpandProperty DirectoryName -Unique | Where-Object { $_ -NotMatch "node_modules" }
  ```

## Rename all files in a folder

```ps
gci | ren -NewName { $_.Name -replace "old-name", "new-name" }
```
