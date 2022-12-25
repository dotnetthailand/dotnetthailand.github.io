---
title: Create Azure Storage Account
showMetadata: true
editable: true
showToc: true
tocDepth: 3
order: 0
---

# Prerequisite
- Create an Azure account.
- Setup Azure CLI.
- Log in with Azure CLI.
- Create a resource group.
- To learn how to create all requirements step by step, please check [Azure CLI content](/cloud-hosting/azure/azure-cli).

# Create Azure Storage Account
```sh
az storage account create \
  --name <STORAGE_ACCOUNT_NAME> \
  --resource-group <RESOURCE_GROUP_NAME> \
  --location <LOCATION_NAME> \
  --sku <STORAGE_ACCOUNT_SKU> \
  --kind <STORAGE_ACCOUNT_KIND> \
  --access-tier <ACCESS_TIER>

```
- For `STORAGE_ACCOUNT_NAME`, it can contain only lowercase letters and numbers and must be between 3 and 24 characters.
- For `LOCATION_NAME`, use `az account list-locations --output table`.  It is default to a location of a resource group if not specify.
- For `STORAGE_ACCOUNT_SKU`, accepted values are: Premium_LRS, Premium_ZRS, Standard_GRS, Standard_GZRS, Standard_LRS, Standard_RAGRS, Standard_RAGZRS and Standard_ZRS.
  - LRS stands for locally redundant storage.
  - ZRS stands for zone redundant storage.
- For `STORAGE_ACCOUNT_KIND`, accepted values are: BlobStorage, BlockBlobStorage, FileStorage, Storage, StorageV2.
- For `ACCESS_TIER`, accepted values for access tier: Cool, Hot.
- To learn more how to create storage account with CLI, please refer to [Create a storage account document](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-cli)

# Example code to create a standard general-purpose v2 storage account
  ```sh
  $ az storage account create \
    --name csexamplestorageaccount \
    --resource-group codesanook-example-resource-group \
    --location southeastasia \
    --sku Standard_ZRS \
    --kind StorageV2 \
    --access-tier Hot
  ```

# List all existing storage accounts
  ```sh
  $ az storage account list \
    --resource-group <RESOURCE_GROUP_NAME> \
    --output table
  ```

# Delete a storage account
  ```sh
  $ az storage account delete \
    --name <STORAGE_ACCOUNT_NAME> \
    --resource-group <RESOURCE_GROUP_NAME>
  ```

# Get connection string
  ```sh
  $ az storage account show-connection-string \
    --name <STORAGE_ACCOUNT_NAME> \
    --resource-group <RESOURCE_GROUP_NAME>
  ```

# Useful resources
- [Storage account overview](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-overview)
- [Azure Storage redundancy](https://docs.microsoft.com/en-us/azure/storage/common/storage-redundancy)
- [Cross-region replication in Azure: Business continuity and disaster recovery](https://docs.microsoft.com/en-us/azure/availability-zones/cross-region-replication-azure)
- [Hot, Cool, and Archive access tiers for blob data](https://docs.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview)
