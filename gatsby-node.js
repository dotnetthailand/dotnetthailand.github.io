const path = require(`path`)

/* 
  Author : Mohan
  CreatedAt : 06-07-2019
*/

//this will create pages programatically
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /bad-module/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

exports.createPages = ({ graphql, actions }) => {

  const { createPage } = actions

  const blogPost = path.resolve(`./src/components/BlogPostTemplate.js`)
  const tagComponent = path.resolve(`./src/components/TagComponent.js`)

  return graphql(
    `
    {
      allMarkdownRemark {
        edges {
          next{
            frontmatter{
              slug
              title
            }
          }
          previous{
            frontmatter{
              slug
              title
            }
          }
          node {
            frontmatter {
              slug
              tags
            }
          }
        }
      }
    }
    
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((post, index) => {
      const next = post.next
      const previous = post.previous

      let tags = post.node.frontmatter.tags

      createPage({
        path: post.node.frontmatter.slug,
        title: post.node.frontmatter.title,
        component: blogPost,
        context: {
          slug: post.node.frontmatter.slug,
          previous,
          next,
        },
      })

      tags.forEach((tag, index) => {
        createPage({
          path: "/tags/" + tag,
          component: tagComponent,
          context: {
            tag
          }
        })
      })

    })

    return null
  })
}

