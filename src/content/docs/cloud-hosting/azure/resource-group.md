---
title: Azure resource group
showMetadata: true
editable: true
showToc: true
tocDepth: 3
order: 1
---


## Move resource
```sh
az resource invoke-action --action validateMoveResources \
  --ids "/subscriptions/{subscription-id}/resourceGroups/{source-rg}" \
  --request-body ```
