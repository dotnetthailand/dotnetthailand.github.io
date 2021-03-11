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
- [ ] Migrate contents
- [ ] .NET FAQ
- [ ] .NET Road map
- [ ] Useful libraries

## TODO
- [ ] Missing Emoji :wave:
- [ ] favicon
- [ ] PWA
- [ ] Ask to load a new content popup
- [ ] 

## Trouble shooting
- 404 after deployment, you may miss CNAME file
- Markdown content inside component not show https://awsm.page/mdx/mdx-markdown-inside-a-react-component/

## Useful information
- This project uses MDXProvider to not have to import a React component every MDX document. Read more https://www.gatsbyjs.com/docs/mdx/importing-and-using-components/#make-components-available-globally-as-shortcodes
