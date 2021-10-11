---
title: Manage Azure SQL Database with Azure CLI
showMetadata: true
editable: true
showToc: true
---

# Requirements
- Create an Azure Account.
- Set up Azure CLI.
- Log in with Azure CLI.
- Create a resource group.
- If you haven't done these requirements, please refer to [Azure CLI content](/cloud-hosting/azure/azure-cli) for more information.

# Create Azure SQL Database for Azure services
- To use Azure SQL Database, we need to create a database server.
- Add a firewall rule to allow Azure Service to connect to a database server.
- Create a database.

## Create Azure SQL Server
- Command:
  ```sh
  az sql server create \
    --name <DATABASE_SERVER_NAME> \
    --resource-group <RESOURCE_GROUP_NAME> \
    --location <LOCATION> \
    --admin-user <ADMIN_USERNAME> \
    --admin-password <ADMIN_PASSWORD>
  ```
- If your ADMIN_PASSWORD has special characters you need to wrap it with single quotes.
- To list all available locations, run `az account list-locations --output table`.
- To list all exiting servers, use `az sql server list --output table`.
- Connect a server with `<DATABASE_SERVER_NAME>.database.windows.net` host name.
- [More details for Azure SQL Server](https://docs.microsoft.com/en-us/cli/azure/sql/server?view=azure-cli-latest)

### Example code to create Azure SQL Server instance:
- Code:
  ```sh
  az sql server create \
    --name codesanook-example-db-server \
    --resource-group codesanook-example-resource-group \
    --location southeastasia \
    --admin-user codesanook-example-sa \
    --admin-password 'very-secured-password'
  ```
- **Note** Do not forget to always generate a new strong password for admin password.

## Allow Azure services and other Azure resources to connect to Azure SQL Server
- Command:
  ```sh
  az sql server firewall-rule create \
    --resource-group <RESOURCE_GROUP_NAME> \
    --server <DATABASE_SERVER_NAME> \
    --name AllowAllWindowsAzureIps \
    --start-ip-address 0.0.0.0 \
    --end-ip-address 0.0.0.0
  ```
  - Example code to create a firewall rule that allows all Azure services:
  ```sh
    az sql server firewall-rule create \
      --server codesanok-example-db-server \
      --resource-group codesanook-example-resource-group \
      --name AllowAllWindowsAzureIps \
      --start-ip-address 0.0.0.0 \
      --end-ip-address 0.0.0.0
  ```

## Create Azure SQL Database
- Command:
  ```sh
  az sql db create \
    --name <DATABASE_NAME> \
    --server <DATABASE_SERVER_NAME> \
    --resource-group <RESOURCE_GROUP_NAME> \
    --catalog-collation <COLLATION_OF_A_METADATA_CATALOG> \
    --collation <COLLATION_OF_A_DATABASE> \
    --edition <EDITION_OF_SKU> \
    --capacity <CAPACITY_OF_SKU> \
    --max-size <MAX_DATABASE_SIZE> \
    --backup-storage-redundancy <BACKUP_REDUNDANCY_VALUE>
  ```
- To list all available database edition for a region, use `az sql db list-editions --location <location-name> --output table`.
- For Southeast Asia location use `southeastasia`. To list all locations, use `az account list-locations --output table`.
- Valid values of **--backup-storage-redundancy** are `Local, Zone and Geo`.
- [More details for Azure SQL database](https://docs.microsoft.com/en-us/cli/azure/sql/db?view=azure-cli-latest).

### Example code to create a free Azure SQL Database
- Code:
  ```sh
  az sql db create \
    --name codesanook-example-db \
    --server codesanook-example-db-server \
    --resource-group codesanook-example-resource-group \
    --catalog-collation SQL_Latin1_General_CP1_CI_AS \
    --collation Latin1_General_CI_AS \
    --edition Free \
    --capacity 5 \
    --max-size 32MB \
    --backup-storage-redundancy Zone
  ```
- This will create a free Azure SQL database which has 32MB of database size and 5DTU.
- To get more details of Free edition, run `az sql db list-editions --location southeastasia --edition Free`
- Please note that subscription can have only one free database per region.
  - To provision another free database in same subscription, choose a different region.
  - To provision another free database in same region, use different subscription.

### Example code to create the cheapest Azure SQL Database
- Code:
  ```sh
  az sql db create \
    --name codesanook-example-db \
    --server codesanook-example-db-server \
    --resource-group codesanook-example-resource-group \
    --catalog-collation SQL_Latin1_General_CP1_CI_AS \
    --collation Thai_CI_AS \
    --edition Basic \
    --capacity 5 \
    --max-size 2GB \
    --backup-storage-redundancy Zone
  ```
- This will create the cheapest Azure SQL database which costs **$4.90** a month and has 2GB of database size.
- Use Thai case insensitive and accent sensitive database collation.

# Other useful commands

## List all existing databases on a specific server
- Command:
  ```sh
  az sql db list \
    --server <DATABASE_SERVER_NAME> \
    --resource-group <RESOURCE_GROUP_NAME> \
    --output table
  ```
- Example code to list all existing databases on a specific server.
  ```sh
  az sql db list \
    --server codesanook-example-db-server \
    --resource-group codesanook-example-resource-group \
    --output table
  ```

## Delete a server
- Command:
  ```sh
  az sql server delete \
    --name <DATABASE_SERVER_NAME> \
    --resource-group <RESOURCE_GROUP_NAME> \
    --yes
  ```
- Example code to delete a database server:
  ```sh
  az sql server delete \
    --name codesanok-example-db-server \
    --resource-group codesanook-example-resource-group \
    --yes
  ```

## Delete a database
- Command:
  ```sh
  az sql db delete \
    --name <DATABASE_NAME> \
    --server <DATABASE_SERVER_NAME>
    --resource-group <RESOURCE_GROUP_NAME> \
    --yes
  ```
- Example code to delete a database:
  ```sh
  az sql db delete \
    --name codesanok-example-db \
    --server codesanok-example-db-server \
    --resource-group codesanook-example-resource-group \
    --yes
  ```

# Update an admin password
- Command:
  ```sh
  az sql server update \
    --name <DATABASE_SERVER_NAME> \
    --admin-password <ADMIN_PASSWORD> \
    --resource-group <RESOURCE_GROUP_NAME>
  ```
- Example code to update an admin password:
  ```sh
  az sql server update \
    --name codesanook-example-db-server \
    --admin-password 'very-secured-password' \
    --resource-group codesanook-example-resource-group
  ```

