# .NET Thailand official website (https://www.dotnetthailand.com)

## How to contribute to this project
- Fork this repository to your own GitHub account and then clone it to your local machine.
- Create a new branch, name it to what you are going to change/add. Please use `kebab-case` naming.
```
git checkout -b your-branch-name
```
- Start your work, commit the code.
- Push your changes to your origin.
```
git push origin -u your-branch-name
```
- Open a new PR targeting the main branch of `dotnetthailand.github.io`
- Waiting for reviewing.
- Fix your PR from PR's feedback, commit and push your code again.
```
git push
```
- Waiting for your PR to be merged.

---

## How run this project locally
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

## Road map
- [x] Migrate contents from .NET FAQ and Awesome .NET Thailand
- [ ] .NET Road map from cheat sheet project
- [ ] Useful libraries

## TODO
- [x] Fix Chrome local and supporting Mermaid
- [ ] Improve Mermaid too small font and hard to read on a mobile phone
- [ ] Missing Emoji in a content :wave:
- [ ] favicon of .NET Thailand
- [ ] PWA
- [ ] Disable ask to load a new content popup, implicit load new content
- [ ] Hover content header to show anchor like Markdown in GitHu and
- [ ] Broken table of content in a Makrdown page
- [ ] An image loss quality because it is get transformed
- [ ] Caching issue when disable JavaScript and the website not load in a browser
- [ ] The first toggled item cannot be collapsed.
- [ ] Add Facebook Comments Plugin to all content pages
- [ ] Enable search
- [ ] Remove limit only first 100 contributors, use pagination.
- [ ] Add Jest unit test and GitHub workflow

## Trouble shooting
- 404 after deployment, you may miss CNAME file
- Markdown content inside component not show https://awsm.page/mdx/mdx-markdown-inside-a-react-component/
- Failed to launch the browser process: error while loading shared libraries: libnss3.so: No such file or directory.
  Follow the steps in the following link. https://github.com/alixaxel/chrome-aws-lambda/issues/164#issuecomment-754621407


## How to create a custom React component and use it in .mdx file
- TODO

## Useful information
- This project uses MDXProvider to not have to import a React component every MDX document. Read more https://www.gatsbyjs.com/docs/mdx/importing-and-using-components/#make-components-available-globally-as-shortcodes
- [Responsive Solutions for Feature Comparison Tables](https://www.sitepoint.com/responsive-solutions-for-feature-comparison-tables/)
