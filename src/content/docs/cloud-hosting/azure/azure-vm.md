---
title: Azure VM
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
- To learn how to create all requirements step by step, please check [Azure CLI content](/cloud-hosting/azure/azure-cli).

# Create Azure VM
  ```sh
  $ az vm create \
    --resource-group <RESOURCE_GROUP_NAME> \
    --name <VM_NAME> \
    --public-ip-address-dns-name <DNS_NAME> \
    --image <VM_IMAGE_NAME> \
    --size <VM_SIZE> \
    --admin-username <USER_ACCOUNT_NAME> \
    --admin-password
    --location <LOCATION>
    --generate-ssh-keys
  ```
- Change `USER_ACCOUNT_NAME` to your resource group.
- Change `VM_NAME` to your VM name.
- Change `DNS_NAME` to your unique DNS name.
- Change `VM_IMAGE_NAME` to a VM image name. To list all available VM images in the Azure Marketplace, use `az vm image list --location <LOCATION> --output table`
- Change `USER_ACCOUNT_NAME` to a name of your VM account.
- Change `location` to where you want to create VM. To list all locations, use `az account list-locations --output table`
- To list all VM sizes, use `az vm list-sizes --location <LOCATION> --output table`
- The `--generate-ssh-keys` parameter is used to automatically generate an SSH key, and put it in the default key location `(~/.ssh)`. To use a specific set of keys instead, use the `--ssh-key-values` option.

# Example code to create Azure VM with Ubuntu LTS OS
  ```sh
  $ az vm create \
    --resource-group codesanook-example-resource-group \
    --name codesanook-example-vm \
    --public-ip-address-dns-name codesanook-example-vm \
    --image UbuntuLTS \
    --admin-username codesanook-example-vm-admin \
    --location japaneast \
    --size Standard_B1ls \
    --public-ip-sku Standard \
    --generate-ssh-keys
  ```

# Example code to create Azure VM with Windows 10 OS
  ```
  $ az vm create \
    --resource-group codesanook-example-resource-group \
    --name cs-example-vm \
    --public-ip-address-dns-name cs-example-vm \
    --image MicrosoftWindowsDesktop:windows10preview:win10-22h2-pro:19045.2130.221006 \
    --admin-username codesanook-example-vm-admin \
    --admin-password 'very-strong-password' \
    --location japaneast \
    --size Standard_B2s \
    --public-ip-sku Standard
  ```
# Useful resources
