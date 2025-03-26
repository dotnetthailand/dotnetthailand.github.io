---
title: Application Insights
showMetadata: true
editable: true
showToc: true
tocDepth: 3
order: 1
---

# Create Application Insights

## Setup Azure CLI

- Follow [Azure CLI document](/cloud-hosting/azure/azure-cli) to setup the tool.
- To access the preview Application Insights Azure CLI commands, run:
  ```sh
  $ az extension add -n application-insights
  ```

## Create Application Insights with Azure CLI
- Use the following command to create Azure Application Insights
  ```sh
  $ az monitor app-insights component create \
    --resource-group <RESOURCE_GROUP> \
    --location <LOCATION> \
    --app <APP_INSIGHTS_NAME> \
    --retention-time <RETENTION_DAYS>
  ```
- For `RETENTION_DAYS`, the value can be one of the these values: 30,60,90,120,180,270,365,550,730
  and it can be set only when Application Insights is not connected to a Log Analytics workspace.
- Example code:
  ```sh
  $ az monitor app-insights component create \
    --resource-group codesanook-example-resource-group \
    --location southeastasia \
    --app codesanook-example-app-insights \
    --retention-time 30
  ```

## List all Application Insight in a resource group
- Example code:
  ```sh
  $ az monitor app-insights component show \
    --resource-group codesanook-example-resource-group
  ```

## Delete Application Insights with Azure CLI
- Command:
  ```sh
  $ az monitor app-insights component delete \
    --app <APP_INSIGHTS_NAME> \
    --resource-group <RESOURCE_GROUP>
  ```
- Example code:
  ```sh
  $ az monitor app-insights component delete \
    --app codesanook-example-app-insights \
    --resource-group codesanook-example-resource-group
  ```

# Useful resources
- [az monitor app-insights component CLI](https://learn.microsoft.com/en-us/cli/azure/monitor/app-insights/component?view=azure-cli-latest)
