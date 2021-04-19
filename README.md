# .NET Thailand official website

![dotnetthailand.com logo](src/images/dotnet-thailand-logo.png)

[https://www.dotnetthailand.com](https://www.dotnetthailand.com)

## How to contribute to this project

![how to contribute flow diagram](src/images/how-to-contribute.png)

### 1. Create Issue
[Create a new issue](https://github.com/dotnetthailand/dotnetthailand.github.io/issues/new). Please describe your intention and details of what you want to do. You can see [our previous issues](https://github.com/dotnetthailand/dotnetthailand.github.io/issues) for example. Create issue is easy, make it simple. When you have idea, create it. It does not need to be perfect from start.

### 2. Discuss
Let you, admin team, and other members a chance to make conversation on the issue topic:

  - Discuss about solution and alternatives. Two heads are better than one.
  - From discussion, we may prevent duplicate or unnecessary works that save your valuable time.
  - Ask any questions that you want people help clarify. Example which category your new pages should belong to.
  - Let people know in advance for what you are going to do is always a good idea.

Once things ready, set `Assignees` to member(s) who wish to work on the issue. This can be either the issue's creator or anyone else. And you can remove `help wanted` labels if any.

> This first two steps are not required in all scenarios but we encourage you to do that
to boost up collaboration that makes things better and more enjoyable✨

### 3. Fork, Commits, Push, and Create PR
- Fork this repository to your own GitHub account and then clone it to your local machine.
- Create a new branch, name it to what you are going to change/add. Please use `kebab-case` naming.
  ```sh
  git checkout -b your-branch-name
  ```

- Start your work, commit the code.
- Push your changes to your origin.
  ```sh
  git push origin -u your-branch-name
  ```

- Create a new Pull Request (PR) targeting the `main` branch of `dotnetthailand.github.io`

### 4. Reviews, Discuss, Push more commits
- Waiting for reviewing. push more commits if needed to fix your work from PR's feedback.
- Commit, and push your code again.
  ```sh
  git push
  ```

### 5. Then waiting for your PR to be merged.
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

## Trouble shooting if you have any issue while running the project
- 404 after deployment, you may miss CNAME file
- Markdown content inside component not show https://awsm.page/mdx/mdx-markdown-inside-a-react-component/
- Failed to launch the browser process: error while loading shared libraries: libnss3.so: No such file or directory.
  Follow the steps in the following link. https://github.com/alixaxel/chrome-aws-lambda/issues/164#issuecomment-754621407

## TO DO
- We use GitHub Issues to track our to do items.
- Please check the following link if you would like to contribute to the project.
- https://github.com/dotnetthailand/dotnetthailand.github.io

## Useful information
- This project uses MDXProvider to not have to import a React component every MDX document. Read more https://www.gatsbyjs.com/docs/mdx/importing-and-using-components/#make-components-available-globally-as-shortcodes
- [Responsive Solutions for Feature Comparison Tables](https://www.sitepoint.com/responsive-solutions-for-feature-comparison-tables/)
