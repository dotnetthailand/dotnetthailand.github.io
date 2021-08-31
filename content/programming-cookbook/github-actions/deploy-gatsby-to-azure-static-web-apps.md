---
title: Deploy Gatsby to Azure Static Web Apps
showMetadata: true
editable: true
showToc: true
order: 1
---

# Simple GitHub Actions workflow to build and deploy Gatsby to Azure Static Web Apps

```yml
# .github/workflows/build-and-deploy-to-azure-static-web-apps.yml

name: Build and deploy Gatsby to Azure Static Web apps
on:
  push:
    branches:
      - main

env:
  NODE_VERSION: 12.x # Set Node.js version to use.

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout the latest source code from ${{ github.sha }} commit
        uses: actions/checkout@v2 # https://github.com/actions/checkout

      - name: Use Node.js version ${{ env.NODE_VERSION }}
        uses: actions/setup-node@v2 # https://github.com/actions/setup-node
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Build Gatsby site to a public folder
        # Yarn's already installed on a virtual environment
        # https://github.com/actions/virtual-environments/blob/main/images/linux/Ubuntu2004-README.md#package-management
        run: |
          yarn install
          yarn run build

      - name: Deploy Gatsby to Azure Static Web Apps
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          action: upload
          app_location: '/' # Location of your application code
          output_location: public # Location of the build output directory relative to the app_location.

```

# Useful resources
- [How to create Azure Static Web App](/cloud-hosting/azure/azure-static-web-apps)
- [Learn more about Azure/static-web-apps-deploy actions](https://docs.microsoft.com/en-us/azure/static-web-apps/github-actions-workflow)
