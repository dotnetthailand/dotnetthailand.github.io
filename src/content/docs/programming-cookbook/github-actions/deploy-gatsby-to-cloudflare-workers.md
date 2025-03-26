---
title: Deploy Gatsby to Cloudflare Workers
showMetadata: true
editable: true
showToc: true
order: 1
---

# Simple GitHub Actions workflow to Cloudflare Workers

This workflow is very useful for private GitHub repository because GitHub pages does support for free private repo.

```
name: Publish Gatsby to Cloudflare Workers static page

on:
  push:
    branches:
      - main
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master

      # TODO build with a specific Node.js and Yarn version
      - name: Build Gatsby site to a public folder
        run: |
          yarn install
          yarn run build
      # https://github.com/cloudflare/wrangler-action
      - name: Publish to Couldflare static site
        uses: cloudflare/wrangler-action@1.2.0
        with:
          # GET API token from https://dash.cloudflare.com/profile/api-tokens
          apiToken: ${{ secrets.CF_API_TOKEN }}

```

# Useful information
- [Getting started with Cloudflare worker](https://developers.cloudflare.com/workers/learning/getting-started)


