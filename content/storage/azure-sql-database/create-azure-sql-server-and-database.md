---
title: Create Azure SQL server and database
showMetadata: true
editable: true
showToc: true
---

## Prerequisite
- Create an Azure Account.
- Setup Azure CLI.
- Log in with Azure CLI.
- Create a resource group.
- To learn these steps, please check [Azure CLI content](/cloud-hosting/azure/azure-cli).


## Create Azure SQL server
```sh
$ az sql server create \
  --admin-user <admin-user> \
  --admin-password <admin-password> \
  --name <server-name> \
  --resource-group <resource-group>
```
- To list all exiting servers, use `az sql server list --output table`.
- [More details for Azure SQL Server](https://docs.microsoft.com/en-us/cli/azure/sql/server?view=azure-cli-latest)

## Allow Azure services and resources to connect to SQL server
```sh
$ az sql server firewall-rule create \
  --resource-group <resource-group> \
  --server <server-name> \
  --name AllowAllWindowsAzureIps \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0
```

## Create the cheapest Azure SQL database
```sh
$ az sql db create \
  --name <database-name> \
  --resource-group <resource-group> \
  --server <server-name> \
  --catalog-collation SQL_Latin1_General_CP1_CI_AS \
  --collation Thai_CI_AS \
  --capacity 5 \
  --max-size 2GB \
  --edition Basic \
  --backup-storage-redundancy Zone
```
- This will create the cheapest Azure SQL database which costs $4.90 a month and 2GB of database size.
- To list all database edition, use `az sql db list-editions --location <location-name> --output table`.
- For Southeast Asia location use `southeastasia` and to list all locations, use `az account list-locations --output table`
- Valid value of **--backup-storage-redundancy** are `Local, Zone and Geo`.
- [More details for Azure SQL database](https://docs.microsoft.com/en-us/cli/azure/sql/db?view=azure-cli-latest).


# Other useful commands

## List all existing databases on a specific server
```sh
$ az sql db list \
  --server <server-name> \
  --resource-group <resource-group> \
  --output table
```

## Delete a server
```sh
$ az sql server delete \
  --name <server-name> \
  --resource-group <resource-group> \
  --yes
```
