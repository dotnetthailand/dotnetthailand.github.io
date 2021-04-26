---
title: Deploy .NET app to Azure App Service
showMetadata: true
editable: true
showToc: true
order: 1
---

# Deploy .NET app to Azure App Service code
- When pushing code to a main branch triggers a workflow.
- If project has Yarn Workspaces, build all Node.js packages.
- Use dotnet publish to build a project and publish to Azure App Service.
- Code from https://github.com/codesanook/codesanook-ef-note/blob/main/.github/workflows/deploy-to-app-service-code.yml
```yaml
#
name: Deploy ASP.NET Core MVC app to Azure App Service Code

on:
  push:
    branches:
      - main

env:
  WEB_PROJECT_DIR: ${{ github.workspace }}/app # Set to the root path of your web project, defaults to the repository root
  OUTPUT_DIR: publish # Relative to a current working directory
  DOTNET_VERSION: 5.0.x # Set .NET version to use
  NODE_VERSION: 10.x # Set Node.js version to use

jobs:
  build:
    # Find more virtual environments
    # https://www.dotnetthailand.com/programming-cookbook/github-actions/github-actions-fundamentals#findmorevirtualenvironments
    runs-on: ubuntu-latest

    # You can use default run to set default working directory
    # https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_iddefaultsrun
    defaults:
      run:
        working-directory: ${{ env.WEB_PROJECT_DIR }}

    steps:
      - name: Checkout the latest source code from ${{ github.ref }} commit
        uses: actions/checkout@v2

      - name: Set YARN_WORKSPACES_EXIST variable
        run: |
          workspaces_info_result=$(yarn workspaces info > /dev/null 2>&1; echo $?; exit 0)
          if [ $workspaces_info_result -eq 0 ]; then echo "YARN_WORKSPACES_EXIST=1" >> $GITHUB_ENV; fi

      # https://github.com/actions/setup-node
      - name: Use Node.js version ${{ env.NODE_VERSION }}
        if: ${{ env.YARN_WORKSPACES_EXIST == 1 }}
        uses: actions/setup-node@v2
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Build all Node.js projects if Yarn Workspaces exists
        if: ${{ env.YARN_WORKSPACES_EXIST == 1 }}
        run: |
          yarn install
          yarn workspaces run build

      # https://github.com/actions/setup-dotnet
      - name: Setup .NET SDK version ${{ env.DOTNET_VERSION }}
        uses: actions/setup-dotnet@v1
        with:
          dotnet-version: ${{ env.DOTNET_VERSION }}

      - name: Restore Nuget packages
        run: |
          pwd
          ls
          dotnet restore

      - name: Publish a .NET project to ${{ env.OUTPUT_DIR }}
        run: dotnet publish --configuration Release --output ${{ env.OUTPUT_DIR }} --no-restore

      # Before downloading a publish profile,
      # please make sure you have set WEBSITE_WEBDEPLOY_USE_SCM in App Service configuration to true.
      - name: Deploy to Azure App Service code publish
        uses: azure/webapps-deploy@v2
        with:
          app-name: ${{ secrets.AZURE_WEBAPP_CODE_PUBLISH_NAME }}
          publish-profile: ${{ secrets.AZURE_WEBAPP_CODE_PUBLISH_PROFILE }}
          package: ${{env.WEB_PROJECT_DIR}}/${{ env.OUTPUT_DIR }}
```

# Deploy .NET app to Azure App Service container
- When pushing code to a main branch triggers a workflow.
- Build a .NET App custom image and push to DockerHub.
- Deploy an image to Azure App Service container.
- Code from https://github.com/codesanook/codesanook-ef-note/blob/main/.github/workflows/deploy-to-app-service-container.yml
```yaml
name: Deploy ASP.NET Core MVC app to Azure App Service Linux Container

on:
  push:
    branches:
      - main
env:
  # your-name/ef-note:0fd5f6b9a71eb9dcf5f30c70f6e1b9b77dfadfb5
  DOCKER_IMAGE_NAME: ${{ secrets.DOCKERHUB_USERNAME }}/${{ secrets.DOCKERHUB_REPOSITORY }}:${{ github.sha }}

jobs:
  build:
    # https://www.dotnetthailand.com/programming-cookbook/github-actions/github-actions-fundamentals#findmorevirtualenvironments
    runs-on: ubuntu-latest

    steps:
      - name: Checkout the latest source code from {{ github.ref }}
        uses: actions/checkout@v2

      # https://github.com/docker/login-action/releases
      - name: Login to Docker Hub
        uses: docker/login-action@v1
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      # https://docs.docker.com/docker-hub/
      - name: Build and push a custom image
        run: |
          docker build --tag ${{ env.DOCKER_IMAGE_NAME }} --target release .
          docker push ${{ env.DOCKER_IMAGE_NAME }}
      # Before downloading a publish profile, make sure that you have set WEBSITE_WEBDEPLOY_USE_SCM
      # in App Service Configuration to true
      # configure port number
      # https://docs.microsoft.com/en-us/azure/app-service/configure-custom-container?pivots=container-linux#configure-port-number
      # WEBSITES_PORT
      # connection string
      - uses: azure/webapps-deploy@v2
        with:
          app-name: ${{ secrets.AZURE_WEBAPP_NAME }}
          publish-profile: ${{ secrets.AZURE_WEBAPP_CONTAINER_PUBLISH_PROFILE }}
          images: ${{ env.DOCKER_IMAGE_NAME }}

```
