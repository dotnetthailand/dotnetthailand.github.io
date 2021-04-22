---
title: Docker CMD & ENTRYPOINT
showMetadata: true
editable: true
showToc: true
---

- CMD sets default command and/or parameters, which can be overwritten from command line when docker container runs.
- ENTRYPOINT configures a container that will run as an executable.
- Prefer ENTRYPOINT to CMD when building executable Docker image and you need a command always to be executed.
- Choose CMD if you need to provide a default command and/or arguments that can be overwritten from command line when docker container runs.
- Choose CMD to be be a default parameter of ENTRYPOINT that can be overwritten later.

```
# Dockerfile
FROM ubuntu
MAINTAINER KubeOps
RUN apt-get update
ENTRYPOINT ["echo", "Hello"]
CMD ["World"]
```

```
$ docker build .
```
output
```
$ Hello world
```

# Command in a Docker compose file
The Docker Compose command or everything in a docker run invocation after the image name, overrides the Dockerfile CMD.

If the image also has an ENTRYPOINT, the command you provide here is passed as arguments to the entrypoint in the same way the Dockerfile CMD does.

# Useful links
- https://goinbigdata.com/docker-run-vs-cmd-vs-entrypoint/
- https://phoenixnap.com/kb/docker-cmd-vs-entrypoint
- https://stackoverflow.com/a/61794651/1872200
