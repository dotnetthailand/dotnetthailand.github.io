---
title: App Service
showMetadata: true
editable: true
showToc: true
tocDepth: 3
order: 1
---

# Create an App Service and deploy with source code

## Prerequisite
- Create an Azure Account
- Setup Azure CLI
- Log in with Azure CLI
- Create a resource group.
- To learn these steps, please check [Azure CLI content](/cloud-hosting/azure/azure-cli).

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

## Deploy a project
- You can use our [GitHub Actions workflow script](https://www.dotnetthailand.com/programming-cookbook/github-actions/deploy-dotnet-app-to-azure-app-service) to deploy your project to Azure App Service that you've just created.

# Get FTPS Credentials
- Go to Azure portal.
- Select your app service.
- In app service that you have selected, select `Deployment Center`.
- Click `FTPS credentials` tab.
- You will find all required information to make an FTPS connection.
  - FTPS endpoint
  - Username
  - Password

