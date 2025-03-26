---
title: Azure Container Registry
showMetadata: true
editable: true
showToc: true
tocDepth: 3
order: 1
---

# Prerequisite
- Create an Azure Account.
- Setup Azure CLI.
- Log in with Azure CLI.
- Create a resource group.
- To learn how to create all requirement step by step, please check [Azure CLI content](/cloud-hosting/azure/azure-cli).

# Create a new Container Registry

az acr create --name
  --resource-group
  --sku {Basic, Premium, Standard}
  [--admin-enabled {false, true}]
  [--allow-exports {false, true}]
  [--allow-metadata-search {false, true}]
  [--allow-trusted-services {false, true}]
  [--default-action {Allow, Deny}]
  [--identity]
  [--key-encryption-key]
  [--location]
  [--public-network-enabled {false, true}]
  [--tags]
  [--workspace]
  [--zone-redundancy {Disabled, Enabled}]

