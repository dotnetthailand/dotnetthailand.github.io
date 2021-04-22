---
title: Docker CMD VS ENTRYPOINT
showMetadata: true
editable: true
showToc: true
---
# Definition
- CMD sets default command and/or parameters, which can be overwritten from command line when docker container runs.
- ENTRYPOINT configures a container that will run as an executable.

# When to use CMD or ENTRYPOINT
- Prefer ENTRYPOINT to CMD when building executable Docker image and you need a command always to be executed.
- Choose CMD if you need to provide a default command and/or arguments that can be overwritten from command line when docker container runs.
- Choose CMD to be be a default parameter of ENTRYPOINT that can be overwritten later.

# Example of how to use CMD & ENTRYPOINT together

- Create a Docker file
```dockerfile
# Dockerfile
FROM ubuntu
LABEL maintainer="KubeOps"

RUN apt-get update
ENTRYPOINT ["echo", "Hello"]
CMD ["World"]
```

- Launch a new shell.
- Build a Docker image.
```sh
docker build -t my-custom-image:latest .
```

- List the created image.
```sh
docker image ls
```

- Launch a container.
```sh
docker run my-custom-image:latest
```

- output
```sh
Hello world
```

# Command in a Docker compose file
The Docker Compose command or everything in a docker run invocation after the image name, overrides the Dockerfile CMD.

If the image also has an ENTRYPOINT, the command you provide here is passed as arguments to the entrypoint in the same way the Dockerfile CMD does.

# Useful links
- https://goinbigdata.com/docker-run-vs-cmd-vs-entrypoint/
- https://phoenixnap.com/kb/docker-cmd-vs-entrypoint
- https://stackoverflow.com/a/61794651/1872200
