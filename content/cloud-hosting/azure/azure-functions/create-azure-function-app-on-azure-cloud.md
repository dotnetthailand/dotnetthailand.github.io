---
title: Create Azure Function App on Azure cloud
showMetadata: true
editable: true
order: 1
---

# Create Azure Function App
## Login To Azure
- You need to have valid subscription.
- Log in to Azure with `az login`. [Learn more about Azure CLI.](/cloud-hosting/azure/azure-cli)
- Use an existing resource group that you have or create a new one. [Learn how to create a new resource group](/cloud-hosting/azure/azure-cli#createaresourcegroupwithdefaultsubscription.).
- Use existing Azure storage account or create a new one. [Learn how to create a new storage account](/cloud-hosting/azure/azure-storage-account/create-azure-storage-account)

## Create Azure Function App in an App Service plan
- Create a new function app in App Service plan with the following command:
  ```sh
  $ az functionapp create \
    --name <APP_NAME> \
    --storage-account <STORAGE_ACCOUNT_NAME> \
    --resource-group <RESOURCE_GROUP_NAME> \
    --plan <APP_SERVICE_PLAN>
    --runtime <RUNTIME> \
    --runtime-version <RUNTIME_VERSION> \
    --functions-version <FUNCTIONS_VERSION> \
    --disable-app-insights true
  ```
- For `APP_SERVICE_PLAN`, you can use an existing plan or create a new one by following [this document](/cloud-hosting/azure/app-service).
- For `RUNTIME` and `RUNTIME_VERSION`, use `az functionapp list-runtimes` to list supported runtimes and versions.
- For `FUNCTIONS_VERSION`, follow [this link](https://learn.microsoft.com/en-us/azure/azure-functions/migrate-version-3-version-4?tabs=net6-in-proc%2Cazure-cli%2Cwindows&pivots=programming-language-csharp) to check Azure Function App version.
- We have disable Application Insights because this is an example app and we don't want to pay for Application Insights.
- If you want to use Application Insights, use the following options to configuration Application Insights when creating function app:
  - --disable-app-insights false
  - --app-insights <APP_INSIGHTS_NAME>
  - --app-insights-key <APP_INSIGHTS_GUID_KEY>
- Example code to create new function app **(NET)** in Azure App Service plan:
  ```sh
  $ az functionapp create \
    --name codesanook-example-function-app \
    --storage-account csexamplestorageaccount \
    --plan codesanook-example-app-service-plan \
    --resource-group codesanook-example-resource-group \
    --runtime dotnet \
    --runtime-version 6 \
    --functions-version 4 \
    --disable-app-insights true
  ```
- Example code to create new function app **(NET)** in Azure App Service plan with Application Insights:
  ```sh
  $ az functionapp create \
    --name codesanook-example-function-app \
    --storage-account csexamplestorageaccount \
    --plan codesanook-example-app-service-plan \
    --resource-group codesanook-example-resource-group \
    --runtime dotnet \
    --runtime-version 6 \
    --functions-version 4 \
    --disable-app-insights false
    --app-insights codesanook-example-app-insights \
    --app-insights-key <APP_INSIGHTS_GUID_KEY> \
  ```

## Create Azure Function App in an consumption plan
- Change `--plan` option to `--consumption-plan-location southeastasia`.
- Use `az functionapp list-consumption-locations --output table` to show all available locations for Azure Functions.
- Example code to create new function app **(Node.js)** in consumption plan:
  ```sh
  $ az functionapp create \
    --name codesanook-example-function-app \
    --storage-account csexamplestorageaccount \
    --consumption-plan-location southeastasia \
    --resource-group codesanook-example-resource-group \
    --runtime node \
    --runtime-version 14 \
    --functions-version 4 \
    --disable-app-insights true
  ```

# Useful commands for Azure Function App

## List all existing Azure Function Apps
- To list all existing Azure Function Apps, use:
  ```sh
  $ az functionapp list \
    --resource-group <RESOURCE_GROUP> \
    --output table
  ```

## Delete an existing Azure Function App
  ```sh
  $ az functionapp delete \
    --name <APP_NAME> \
    --resource-group <RESOURCE_GROUP_NAME> \
    --yes
  ```

# Useful resources
- [az functionapp CLI reference](https://learn.microsoft.com/en-us/cli/azure/functionapp?view=azure-cli-latest)
