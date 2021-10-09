---
title: GitHub CLI secret
showMetadata: true
editable: true
showToc: true
order: 1
---

# Requirements
- Set up GitHub CLI
- Log in to GitHub with GitHub CLI
- If you haven't done all requirements, please refer to [Set up GitHub CLI document](/programming-cookbook/github-cli/setup-github-cli.md/cloud-hosting/azure/azure-cli).

# Create or update a GitHub secret with CLI
- To create or update a GitHub secret run:
  ```sh
  gh secret set <SECRET_NAME> \
    --body <SECRET_VALUE> \
    --repo <[HOST/]OWNER/REPO>
  ```
- Example code to create or update a GitHub secret:
  ```sh
  gh secret set AZURE_WEBAPP_NAME \
    --body codesanook-example-app-service \
    --repo codesanook/codesanok-example-app-service
  ```
- Assume that we have a repository name "codesanok-example-app-service" under "codesanook" organization.
- Example code to create or update a GitHub secret from content of a file:
  ```sh
  gh secret set AZURE_WEBAPP_NAME \
    < secret-value.json \
    --repo codesanook/codesanok-example-app-service
  ```
- To show help of the command, run:
  ```sh
  gh help secret set
  ```

# List all existing GitHub secrets
- Command:
  ```sh
  gh secret list --repo <[HOST/]OWNER/REPO>
  ```
- Example code to list all existing GitHub secret a specific repository:
  ```sh
  gh secret list --repo codesanook/codesanok-example-app-service
  ```

# Remove an existing GitHub secret
- Command:
  ```sh
  gh secret remove <SECRET_NAME> --repo <[HOST/]OWNER/REPO>
  ```
- Example code to list all existing GitHub secret a specific repository:
  ```sh
  gh secret remove AZURE_WEBAPP_NAME --repo codesanook/codesanok-example-app-service
  ```
