---
title: Deploy nopCommerce on Azure App Service
showMetadata: true
editable: true
showToc: true
---
# Architecture
![](images/azure-app-service/nopcommerce-on-app-services-simple-diagram.png)
## Login to Azure account
https://portal.azure.com
## Create Azure resource group
![](images/azure-app-service/nopcommerce-app-service-resource-group-1.png)

![](images/azure-app-service/nopcommerce-app-service-resource-group-2.png)

![](images/azure-app-service/nopcommerce-app-service-resource-group-3.png)
## Create Azure blob storage
![](images/azure-app-service/nopcommerce-app-service-create-storage-account-1.png)

![](images/azure-app-service/nopcommerce-app-service-create-storage-account-2.png)
## Create Azure SQL server
![](images/azure-app-service/nopcommerce-app-service-sql-server-1.png)

![](images/azure-app-service/nopcommerce-app-service-sql-server-2.png)

![](images/azure-app-service/nopcommerce-app-service-sql-server-3.png)

![](images/azure-app-service/nopcommerce-app-service-sql-server-4.png)
## Create Azure SQL database
![](images/azure-app-service/nopcommerce-app-service-sql-db-1.png)

![](images/azure-app-service/nopcommerce-app-service-sql-db-2.png)
## Create Azure app service plan
![](images/azure-app-service/nopcommerce-app-service-asp-1.png)

![](images/azure-app-service/nopcommerce-app-service-asp-2.png)
## Create Azure app service
![](images/azure-app-service/nopcommerce-app-service-1.png)

![](images/azure-app-service/nopcommerce-app-service-2.png)

![](images/azure-app-service/nopcommerce-app-service-3.png)

## Setup NopCommerce
Download from: https://www.nopcommerce.com/en/download-nopcommerce
![](images/azure-app-service/nopcommerce-app-service-installation-1.png)

![](images/azure-app-service/nopcommerce-app-service-installation-2.png)

![](images/azure-app-service/nopcommerce-app-service-installation-3.png)

Upload all files to above FTP credential.

## Setup Azure blob storage on NopCommerce AppSettings page
![](images/azure-app-service/nopcommerce-admin-appsetting-page.png)
## References
- https://docs.microsoft.com/en-us/azure/architecture/example-scenario/private-web-app/private-web-app