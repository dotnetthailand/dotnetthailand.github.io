---
title: Bash script
showMetadata: true
editable: true
showToc: true
---
# If statement
```sh
if [ -f "README.md" ]
then
  echo "README.md exists"

elif [ -f "CONTRIBUTING.md" ]
then
  echo "CONTRIBUTING.md exists"

else
  echo "Files not found"
fi
```

# If single line statement
```sh
if [ -f "/usr/bin/wine" ]; then export WINEARCH=win32; fi

if ps aux | grep some_proces[s] > /tmp/test.txt; then echo 1; else echo 0; fi
```

```sh
[ -f "/usr/bin/wine" ] && export WINEARCH=win32
```
