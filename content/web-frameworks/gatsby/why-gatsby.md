---
title: Why Gatsby?
showMetadata: true
editable: true
showToc: true
---

# Prerequisite
- React
- GraphQL (You can also read from the Gatsby Docs)

# Consider to use Gatsby if:
- You want to create your personal blog.
- You want to create a website for a company, foundation, agency, meetup, group, organization that seldom update contents.
- You are going to use a static site generator.
- You don't want to backup a database and image files.
- You don't want to pay for a hosting/database/CDN and pay only for domain name.
  - For public repository, you can use GitHub Pages.
  - For private repository, you can use Cloudflare Workers.
- You want to create Progressive Web Apps (PWA).
- You want to work with a new technologies out of the box without any extra setup, e.g.
  - TypeScript
  - Sass
  - GraphQL is ready to use and no addition setup. All .md, image, YAML files and other assets are exposed as GraphQL resources that you can query to construct a new page in a website.
  - React Hook
  - Hot reload to see an update result immediately
- You like Markdown and want to use MDX which supports React component inside .mdx file.
- A lot of plugin that easily setup and use to enable rich contents to Gatsby site, e.g.
  - Mermaid
  - GraphViz
  - Git history information
  - More plugins https://www.gatsbyjs.com/plugins
- You want to start with many free themes/starter https://www.gatsbyjs.com/starters/.
- Easy to setup with GitHub Actions for continuous delivery.
  - [GitHub Action workflow for GitHub Pages](/programming-cookbook/github-actions/deploy-to-github-pages)
  - [GitHub Action workflow for CloudFlare Workers](/programming-cookbook/github-actions/deploy-to-cloudflare-workers)

# Gatsby don't be suitable if:

- The web admin is not a developer. To modify the content or design, it requires programming skill.
- You want admin control panel to modify the content.
- Your content will be changed quite often, it'll make difficult to modify the content when compare to use admin panel.
  - If you want to update the content in mobile or public computer, it might not convenience. The computer requires specify tools such as an editor, git command etc.
- You're sticky on the traditional technology like basic html and css renderer tools. Other tools will be suitable for you such as:
  - [Jekyll](https://jekyllrb.com/) - for Ruby user
  - [Eleventy](https://www.11ty.dev/) (11ty) for JavaScript/Node user (The concept almost closes to Jekyll)
  - [Hugo](https://gohugo.io/) - for Go user

# Other useful information
- [Gatsby vs WordPress](https://www.gatsbyjs.com/features/cms/gatsby-vs-wordpress/)
- [Gatsby vs Jekyll vs Hugo](https://www.gatsbyjs.com/features/jamstack/gatsby-vs-jekyll-vs-hugo/)
- [Gatsby vs Next.js](https://www.gatsbyjs.com/features/jamstack/gatsby-vs-nextjs/)
