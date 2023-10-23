---
title: Docker context
showMetadata: true
editable: true
showToc: true
order: 2
---

# Docker Context
A single Docker CLI can have multiple contexts. Each context contains all of the endpoint and security information required to manage a different cloud environment, Swarm nodes, or Kubernetes nodes. The docker context command makes it easy to configure these contexts and switch between them.

## List all docker contexts

```
docker context ls
```

## Create a docker context

```
docker context create [context-type] [context-name]
```

*** context type such as aci, ecs, or leave blank for context-type for Swarm or Kubernetes nodes

## Use a docker context

```
docker context use [context-name]
```

## Remove a docker context

```
docker context rm [context-name]
```

References: 
- [Docker Context](https://docs.docker.com/engine/context/working-with-contexts/)
- [Docker ACI Integration](https://docs.docker.com/cloud/aci-integration/)
- [Docker ECS Integration](https://docs.docker.com/cloud/ecs-integration/)