---
title: Docker network
showMetadata: true
editable: true
showToc: true
---

# List all networks

```
docker network ls
```

# Remove a network

```
docker network rm network-name
```

#

# Example of using host network

- !!! The host networking driver only works on Linux hosts, and is not supported on Docker Desktop for Mac, Docker Desktop for Windows, or Docker EE for Windows Server.
- Run Nginx from localhost:80 but other resources isolated from a host

```
docker run --rm -d --network host --name my_nginx nginx
```

- Access Nginx by browsing to http://locahost:80/.
- More details https://docs.docker.com/network/network-tutorial-host/
