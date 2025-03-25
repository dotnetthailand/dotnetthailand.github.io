---
title: Docker container
showMetadata: true
editable: true
showToc: true
order: 3
---

# Tips

Your can use container id or container name replace \<container\> argument.

# To list all containers

```sh
docker container ls or docker ps
```

# To remove a container

```sh
docker rm <container>
```

# To fetch logs

```sh
docker logs <container>
```

# To run a command in a container

```sh
docker exec [OPTIONS] <container> command [ARG...]
```

### frequently example:

```sh
docker exec -it <container> sh
```

# To start a container

```sh
docker start <container>
```

# To stop a container

```sh
docker stop <container>
```

# To copy files/folders between a container and a local filesystem

```sh
docker cp [OPTIONS] <container>:<src_path> <dest_path>
docker cp [OPTIONS] <src_path> <container>:<dest_path>
```
