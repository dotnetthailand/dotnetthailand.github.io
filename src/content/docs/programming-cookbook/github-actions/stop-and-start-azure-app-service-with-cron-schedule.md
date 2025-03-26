---
title: Stop and start Azure App Service with cron schedule
showMetadata: true
editable: true
showToc: true
order: 1
---

# Prerequisite
- Create an Azure account.
- Setup Azure CLI.
- Log in with Azure CLI.
- Create a resource group.
- To learn how to create all requirement step by step, please check [Azure CLI content](/cloud-hosting/azure/azure-cli).

# Overview
- We can set a cron schedule to trigger a GitHub Actions workflow to stop and start Azure App Service.
- Simply set Azure CLI commands to stop and start Azure App Service in separated workflows.
- For example, we can have `Stop Azure App Service` workflow which runs every midnight (UTC+7)
  and `Start Azure App Service` workflow which runs at 6AM everyday (UTC+7).
- Follow [this instruction](/cloud-hosting/azure/azure-cli#getazurecredentialsforazure/loginaction) to get Azure Credentials.


# Example workflow to stop Azure App Service

```yaml
# .github/workflows/stop-azure-app-service.yml
name: Stop Azure App Service
on:
  schedule:
    - cron: "0 17 * * *" # every midnight of UTC+7

jobs:
  stop_azure_app_service:
    name: Stop Azure App Service
    # Find more virtual environment at https://github.com/actions/virtual-environments#available-environments.
    runs-on: ubuntu-latest

    steps:
      - name: Azure Login
        # https://github.com/Azure/login/tags
        uses: azure/login@v1
        with:
          # We don't need to set a default subscription because we get credentials from a specific subscription.
          creds: ${{ secrets.AZURE_CREDENTIALS }} #

      - name: Stop Azure App Service with Azure CLI
        run: az webapp stop --name ${{ secrets.AZURE_APP_SERVICE_NAME }} --resource-group ${{ secrets.AZURE_RESOURCE_GROUP_NAME }}
```

# Example workflow to start Azure App Service

```yaml
# .github/workflows/start-azure-app-service.yml
name: Start Azure App Service
on:
  schedule:
    - cron: "0 23 * * *" # every 6AM of UTC+7

jobs:
  start_azure_app_service:
    name: Start Azure App Service
    # Find more virtual environment at https://github.com/actions/virtual-environments#available-environments.
    runs-on: ubuntu-latest

    steps:
      - name: Azure Login
        # https://github.com/Azure/login/tags
        uses: azure/login@v1
        with:
          # We don't need to set a default subscription because we get credentials from a specific subscription.
          creds: ${{ secrets.AZURE_CREDENTIALS }} #

      - name: Start Azure App Service with Azure CLI
        run: az webapp start --name ${{ secrets.AZURE_APP_SERVICE_NAME }} --resource-group ${{ secrets.AZURE_RESOURCE_GROUP_NAME }}
```


# Useful resources
- [Not checkout to a default branch](https://stackoverflow.com/a/58800550/1872200)
