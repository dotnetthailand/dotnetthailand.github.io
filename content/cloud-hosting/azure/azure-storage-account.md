---
title: Azure Storage Account
showMetadata: true
editable: true
showToc: true
tocDepth: 3
order: 1
---

# Prerequisite
- Create an Azure account.
- Setup Azure CLI.
- Log in with Azure CLI.
- Create a resource group.
- To learn how to create all requirement step by step, please check [Azure CLI content](/cloud-hosting/azure/azure-cli).


# Create Azure Storage Account
```sh
$ az storage account create \
  --name <STORAGE_ACCOUNT_NAME> \
  --resource-group <RESOURCE_GROUP_NAME> \
  --location <LOCATION_NAME> \
  --sku <STORAGE_ACCOUNT_SKU> \
  --kind <STORAGE_ACCOUNT_KIND> \
  --access-tier <ACCESS_TIER>

```
- For STORAGE_ACCOUNT_NAME, it can contain only lowercase letters and numbers. It must be between 3 and 24 characters.
- For LOCATION_NAME, use `az account list-locations --output table`.
- For STORAGE_ACCOUNT_SKU, accepted values are: Premium_LRS, Premium_ZRS, Standard_GRS, Standard_GZRS, Standard_LRS, Standard_RAGRS, Standard_RAGZRS, Standard_ZRS
- For STORAGE_ACCOUNT_KIND, accepted values are: BlobStorage, BlockBlobStorage, FileStorage, Storage, StorageV2
- accepted values for access tier: Cool, Hot
- To learn more how to create storage account with CLI, please refer to [Create a storage account document](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-cli)

# Example of creating standard general-purpose v2

```sh
$ az storage account create \
  --name csexamplestorageaccount \
  --resource-group codesanook-example-resource-group \
  --location southeastasia \
  --sku Standard_ZRS \
  --kind StorageV2 \
  --access-tier Hot
```

# List all existing storage account
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
