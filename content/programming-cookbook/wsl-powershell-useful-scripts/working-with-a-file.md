---
title: Working with a file
showMetadata: true
editable: true
showToc: true
---

# Convert end of line CRLF to LF
  ```ps
    PS> $path = ".\file-name.txt"; `
      (Get-Content $path -Raw).Replace("rn", "`n") `
      | Set-Content $Path -NoNewline -Force
  ```

# Find all folders contain a specific file name
- For example, find yarn.lock and are not in node_modules folder
  ```ps
    PS>  Get-ChildItem -Path . -Recurse -Filter "yarn.lock" `
      | Select-Object -ExpandProperty DirectoryName -Unique `
      | Where-Object { $_ -NotMatch "node_modules" }
  ```

# Rename all files in a folder
  ```ps
    PS> gci | ren -NewName { $_.Name -replace "old-name", "new-name" }
  ```

# Get all files' names in the current directory

## Bash with ls and grep commands
  ```sh
    $ ls -al | grep -Po "(?<=\s)[\w\-\.]+$"
  ```

### Short explaination of the Regex patern:
- Find any string which contains A-Z, a-z, 0-9, _, - and . at the end of a line and has a single space before it.

### More detail of matches:
- `(?<=\s)`, match the position only which has a single space come before it and start a new search position.
- `[\w\-\.]+`, match `[a-zA-Z0-9_\-\.]` at least one character
- `$` match the position after the last character at the end of line.

## PowerShell with Get-ChildItem and Select-Object Cmdlets
  ```ps
    PS> gci | select name
  ```
