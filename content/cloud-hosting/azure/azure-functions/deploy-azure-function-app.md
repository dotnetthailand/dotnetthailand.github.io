---
title: Deploy Azure Function App
showMetadata: true
editable: true
order: 2
---

# Deploy Azure Function App

## Prerequisite
- [Install Azure CLI](/cloud-hosting/azure/azure-cli)
- [Install Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=linux%2Ccsharp%2Cbash#v2)
- Azure Function App project, you can follow [this document](create-azure-functions-app-project) to create a new Azure Function App project.
- Azure Function App on Azure cloud, you can follow [this document](create-azure-functions-app-on-azure-cloud) to create a new Azure Function App on Azure cloud.

## Deploy Azure Function App to Azure cloud manually
- CD to root of a function project and use the following command to build the project:
- If your project is TypeScript project, use `yarn run build` to build to project.
- Publish your function app to Azure with the following command:
  ```sh
  $ az login
  $ func azure functionapp publish <APP_NAME>
  ```
- Change `APP_NAME` to your Azure Function App's name that you have created in Azure cloud.
- After the app has been deployed, you should see `Deployment completed successfully` message in a terminal and list of functions in the app.

# Test the function app on Azure
- If it is HTTP function, copy an invoke URL from a terminal into a browser's address bar. The URL pattern should be `https://<APP_NAME>.azurewebsites.net/api/<FUNCTION_NAME>`.
- Append query string `?name=<YOUR_NAME>` and press enter to execute the function.
- You should see a message as `Hello <YOUR_NAME>` in a browser.
  ![](images/azure-functions-on-cloud.png)
- If your app is timer trigger, you can view realtime log stream with the following commands:
  ```sh
  $ func azure functionapp logstream <APP_NAME>
  ```
- By default, log message in a function does not show on log stream, you need to login to Azure portal and check message from Monitor > Invocations tab page and a function app must has **enabled Application Insights**.
