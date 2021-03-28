---
title: Useful Actions
showMetadata: true
editable: true
showToc: true
order: 4
---

# actions/upload-artifact
- https://github.com/actions/upload-artifact
- Use to upload artifacts built from your workflow, this allows you to share data between jobs and store data once a workflow is complete.
- Artifacts are retained for 90 days by default. https://docs.github.com/en/actions/reference/usage-limits-billing-and-administration#artifact-and-log-retention-policy
- We can't specify an artifact as the package path for the Azure deployment action (azure/webapps-deploy).
