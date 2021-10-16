---
title: Docker container
showMetadata: true
editable: true
showToc: true
---

# Tips

Your can use container id or container name replace \<container\> argument.

# To list all container

```
docker container ls or docker ps
```

# To remove container

```
docker rm <container>
```

# To fetch the logs

```
docker logs <container>
```

# To run command in container

```
docker exec [OPTIONS] <container> command [ARG...]
```

### frequently example:

```
docker exec -it <container> sh
```

# To start container

```
docker start <container>
```

# To stop container

```
docker stop <container>
```

# To copy files/folders between container and local filesystem

```
docker cp [OPTIONS] <container>:<src_path> <dest_path>
docker cp [OPTIONS] <src_path> <container>:<dest_path>
```
