---
title: Run database migration
showMetadata: true
editable: true
showToc: true
order: 1
---

# Simple GitHub Actions workflow to run database migration with dbup-cli
- We suggest you to read [How to setup and use dbup-cli](/storage/migration-tools/dbup-cli) before using this workflow.

```yaml
name: Run database migration

on:
  push:
    branches:
      - main
env:
  DOTNET_VERSION: 5.0.x # Set the.NET version to use

jobs:
  run-db-migration:
    runs-on: ubuntu-latest
    steps:
      - name: Check out the later source code from "${{ github.ref	}}" branch
        uses: actions/checkout@v2

      - name: Setup .NET SDK version ${{ env.DOTNET_VERSION }}
        uses: actions/setup-dotnet@v1
        with:
          dotnet-version: ${{ env.DOTNET_VERSION }}

      - name: Install dbup-cli as a .NET global tool
        run: dotnet tool install --global dbup-cli

      - name: Apply a new schema version
        working-directory: migration # All configuration file and schema version files are in this 'migration' folder.
        env:
          MYSQL_HOSTNAME: ${{ secrets.MYSQL_HOSTNAME }}
          MYSQL_DATABASE: ${{ secrets.MYSQL_DATABASE }}
          MYSQL_USERNAME: ${{ secrets.MYSQL_USERNAME }}
          MYSQL_PASSWORD: ${{ secrets.MYSQL_PASSWORD }}
        run: dbup upgrade

```
