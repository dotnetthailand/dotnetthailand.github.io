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
