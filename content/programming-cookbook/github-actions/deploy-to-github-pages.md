---
title: Deploy to GitHub Pages
showMetadata: true
editable: true
showToc: true
order: 2
---

# Simple GitHub Actions workflow
```
# https://github.com/enriikke/gatsby-gh-pages-action/blob/main/README.md
name: Publish Gatsby to GitHub pages

on:
  push:
    branches:
      - main
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master

      - uses: enriikke/gatsby-gh-pages-action@v2
        with:
          # access-token is a GitHub Personal access token with the a 'repo' scope
          access-token: ${{ secrets.PUBLIC_REPO_ACCESS_TOKEN }}
          deploy-branch: gh-pages
```

# Credit
- [Deploy Your Gatsby Site With GitHub Actions by Deborah Digges](https://medium.com/better-programming/deploy-your-gatsby-site-with-github-actions-e761ea93813f)
