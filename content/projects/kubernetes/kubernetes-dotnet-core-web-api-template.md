---
title: Template for Deploying a .NET Core Web API microservice on Kubernetes and ACI
showMetadata: true
editable: true
showToc: true
categories:
  - project
tags:
  - dotnet6
  - dotnet
  - kubernetes
  - ACI
  - API
  - micro-service
---

Original Author: [Sirinat Paphatsirinatthi](https://github.com/dmakeroam)
Source Code: https://github.com/kubeopsskills/dotnet-core-web-api

The aim of this project is to simplify Kubernetes configuration.

This is a boilerplate template for building / deploying a .NET Core Web API microservice on Kubernetes / Azure Container Instance


# .NET Core Web API Starter Project

[![Develop on Okteto](https://okteto.com/develop-okteto.svg)](https://cloud.okteto.com/deploy?repository=https://github.com/kubeopsskills/dotnet-core-web-api&branch=develop)

This is a boilerplate template for building / deploying a .NET Core Web API microservice on Kubernetes / Azure Container Instance.
This leverages .NET 6, new hosting model, and new routing API to enhance .NET performance. You can learn .NET 6 more on [ASP.NET Core minimal APIs](https://www.dotnetthailand.com/web-frameworks/asp-net-core/asp-net-core-minimal-apis).

## Versioning
| GitHub Release | .NET Core Version | Diagnostics HealthChecks Version |
|----------------|------------ |---------------------|
| main | 6.0.100-preview.6.21355.2 | 2.2.0 |

## Project Structure
```
├── Controllers
│   └── KubeOpsController.cs
├── Dockerfile
├── KubernetesLocalProcessConfig.yaml
├── LICENSE
├── Models
│   └── DatabaseConfig.cs
├── Program.cs
├── Properties
│   └── launchSettings.json
├── README.md
├── Services
│   └── APIService.cs
├── Startup.cs
├── appsettings.Development.json
├── bin
│   └── Debug
├── configs
│   └── prod
├── dotnet-core-web-api.csproj
├── dotnet-core-web-api.sln
├── manifests
│   ├── deployment.yaml
│   └── service.yaml
```

- `Dockerfile` is .NET Core Web API Multistage Dockerfile (following Docker Best Practices)
- `KubernetesLocalProcessConfig.yaml` is [Bridge to Kubernetes](https://devblogs.microsoft.com/visualstudio/bridge-to-kubernetes-ga/) config to supports developing .NET Core Web API microservice on Kubernetes
- `configs` folder will contain .NET Core Web API centralized config structure
- `appsettings.Development.json` is .NET Core Web API development environment config
- `manifests` folder will contain Kubernetes manifests (deployment, service)
- `Startup.cs` is .NET Core Web API startup & path routing config
- `Program.cs` is .NET Core Web API environment variable mapping config

## Setting Up

To setup this project, you need to clone the git repo

```sh
$ git clone https://github.com/kubeopsskills/dotnet-core-web-api.git
$ cd dotnet-core-web-api
```

followed by

```sh
$ dotnet restore
```

## Deploying a .NET Core Web API microservice on Kubernetes

### Prerequisite:

- .NET Core Web API Docker Image

Preparing Config Map for .NET Core Web API microservice

```sh
$ kubectl apply -k configs/prod
```

To deploy the microservice on Kubernetes, run following command:

```sh
$ kubectl apply -f manifests
```

This will deploy it on Kubernetes with the centralized config.

## Deploying a .NET Core Web API microservice on Azure Container Instance (ACI)

### Prerequisite:

- [ACI Context](https://docs.docker.com/cloud/aci-integration/#run-docker-containers-on-aci)


To deploy the microservice on ACI, run following command:

```sh
$ docker compose -f aci-docker-compose.yaml up -d
```

## Deploying a .NET Core Web API microservice on [AWS App Runner](https://aws.amazon.com/apprunner/) using AWS Copilot

### Prerequisite:

- [AWS Copilot](https://aws.github.io/copilot-cli/docs/getting-started/install/)

To deploy the microservice on AWS, following these steps:

- Prepare AWS IAM roles and AWS ECR repository for the microservice

```sh
$ copilot init --app kubeops-demo
```

- Create the test environment on AWS

```sh
$ copilot env init --name test --app kubeops-demo
```

- Deploy the microservice on the test environment

```sh
$ copilot svc deploy --env test
```


## Learning Resources:

- [.NET Thailand](https://www.dotnetthailand.com/)
- [Announcing .NET 6 Preview 4](https://devblogs.microsoft.com/aspnet/asp-net-core-updates-in-net-6-preview-4/)
- [Breaking changes in .NET 6](https://docs.microsoft.com/en-us/dotnet/core/compatibility/6.0)
