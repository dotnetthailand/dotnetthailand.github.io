---
title: Exit code
showMetadata: true
editable: true
showToc: true
---

# Bypass last exit code but keep the actual value
This is useful for CI/CD when you want to run a command which does not return exit code 0 and you don't want to fail a build process.

Bash with subshell

```sh
workspaces_info_result=$(yarn workspaces info > /dev/null 2>&1; echo $?; exit 0)
```

PowerShell (pwsh) with script block and global variable
```
$workspacesInfoResult = & { yarn workspaces info 2>&1 | Out-Null; $LastExitCode; $global:LastExitCode = 0 }
```
