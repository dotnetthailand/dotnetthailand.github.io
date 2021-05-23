---
title: Webpack configuration for Sass only
showMetadata: false
editable: true
showToc: true
---

# Initialize Node.js project
```sh
mkdir sass-webpack-project
cd sass-webpack-project
yarn init -y
```
- You can change a folder name as you want.
- You will have auto generated package.json file in a current working directory.

# Add required packages to the project.
```sh
yarn add --dev \
node-sass \
sass-loader \
webpack \
webpack-cli \
css-loader \
mini-css-extract-plugin \
webpack-remove-empty-scripts
```

# Create Webpack configuration file
- Create `webpack.config.js` at the same level as package.json
- Add the following content to webpack.config.js.
```js
// This webpack is only for building Sass (.scss) to CSS
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

// input file: src/src/scss/style.scss
// output file: wwwroot/styles/style.scss

module.exports = {
  entry: {
    style: './src/scss/style',
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'wwwroot/styles'), // output dir must be absolute path
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.scss'],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // Extract to CSS file
          MiniCssExtractPlugin.loader,
          // Translates CSS to CommonJS and ignore solving URL of images
          'css-loader?url=false',
          // Compiles Sass to CSS
          'sass-loader',
        ],
        exclude: /node_modules/,
      },
    ]// End rules
  },
  plugins: [
    new RemoveEmptyScriptsPlugin({ verbose: true }),
    new MiniCssExtractPlugin({
      // Configure the output of CSS.
      // It is relative to output dir, only relative path work, absolute path does not work.
      filename: "[name].css",
    }),
  ],
};

```
- Change entry point and output folder to match your environment.
- This configuration use RemoveEmptyScriptsPlugin to remove unnecessary output js file.

# Build with Webpack
- Add a custom script `package.json`
```json
  "scripts": {
    "build": "webpack --mode=production",
    "dev": "webpack --mode=development",
    "watch": "webpack --watch"
  },
```

- Build the project with the following command
```sh
yarn dev
```

# Check your CSS output file
- You will file your output .css file in an output folder that you specify in webpack.config.js
- For our example, the output file is in wwwroot/styles folder

# Project structure
```
sass-webpack-project
|-- src/styles/style.scss
|-- wwwroot/styles/style.css
|-- package.json
|-- webpack.config.js
|-- yarn.lock
```











