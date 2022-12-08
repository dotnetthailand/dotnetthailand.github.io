---
title: Manage Azure Database for PostgreSQL
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

# Create Azure Database for PostgreSQL - Flexible Server
- To use Azure Database for PostgreSQL, we need to create a database server
- Specify a database name parameter.
- Specify firewall rule to allow Azure Service to connect to a database server.

## Create Azure Database for PostgreSQL- Flexible Server command
- Command:
  ```sh
  $ az postgres flexible-server create \
      --name <SERVER_NAME> \
      --database-name <DATABASE_NAME> \
      --resource-group <RESOURCE_GROUP_NAME> \
      --location <LOCATION> \
      --admin-user <ADMIN_USERNAME> \
      --admin-password <ADMIN_PASSWORD> \
      --public-access <IP_ADDRESS> \
      --backup-retention <BACKUP_RETENTION_DAYS> \
      --high-availability <high-availability_option> \
      --tier <SERVER_TIER> \
      --sku-name <SKU_NAME> \
      --storage-size <STORAGE_IN_GIGABYTES>
  ```
- DATABASE_SERVER_NAME must be unique and we cannot use an existing server name in Azure cloud.
- To list all exiting servers, use `az postgres flexible-server list`.
- We cannot use - (dash) for  ADMIN_USERNAME.
- If your ADMIN_PASSWORD has special characters you need to wrap it with single quotes.
- To list all available locations, run `az account list-locations --output table`.
- For IP_Address, set to 0.0.0.0 to allow public access from any resources deployed within Azure to access your server.
- To list all available SKU, use `az postgres flexible-server list-skus --location location-name --output table`.
- Connect a server with `<DATABASE_SERVER_NAME>.postgres.database.azure.com` host name.
- [More details for Azure Database for PostgreSQL CLI](https://learn.microsoft.com/en-us/cli/azure/postgres/flexible-server?view=azure-cli-latest#az-postgres-flexible-server-create)

## Example code to create Azure Database for PostgreSQL - Flexible Server
- Code:
  ```sh
  $ az postgres flexible-server create \
      --name codesanook-example-db-server \
      --database-name codesanook-example-db \
      --resource-group codesanook-example-resource-group \
      --location eastus \
      --admin-user codesanook_example_sa \
      --admin-password 'very-secured-password' \
      --public-access 0.0.0.0 \
      --backup-retention 14 \
      --high-availability Disabled \
      --tier Burstable \
      --sku-name Standard_B1ms \
      --storage-size 32
  ```
 - **Note** Do not forget to always generate a new strong password for admin password.
 - High availability is not supported for `Burstable` tier.
 - Some SKUs may not be supported by all locations.



# Connect to a database server
- Use these values to connect to a database server (Postgres):
  - Host: `codesanook-example-db-server.postgres.database.azure.com`
  - Port: `5432`
  - Database: `codesanook-example-db`
  - Username: `codesanook_example_sa`
  - Password: `your-very-secured-password`
- To connect with PostgreSQL CLI, use the following command:
  ```sh
  $ psql -h codesanook-example-db-server.postgres.database.azure.com -U codesanook_example_sa codesanook-example-db
  ```
- Then it will prompt you to enter a password.
- After connected to a database, you can list schema in a database with the following command.
  ```sql
  select schema_name from information_schema.schemata;
  ```

# Example code to delete a database server
- Code:
```sh
$ az postgres flexible-server delete \
    --resource-group codesanook-example-resource-group \
    --name codesanook-example-db-server \
    --yes
```

# Useful resources
- [Quickstart: Connect and query with Azure CLI with Azure Database for PostgreSQL - Flexible Server](https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/connect-azure-cli)
- [High availability concepts in Azure Database for PostgreSQL - Flexible Server](https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-high-availability)
- [Install PostgreSQL CLI](https://www.postgresql.org/download/linux/ubuntu/)
