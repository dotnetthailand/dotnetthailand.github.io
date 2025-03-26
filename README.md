# .NET Thailand official website

![dotnetthailand.com logo](src/images/dotnet-thailand-logo.png)

[https://www.dotnetthailand.com](https://www.dotnetthailand.com)


## How to contribute

See [CONTRIBUTING](./CONTRIBUTING.md).

## How to run this project locally
- Install `Yarn`.
- Clone the repository to your local machine.
- CD to the root of project folder.
- Install all dependencies.

## Running on localhost

- To install the dependencies you need to run:
```sh
yarn
```
- If is the first time you are installing the dependencies it may take few minutes, get a coffee and relax :)
- To run the project with hot-reload enabled you can.
```sh
yarn start
```
- Open a browser and navigate to http://localhost:4321.
- Change some contents of `content/index.mdx` and you will find a browser reload and show what you have changed automatically.

## Troubleshooting
If you have any following issues while running the project, please follow short instruction to fix them.
- Failed to launch the browser process: error while loading shared libraries: libnss3.so: No such file or directory, follow the steps in this [link](https://github.com/alixaxel/chrome-aws-lambda/issues/164#issuecomment-754621407).
- 404 after deployment, you may miss a `CNAME` file in a repository.
- Markdown content inside a content folder does not show, please check https://awsm.page/mdx/mdx-markdown-inside-a-react-component/.

## To do
- We use [GitHub Issues](https://github.com/dotnetthailand/dotnetthailand.github.io/issues/new) to track our to do items.
- Please check [the following link](./CONTRIBUTING.md) if you would like to contribute to the project.

## Useful information
- This project uses MDXProvider to not have to import a React component every MDX document. Read more https://www.gatsbyjs.com/docs/mdx/importing-and-using-components/#make-components-available-globally-as-shortcodes
- [Responsive Solutions for Feature Comparison Tables](https://www.sitepoint.com/responsive-solutions-for-feature-comparison-tables/)

## Astro Integrations used in the project

https://docs.astro.build/en/guides/integrations-guide/
```sh
yarn astro add react
yarn astro add mdx
```

https://starlight.astro.build/getting-started/

## How to add a new content/article to the website
Starlight is ready for you to add new content, or bring your existing files!
Add new pages to your site by creating Markdown files in the src/content/docs/ directory.
Read more about file-based routing and support for MDX and Markdoc files in the "Pages" guide.

## Migration from Gatsby to AStro checklist
- [ ] React components
  - [ ] Contributors
  - [ ] FriendsWebsites
  - [x] FixingFloatingFooterToBottom>
  - [ ] FeatureAsRowComparisonTable
  - [ ] LimitTextToNumberOfLines
  - [ ] TextTransformExample
- Re-export images
  - [ ] basic-search-in-vim.gif
  - [ ] replacement_within_a_single_line.gif
  - [ ] replacement_inside_visual_section.gif
  - [ ] taiko-repl.gif

## Supporting CSS-in-JS #778
https://github.com/withastro/roadmap/discussions/778
