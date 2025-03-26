---
title: Set up GitHub CLI
showMetadata: true
editable: true
showToc: true
order: 0
---

# Install GitHub CLI

## For Debian, Ubuntu Linux, Raspberry Pi OS (apt)
- Run the following commands to install GitHub CLI:
  ```sh
  curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo gpg --dearmor -o /usr/share/keyrings/githubcli-archive-keyring.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
  sudo apt update
  sudo apt install gh
  ```

## For other platforms
- To install GitHub CLI on other platforms, please refer to [GitHub CLI Installation document](https://github.com/cli/cli#installation)

# Login to GitHub
- Run to following command to log in to GitHub:
  ```sh
  gh auth login
  ```

