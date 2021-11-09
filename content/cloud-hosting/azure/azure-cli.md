---
title: Azure CLI
showMetadata: true
editable: true
showToc: true
---

# Install on WSL2 (Ubuntu)

## How to install with one command
  ```sh
  curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
  ```

## Update to the latest version
  ```sh
  az upgrade
  ```
- Learn more https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-linux?pivots=apt#update

## How to uninstall
- https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-linux?pivots=apt#uninstall

## REF
- https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-linux?pivots=apt

# Log in with Azure CLI
- Execute the following command
  ```sh
  az login
  ```
- A browser will be opened.
- Log in with your Azure account.
- Wait for a while and you will get your subscription in JSON format and a shell is read to enter a new command.

# List all subscription you have and check a default subscription
  ```
  az account list --output table
  ```

# Set a default subscription
  ```sh
  az account set --subscription <subscription name or id>
  ```
- How to manage Azure subscription https://docs.microsoft.com/en-us/cli/azure/manage-azure-subscriptions-azure-cli?view=azure-cli-latest

# Create a resource group with a default subscription.
  ```sh
  az group create --location <location-name> --name <resource-group-name>
  ```
- To list all locations, use `az account list-locations --output table`.
- To list all existing resource groups of the default subscription, use `az group list --output table`.
- [More details for Azure resource group](https://docs.microsoft.com/en-us/cli/azure/group?view=azure-cli-latest)

# Get Azure Credentials for azure/login action
- Run the following command:
```sh
 az ad sp create-for-rbac \
  --name {name} --role contributor \
  --scopes /subscriptions/{subscription-id}/resourceGroups/{resource-group} \
  --sdk-auth
```
- Replace {name}, {subscription-id} and {resource-group} with your name reference, subscription and resource group.
- The command should return JSON object similar to this:
```json
  {
    "clientId": "<GUID>",
    "clientSecret": "<GUID>",
    "subscriptionId": "<GUID>",
    "tenantId": "<GUID>",
    (...)
  }
```
- Store the above JSON object as the value of a GitHub secret with a name, for example `AZURE_CREDENTIALS`
- Then use a secret in your GitHub Actions workflow script,  for example `${{ secrets.AZURE_CREDENTIALS }}`
