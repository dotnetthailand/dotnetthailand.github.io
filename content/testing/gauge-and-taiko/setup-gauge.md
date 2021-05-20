---
title: Setup Gauge
showMetadata: true
editable: true
showToc: true
order: 1
---

# Requirement
- Node.js version >= 10.16.3 (LTS)
- Yarn

# Setup Gauge with TypeScript template
- Open a new shell
- Install Gauge as a global tool.
```sh
npm install -g @getgauge/cli
```

- Create a new folder for a Gauge project and initialize the project with TypeScript template.
```sh
mkdir gauge-example
cd gauge-example
gauge init ts
```

- Install all Node.js packages with yarn
```
yarn install
```

- Open the project folder with VS Code
```sh
code .
```

- Install Gauge extension for VS Code
- In VS Code, click extension button on the left-hand side of the screen, search and install "Gauge" extension.
  - More information for Gauge extension https://marketplace.visualstudio.com/items?itemName=getgauge.gauge
- Optionally, add .editorconfig file at the root of the project with the following content:
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

- Optionally, you can add `"editor.codeLens": true` to .vscode/settings.json to make sure code lens is always enable.
- Gauge extension uses codelens for `Run Scenario|Debug Scenario` option
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

# Run the project
- Open `/specs/example.spec` file and you will find `Run Scenario` option above `Display number of items` message
- `Display number of items` is a test scenario.
- Click `Run Scenario` and a browser will be launched a todo app.
- After a test has finished, you will get a successful result in the output window.
- You can view a test report from a link in the output window.
