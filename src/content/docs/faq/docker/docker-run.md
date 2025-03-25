---
title: Docker run
showMetadata: true
editable: true
showToc: true
order: 8
---

# Attach an existing network when run a docker

```
docker run --publish 3001:3001 --env-file .env --network network-name image-name
```

# Connect to your host localhost from a container

- Use `--network host` in your docker run command, then 127.0.0.1 in your docker container will point to your docker host.

```
docker run --publish 3001:3001 --env-file .env --network host image
```
