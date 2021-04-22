---
title: Useful Actions
showMetadata: true
editable: true
showToc: true
order: 1
---

# Actions
Actions are standalone commands that are combined into steps to create a job. Actions are the smallest portable building block of a workflow. You can create your own actions, or use actions created by the GitHub community. To use an action in a workflow, you must include it as a step.

# actions/upload-artifact
- Use to upload artifacts built from your workflow, this allows you to share data between jobs and store data once a workflow is complete.
- https://github.com/actions/upload-artifact
- Artifacts are retained for 90 days by default. https://docs.github.com/en/actions/reference/usage-limits-billing-and-administration#artifact-and-log-retention-policy
- We can't specify an artifact as the package path for the Azure deployment action (azure/webapps-deploy).

# SpicyPizza/create-envfile@v1
- Github Action to create a .env file with Github Secrets
- https://github.com/SpicyPizza/create-envfile


# Azure CLI Action
- Automate your workflow by executing Azure CLI commands to manage Azure resources.
- https://github.com/marketplace/actions/azure-cli-action
