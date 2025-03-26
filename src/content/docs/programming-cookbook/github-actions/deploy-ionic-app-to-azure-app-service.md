---
title: Deploy Ionic app to Azure App Service
showMetadata: true
editable: true
showToc: true
order: 1
---
# Minimum requirement
- You already have source code on GitHub.
- You have Azure account.

# Deploy Ionic 1 to Azure App Service
- Create Azure App Service with
  - Publish: Code
  - Runtime stack: Node 10 LTS
  - Operation System: Windows
- In App Service Configuration, set WEBSITE_WEBDEPLOY_USE_SCM = true
- Download publish profile from App Service Overview page
- Create a new publish secret in GitHub repository
  - Go to your GitHub repository > Settings page > Secrets > Click New repository secret
  - Name to AZURE_WEBAPP_PUBLISH_PROFILE
  - Value as a content of download publish profile
  - Click Add secret
- At root of the project, create `.github\workflows\deploy-ionic-app-to-azure-app-service.yml`
- Then add the following content:

```yaml
name: Deploy Ionic 1 app to Azure App Service

# This workflow is triggered when pushing to a main branch
on:
  push:
    branches:
      - main
env:
  AZURE_WEBAPP_NAME: my-ionic-app # Set this to your app service name
  PACKAGE_PATH: './www' # Set this to the path to your web app project, defaults to the repository root
  NODE_VERSION: 10.x # Set this to the node version to use

jobs:
  build-and-deploy:
    runs-on: windows-2019

    # You can use default run to set default shell to all steps
    defaults:
      run:
        shell: powershell
        # Using a specific shell https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#using-a-specific-shell

    steps:
      - name: Checkout the latest source code
        uses: actions/checkout@v2 # For more version https://github.com/actions/checkout/releases

      - name: Use Node.js version ${{ env.NODE_VERSION }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ env.NODE_VERSION }}

      # Gulp CLI already installed
      # https://github.com/actions/virtual-environments/blob/main/images/win/scripts/Installers/Install-NodeLts.ps1
      - name: Install Bower as global tools
        run: |
          npm install -g bower

      - name: Build all Node.js projects with npm
        run: |
          bower install
          npm install
          npm run build

      - name: Deploy Azure App Service code Node.js and use IIS 10.0, Windows Server 2016
        uses: azure/webapps-deploy@v2
        with:
          app-name: ${{ env.AZURE_WEBAPP_NAME }}
          # Before downloading load publish profile, make sure that you have set WEBSITE_WEBDEPLOY_USE_SCM
          # in App Service Configuration to true
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
          package: ${{ env.PACKAGE_PATH }}
```
- When you commit and push code to main branch, it will automatically deploy to Azure App Service
- You can check deployment status in `Actions` menu on the main page of your repository
# Known issues

- Gulp 3.9 does not work with Node 12 https://stackoverflow.com/a/55926692/1872200
