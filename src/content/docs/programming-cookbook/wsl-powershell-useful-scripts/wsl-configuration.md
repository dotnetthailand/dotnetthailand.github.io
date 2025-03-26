---
title: WSL configuration
showMetadata: true
editable: true
showToc: true
---

# Limit memory used by WSL
- In Windows, open ~/.wslconfig
- Add the following contents:
```
[wsl2]
memory=6GB # Limits VM memory in WSL 2 up to 6GB
```
- Save and exit.
- Restart WSL to get a new configuration.
- Lunch a new PowerShell and run the following command:
```
wsl --shutdown
```
- REF https://docs.microsoft.com/en-us/windows/wsl/wsl-config#configure-global-options-with-wslconfig


