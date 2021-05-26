---
title: Setup Gauge
showMetadata: true
editable: true
showToc: true
order: 1
---

# Requirement
- Node.js version >= 10.16.3 (LTS) You can install it from
  - [How to Install Node.js with Ubuntu apt-get](https://github.com/nodesource/distributions/blob/master/README.md#debinstall)
- Yarn & Gauge
  - You can install theme from a terminal.
  - Install Yarn:
  ```sh
  sudo npm install -g yarn
  ```
  - Install Gauge as a global tool.
  ```sh
  sudo npm install -g @getgauge/cli
  ```
  - It will take a several minute since installing Gauge needs to download Chromium.
  - Gauge works cross platform but for using Linux, you need to use sudo when install it.

# Verify all requirement
- Open a new shell and execute the following commands:
```sh
yarn -v
gauge -v
```
- You should get versions of Yarn and Gauge without any errors.

# Create a new Gauge project with TypeScript template
- Open a new shell.
- Create a new folder for a Gauge project and initialize the project with TypeScript template.
```sh
mkdir gauge-example
cd gauge-example
gauge init ts
```
- Optionally, you can change a folder name (project name) to any name that you like.
- Install all Node.js packages with yarn.
```
yarn install
```
# Open and update the project with VS Code

- Open the project folder with VS Code
```sh
code .
```

- Install Gauge extension for VS Code
  - In VS Code, click extension button on the left-hand side of the screen, search and install "Gauge" extension.
  - More information for Gauge extension https://marketplace.visualstudio.com/items?itemName=getgauge.gauge
- Optionally, add `.editorconfig` file at the root of the project with the following content:
```
# EditorConfig is awesome: https://EditorConfig.org
# top-most EditorConfig file
root = true

[*]
# Unix-style newlines with a newline ending every file
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
```

- Optionally, you can add `"editor.codeLens": true` to `.vscode/settings.json` to make sure code lens is always enable.
  - Gauge extension uses code lens for showing `Run Scenario|Debug Scenario` option.
  - Here is the example content of `.vscode/settings.json`
  ```json
  {
    "files.associations": {
      "*.spec": "gauge",
      "*.cpt": "gauge"
    },
    "editor.codeLens": true,
  }
  ```

# Run the project from Ru Scenario option
- Open `/specs/example.spec` file and you will find `Run Scenario` option above `Display number of items` message
- `Display number of items` is a test scenario.
- Click `Run Scenario` and a browser will be launched a todo app.
- After a test has finished, you will get a successful result in the output window.
- You can view a test report from a link in the output window.

# Run project from the command line
- Open package.json at the root of the project and add the following code
```json
  "scripts": {
    "test": "gauge run specs"
  }
```
- Open VS integrated terminal.
- Run all tests in the project with the following command:
```
yarn test
```
- Here is the test result in a terminal
```sh
$ gauge run specs
# Getting Started with Gauge
  ## Display number of items     ✔ ✔ ✔ ✔ ✔ ✔
  ## Must list only active tasks         ✔ ✔ ✔ ✔ ✔ ✔ ✔

Successfully generated html-report to => /home/aaron/projects/gauge-example/reports/html-report/index.html

Specifications: 1 executed      1 passed        0 failed        0 skipped
Scenarios:      2 executed      2 passed        0 failed        0 skipped

Total time taken: 3.659s
```
