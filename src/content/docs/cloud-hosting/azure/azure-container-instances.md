---
title: Azure Container Instances
showMetadata: true
editable: true
showToc: true
---

# What is Azure Container Instances (ACI)?

Azure Container Instances (ACI) is a managed service that allows you to run containers directly on the Microsoft Azure public cloud, without requiring the use of virtual machines (VMs).

# Azure Container Instance Features

- [Support for both Linux and Windows containers](https://docs.microsoft.com/en-us/azure/container-instances/)
- [Support for persistent storage by mounting Azure file shares to the container](https://docs.microsoft.com/en-us/azure/container-instances/container-instances-volume-azure-files)
- [Bursting from AKS to ACI with the Virtual Kubelet](https://docs.microsoft.com/en-us/azure/aks/virtual-nodes-cli)

# Quick Start Azure Container Instances (ACI) using Docker Context and Docker Compose

## Prerequisites
- [Compose v2](https://github.com/docker/compose-cli)

## Log into Azure

```shell
$ docker login azure
```

This opens your web browser and prompts you to enter your Azure login credentials. If the Docker CLI cannot open a browser, it will fall back to the [Azure device code flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-device-code) and lets you connect manually.

## Prepare a Docker Context

```shell
$ docker context create aci myaci
```

This command automatically uses your Azure login credentials to identify your subscription IDs and resource groups.

## Use the Docker Context

```shell
$ docker context use myaci
```

## Prepare a Docker Compose File

```yaml
version: "3.9"

services:
  dotnet-core-web-api:
    image: ghcr.io/kubeopsskills/dotnet-core-web-api:1.0.0
    deploy:
      restart_policy:
        condition: on-failure
      resources:
        reservations:
          cpus: '1'
          memory: 1G
        limits:
          cpus: '1'
          memory: 1G
    healthcheck:
      test: ["CMD", "curl", "-f", "http://127.0.0.1:8090/health"]
      interval: 10s
      timeout: 3s
      retries: 3
      start_period: 10s
    ports:
      - 8090:8090
    environment:
      ASPNETCORE_URLS: http://*:8090
      ASPNETCORE_ENVIRONMENT: Development
```

## Run Docker Compose Up

```shell
$ docker compose up -d
```

This will create an ACI linux container group and deploy the container into it.