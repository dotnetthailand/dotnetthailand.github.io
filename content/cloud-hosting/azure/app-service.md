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
- Command:
  ```sh
  appservice plan create \
      --name <APP_SERVICE_PLAN_NAME> \
      --resource-group <RESOURCE_GROUP_NAME>
      --sku FREE
  ```
- To list all existing service plans, use `az appservice plan list --output table`.
- SKU value are `B1, B2, B3, D1, F1, FREE, I1, I1v2, I2, I2v2, I3, I3v2, P1V2, P1V3, P2V2, P2V3, P3V2, P3V3, PC2, PC3, PC4, S1, S2, S3, SHARED`.
- [More details for App Service plan](https://docs.microsoft.com/en-us/cli/azure/appservice/plan?view=azure-cli-latest)
- Example code to create a free app service plan:
  ```sh
  az appservice plan create \
    --name codesanook-example-app-service-plan \
    --resource-group codesanook-example-resource-group \
    --is-linux \
    --sku FREE
  ```

## Create an App Service for deploying with source code
- Command:
  ```sh
  az webapp create \
    --name <APP_SERVICE_NAME> \
    --plan <APP_SERVICE_PLAN_NAME> \
    --resource-group <RESOURCE_GROUP_NAME> \
    --runtime <RUNTIME>
  ```
- Access a website as `https://APP_SERVICE_NAME.azurewebsites.net`.
- To list all existing App Service, use `az webapp list --output table`.
- To list all supported runtime, use `az webapp list-runtimes --output table`.
- **Note**, you need to wrap double quote to a runtime value.
- After your App Service is ready, it will deploy your source code from a Git server. You can log in to Azure portable to check deployment status.
- [More details for App Service](https://docs.microsoft.com/en-us/cli/azure/webapp?view=azure-cli-latest)
- Example code to create an app service:
  ```sh
  az webapp create \
    --name codesanook-example-app-service \
    --plan codesanook-example-app-service-plan \
    --resource-group codesanook-example-resource-group \
    --runtime "DOTNET|5.0"
  ```

## Deploy a project with GitHub Actions
- You can use our [GitHub Actions workflow script](https://www.dotnetthailand.com/programming-cookbook/github-actions/deploy-dotnet-app-to-azure-app-service) to deploy your project to Azure App Service that you've just created.
- To deploy with GitHub Actions, you need to have Azure App Service publish profile.
- Before getting App Service profile you need to `WEBSITE_WEBDEPLOY_USE_SCM` configuration's value to true

## Update Azure App Service configuration
- Command:
  ```sh
  az webapp config appsettings set \
    --name <APP_SERVICE_NAME> \
    --resource-group <RESOURCE_GROUP_NAME> \
    --settings @<CONFIGURATION_JSON_FILE>
  ```
- Example code to update Azure App Service configuration:
  ```sh
  az webapp config appsettings set \
    --name codesanook-example-app-service \
    --resource-group codesanook-example-resource-group \
    --settings @app-service-configuration.json
  ```
- Example content of a configuration JSON file:
  ```json
  [
    {
      "name": "WEBSITE_WEBDEPLOY_USE_SCM",
      "value": "true",
      "slotSetting": false
    }
  ]
  ```

## Get Azure App Service publish profile
- Command:
  ```sh
  az webapp deployment list-publishing-profiles \
    --name <APP_SERVICE_NAME> \
    --resource-group <RESOURCE_GROUP_NAME> \
    --xml
  ```
- Example code to get Azure App Service publish profile:
  ```sh
  az webapp deployment list-publishing-profiles \
    --name codesanook-example-app-service \
    --resource-group codesanook-example-resource-group \
    --xml
  ```

# Get FTPS Credentials
- Go to Azure portal.
- Select your app service.
- In app service page that you have selected, select `Deployment Center`. Then click `FTPS credentials` tab.
- You will find all required information to make an FTPS connection.
  - FTPS endpoint
  - Username
  - Password

# Other useful commands

## Delete an existing Azure App Service
- Command:
  ```sh
  az webapp delete \
    --name <APP_SERVICE_NAME> \
    --resource-group <RESOURCE_GROUP_NAME>
  ```
- Example code to delete an existing App Service:
  ```sh
  az webapp delete \
    --name codesanook-example-app-service \
    --resource-group codesanook-example-resource-group
  ```
