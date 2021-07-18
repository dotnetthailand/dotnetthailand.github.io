---
title: Azure CLI
showMetadata: true
editable: true
showToc: true
---

# Install on WSL2 (Ubuntu)

## How to install with one command
```sh
$ curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

## How to update
- https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-linux?pivots=apt#update

## How to uninstall
- https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-linux?pivots=apt#uninstall

## REF
- https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-linux?pivots=apt

# Log in with Azure CLI
- Execute the following command
```sh
$ az login
```
- A browser will be opened.
- Log in with your Azure account.
- Wait for a while and you will get your subscription in JSON format and a shell is read to enter a new command.

# List all subscription you have
```
$ az account list --output table
```

# Set a default subscription
```sh
$ az account set --subscription <subscription name or id>
```
- How to manage Azure subscription https://docs.microsoft.com/en-us/cli/azure/manage-azure-subscriptions-azure-cli?view=azure-cli-latest

# Create a resource group with default subscription.
```sh
$ az group create --location <location-name> --name <resource-group-name>
```
- To list all location, use `az account list-locations`.
- To list all existing groups of the default subscription, use `az group list --output table`.
- [More details for Azure resource group](https://docs.microsoft.com/en-us/cli/azure/group?view=azure-cli-latest)

# Create an App Service and deploy with source code

## Create an App Service plan
```sh
$ az appservice plan create --name <app-service-plan-name> --resource-group <resource-group-name> --sku FREE
```
- To list all existing service plans, use `az appservice plan list --output table`.
- SKU value are `B1, B2, B3, D1, F1, FREE, I1, I1v2, I2, I2v2, I3, I3v2, P1V2, P1V3, P2V2, P2V3, P3V2, P3V3, PC2, PC3, PC4, S1, S2, S3, SHARED`.
- [More details for App Service plan](https://docs.microsoft.com/en-us/cli/azure/appservice/plan?view=azure-cli-latest)

## Create an App Service and deploy with source code
```sh
$ az webapp create \
  --name <app-service-name> \
  --plan <app-service-plan-name> \
  --resource-group <resource-group-name> \
  --runtime <runtime>
```
- Access a website as `app-service-name.azurewebsites.net`.
- To list all existing App Service, use `az webapp list --output table`.
- To list all supported runtime, use `az webapp list-runtimes --output table`.
- **Note**, you need to put double quote to a runtime value.
- After your App Service is ready, it will deploy your source code from a Git server. You can log in to Azure portable to check deployment status.
- [More details for App Service](https://docs.microsoft.com/en-us/cli/azure/webapp?view=azure-cli-latest)
