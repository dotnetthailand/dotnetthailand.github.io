---
title: Create Azure Function App projects
showMetadata: true
editable: true
order: 0
---


# Develop Azure function app

## Prerequisite
- [Install Azure CLI](/cloud-hosting/azure/azure-cli)
- [Install Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=linux%2Ccsharp%2Cbash#v2)

# Azure Function App project with TypeScript template

## Create a new Azure Function App project with TypeScript template
- Use `func --version` to check the version of Azure Functions Core Tools on your computer.
- Create a new TypeScript project with `func` command.
  ```sh
  $ func init codesanook-azure-function-app --typescript
  ```
- You can change a project name to what is appropriate for you.
- CD to the project folder.
  ```sh
  $ cd codesanook-azure-function-app
  ```
- Add a new HTTP function to the project.
  ```sh
  $ func new --name http-example --template "HTTP trigger" --authlevel "anonymous"
  ```
- You can change a function name to what is appropriate for you.

## Run the project locally
- We can test `http-example` function locally by CD back to the root of the project and run some Node package manage commands.
- In this example, we are going to use `Yarn` but you can use `NPM` as well.
- To use Yarn, we need to update scrips section in `package.json` as the following code.
  ```json
  "scripts" : {
    "build": "tsc",
    "build:production": "yarn run prestart",
    "watch": "tsc --w",
    "prestart": "yarn run build && func extensions install",
    "start:host": "func start",
    "start": "npm-run-all --parallel start:host watch"
  }
  ```
- Run the following commands to launch the project:
  ```sh
  $ yarn install
  $ yarn start
  ```
- You should now see some output messages in a terminal showing the application is running at a URL and a port number.
- Copy the URL of http-example function, e.g. http://localhost:7071/api/http-example to a browser address and append query string `?name=<YOUR_NAME>`.
- Press enter to navigate to that URL and execute the function.
- You should see a message as `Hello <YOUR_NAME>` in a browser.

# Azure Function App with C# template

## Create a C# Azure Function App with timer trigger
- Create a new C# Azure Function App project with `func` command.
  ```sh
  $ func init TimerFunctionApp --dotnet
  ```
- You can change a project name to what is appropriate for you.
- CD to the project folder.
  ```sh
  $ cd TimerFunctionApp
  ```
- Add a new Timer Trigger function to the project.
  ```sh
  $ func new --name TimerExample --template "Timer trigger"
  ```
- To list all available templates for C#, use `func templates list -l c#`.
- You can change a function name to what is appropriate for you.
- Open `TimerExample.cs` file and edit Cron expression to run the function every 5 seconds.
  ```c#
  using System;
  using Microsoft.Azure.WebJobs;
  using Microsoft.Extensions.Logging;

  namespace TimerFunctionApp
  {
      public class TimerExample
      {
          [FunctionName("TimerExample")]
          public void Run([TimerTrigger("*/5 * * * * *")]TimerInfo myTimer, ILogger log)
          {
              log.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");
          }
      }
  }
  ```

## Start Azurite emulator
- Timer Trigger function requires Blob emulator.
- Start Azurite which is an open-source emulator for testing your Azure Blob, Queue Storage, and Table Storage with the following command:
  ```sh
  $ docker run \
    -p 10000:10000 \
    -p 10001:10001 \
    -p 10002:10002 \
    -v azurite-data \
    mcr.microsoft.com/azure-storage/azurite
  ```

## Run the function
- Run your function from the root of the project with the following command:
  ```sh
  $ func start
  ```
- You should now see some output messages as `C# Timer trigger function executed at: ...` in your terminal every 5 seconds

# Credit & Reference
- [Quickstart: Create a TypeScript function in Azure from the command line](https://docs.microsoft.com/en-us/azure/azure-functions/create-first-function-cli-typescript)
- [Quickstart: Create a C# function in Azure from the command line](https://learn.microsoft.com/en-us/azure/azure-functions/create-first-function-cli-csharp?tabs=azure-cli%2Cin-process)
- [Timer trigger for Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-timer?tabs=in-process&pivots=programming-language-csharp)
- [https://learn.microsoft.com/en-us/azure/azure-functions/functions-create-scheduled-function](https://learn.microsoft.com/en-us/azure/azure-functions/functions-create-scheduled-function)
- [Use the Azurite emulator for local Azure Storage development](https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azurite?tabs=docker-hub)
