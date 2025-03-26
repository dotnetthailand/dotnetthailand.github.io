---
title: Kill command
showMetadata: true
editable: true
showToc: true
---

# Kill a process on a specific port number

## Get Id of process running at port number
```
sudo lsof -t -i:8000
```
- lsof list of files(Also used for to list related processes)
- t show only process ID
- i show only internet connections related process
- :3000 - show only processes in this port nu

## Kill with id of a process running from a specific port number.
```
sudo kill -9 $(sudo lsof -t -i:3000)
```

# Credit
- https://mr-khan.gitlab.io/linux/2018/05/02/kill-specific-port-on-linux.html
