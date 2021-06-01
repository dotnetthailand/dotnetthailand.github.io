-petpaw-e2e--
title: Deploy Oauth2 Proxy to App Service container
showMetadata: true
editable: true
showToc: true
order: 1
---

# Create App Service container
- Create Azure App Service with a container.
- Use DockerHub registry and enter `mcr.microsoft.com/dotnet/samples:aspnetapp` as image.

- Wait until the app has been created
- Open a browser and navigate to https://{your-app-service-name}.azurewebsites.net/.
- You need to wait for a while until the website is ready. Then you will find an example ASP.NET Core MVC app.
- In App Service panel, you can go to `Deployment Center` and click `Logs` to check all logs while launching a container.

# Set some App Service configurations
- Set these configurations to your app service:
  - WEBSITE_WEBDEPLOY_USE_SCM
    - true
  - WEBSITES_PORT
    - 8000
  - OAUTH2_CLIENT_ID
    - You Google Oauth2 client ID
  - OAUTH2_CLIENT_SECRET
    - You Google Oauth2 client ID
  - OAUTH2_REDIRECT_URL
    - You public website redirect URL
    - It is usually in this pattern: https://{your-app-service-name}.azurewebsites.net/oauth2/callback

# Create Azure Container Register (ACR) and get a username and password
- Create a new Azure Container Registry with basic type.
- Wait until your container registry has been created.
- In container registry panel, go to Access keys and enable admin user.
- You will find username and password that we will for GitHub secret values.

# Create GitHub secret
- Download a publish profile from your App Service on overview page and use it a value of AZURE_WEBAPP_CONTAINER_PUBLISH_PROFILE secret.
- Create these GitHub secrets with their values:
  - AZURE_WEBAPP_CONTAINER_PUBLISH_PROFILE
  - AZURE_WEBAPP_NAME
    - It is your app service name only without https:// and azurewebsites.net.
  - LOGIN_SERVER
    - Full name of your Azure Container Register without schema e.g. {your-acr}-azurecr.io
  - REGISTRY_USERNAME
    - Your Azure Container Register username
  - REGISTRY_PASSWORD
    - Your Azure Container Register password

# Create Google credential
- https://oauth2-proxy.github.io/oauth2-proxy/docs/configuration/oauth_provider#google-auth-provider

# Example of Dockerfile
```sh
FROM node:12-alpine
EXPOSE 8000
WORKDIR /app

RUN npm install -g serve

# Oauth2 Proxy executable binary file
COPY oauth2-proxy ./
RUN chmod +x oauth2-proxy

COPY ./entrypoint.sh ./
RUN chmod +x entrypoint.sh

COPY ./oauth_config.cfg ./
COPY ./index.html ./
COPY ./authenticated-emails-list.txt ./

ENTRYPOINT ["./entrypoint.sh"]
```
- index.html can be other HTML source files for a website that you want to protect by Google authentication

# Example of Oauth2 Proxy configuration
```sh
http_address = "0.0.0.0:8000"
upstreams = [
  "http://127.0.0.1:3000/"
]

cookie_name = "_oauth2_proxy"
# Generate with Python command
# python -c 'import os,base64; print(base64.urlsafe_b64encode(os.urandom(16)).decode())'
cookie_secret = "OkbN-4LP4kf8kQoupLmkHA=="

# https://github.com/oauth2-proxy/oauth2-proxy/issues/73#issuecomment-466667048
authenticated_emails_file = "./authenticated-emails-list.txt"

# https://github.com/bitly/oauth2_proxy/issues/492
cookie_secure = false
```

# Example of entrypoint.sh
```sh
#!/bin/sh

# Run two services
./oauth2-proxy --client-id $OAUTH2_CLIENT_ID --client-secret $OAUTH2_CLIENT_SECRET --redirect-url $OAUTH2_REDIRECT_URL --config "./oauth_config.cfg" &
serve --listen 3000 --no-clipboard .

```

# Example of authenticated-emails-list.txt
- authenticated-emails-list.txt
```
user1@gmail.com
user2@gmail.com
user3@gmail.com
```

# Example of GitHubActions
```yml
name: Deploy protected content with Oauth2 Proxy
on:
  push:
    branches:
      - main

env:
  NODE_VERSION: 12.x # Set the Node.js version to use.
  DOCKER_IMAGE: ${{ secrets.LOGIN_SERVER }}/oauth2-proxy:${{ github.sha }}

jobs:
  deploy:
    name: Deploy protected content
    # Find more virtual environment. https://github.com/actions/virtual-environments
    runs-on: ubuntu-18.04
    steps:
      - name: Checkout the latest source code from the current branch
        uses: actions/checkout@v2

      - uses: azure/docker-login@v1
        with:
          login-server: ${{ secrets.LOGIN_SERVER }}
          username: ${{ secrets.REGISTRY_USERNAME }}
          password: ${{ secrets.REGISTRY_PASSWORD }}

      - name: Push a new image to container registry
        run: |
          docker build . --tag ${{ env.DOCKER_IMAGE }}
          docker push ${{ env.DOCKER_IMAGE }}

        # Before downloading a publish profile, make sure that you have set WEBSITE_WEBDEPLOY_USE_SCM
        # in App Service Configuration to true
        # configure port number
        # https://docs.microsoft.com/en-us/azure/app-service/configure-custom-container?pivots=container-linux#configure-port-number
        # WEBSITES_PORT
      - uses: azure/webapps-deploy@v2
        with:
          app-name: ${{ secrets.AZURE_WEBAPP_NAME }}
          publish-profile: ${{ secrets.AZURE_WEBAPP_CONTAINER_PUBLISH_PROFILE }}
          images: ${{ env.DOCKER_IMAGE }}
```

#  Trigger GitHub Actions
- Go to GitHub Action tab and enable it
- Create new commit and push the project to the main branch
- Go to GitHub and check Actions tab and wait until all workflow jobs/steps are successful.

# Update App Service to use an image from Azure Container Registry
- Go to App Service panel in Azure portal.
- Click `Deployment Center` and click `Settings` tab.
- Change Registry source to `Azure Container Registry`.
- Select your image and tag that built from GitHub Actions.
- Open a browser and navigate to your website https://{your-website-name}.azurewebsites.net/
- You should find Oauth2 Proxy protection on your home page.
- Log in with your allowed email in authenticated-emails-list.txt.
- After you have logged in with Google, you will be redirected to a home page and see a protected content.

# Credit
- Sirinat Oam Paphatsirinatthi - KubeOps Skills

