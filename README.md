# .NET Thailand official website

![dotnetthailand.com logo](src/images/dotnet-thailand-logo.png)

[https://www.dotnetthailand.com](https://www.dotnetthailand.com)


## How to contribute

See [CONTRIBUTING](./CONTRIBUTING.md).

## How to run this project locally
- Install `Yarn` and `Gatsby` as a global tool.
- Clone the repository to your local machine.
- CD to the root of project folder.
- Install all dependencies.
```
$ yarn
```
- Run a project and enable hot-reload.
```
yarn start
```
- Open a browser and navigate to http://localhost:8000.
- Change some contents of `content/index.mdx` and you will find browser auto reload and show what you have changed.

## Troubleshooting if you have any issue while running the project
- 404 after deployment, you may miss CNAME file
- Markdown content inside component not show https://awsm.page/mdx/mdx-markdown-inside-a-react-component/
- Failed to launch the browser process: error while loading shared libraries: libnss3.so: No such file or directory.
  Follow the steps in the following link. https://github.com/alixaxel/chrome-aws-lambda/issues/164#issuecomment-754621407

## To do
- We use [GitHub Issues](https://github.com/dotnetthailand/dotnetthailand.github.io/issues/new) to track our to do items.
- Please check [the following link](./CONTRIBUTING.md) if you would like to contribute to the project.

## Useful information
- This project uses MDXProvider to not have to import a React component every MDX document. Read more https://www.gatsbyjs.com/docs/mdx/importing-and-using-components/#make-components-available-globally-as-shortcodes
- [Responsive Solutions for Feature Comparison Tables](https://www.sitepoint.com/responsive-solutions-for-feature-comparison-tables/)
