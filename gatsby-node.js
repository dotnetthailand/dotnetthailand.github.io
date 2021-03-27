const path = require('path');
const startCase = require('lodash.startcase');
const chokidar = require(`chokidar`);
const { touch } = require('./src/utils/fileUtils');
const axios = require('axios');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: MdxFrontmatter
    }
    type MdxFrontmatter {
      showToc: Boolean
      tocDepth: Int
      editable: Boolean
      showMetadata: Boolean
      showPreviousNext: Boolean
      description: String
      metaTitle: String
      order: Int
    }
    type File implements Node {
      fields: Fields
    }
    type Fields {
      gitLogLatestAuthorName: String
      gitLogLatestAuthorEmail: String
      gitLogLatestDate: Date @dateformat
    }
    type SiteSiteMetadata implements Node {
      headerLinks: [HeaderLinks]
    }
    type HeaderLinks {
      text: String!
      link: String!
      external: Boolean
    }
  `;
  createTypes(typeDefs);
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMdx(filter: {fields: {draft: {ne: true}}}) {
              edges {
                node {
                  fields {
                    id
                    slug
                  }
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          console.log(result.errors); // eslint-disable-line no-console
          reject(result.errors);
        }

        createPage({
          path: `/404.html`,
          component: path.join(process.cwd(), 'src/pages/404.js'),
        });

        // Create pages.
        result.data.allMdx.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.slug ? node.fields.slug : '/',
            component: path.resolve('./src/templates/docs.js'),
            context: {
              id: node.fields.id,
            },
          });
        });
      })
    );
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        $components: path.resolve(__dirname, 'src/components'),
        buble: '@philpl/buble', // to reduce bundle size
      },
    },
  });
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-proposal-export-default-from',
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent);
    let value = parent.relativePath.replace(parent.ext, '');

    if (value === 'index') {
      value = '';
    }

    createNodeField({
      name: `slug`,
      node,
      value: `/${value}`,
    });

    createNodeField({
      name: 'id',
      node,
      value: node.id,
    });

    createNodeField({
      name: 'title',
      node,
      value: node.frontmatter.title || startCase(parent.name),
    });
  }
};

exports.onPreBootstrap = () => {
  const watcher = chokidar.watch('./config', {
    ignored: ['jargon*'],
  });
  watcher.on(`change`, () => {
    touch('./gatsby-config.js');
  });
};

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;
  // fetch raw data
  const fetchContributors = () => axios.get(
    'https://api.github.com/repos/dotnetthailand/dotnetthailand.github.io/contributors?page=1&per_page=100',
    {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    }
  );

  // await for results
  const res = await fetchContributors();

  // Map return result and create nodes
  res.data.map((contributor) => {
    // Create a node object
    const userNode = {
      // Required fields
      id: createNodeId(`contributor-${contributor.id}`),
      parent: null,
      children: [],
      internal: {
        type: `Contributor`, // name of the graphQL query --> allContributor
        contentDigest: createContentDigest(contributor),
      },

      // Other fields that you want to query with graphQl
      login: contributor.login,
      avatar_url: contributor.avatar_url,
      contributions: contributor.contributions,
      html_url: contributor.html_url
    }

    // Create node with the gatsby createNode() API
    createNode(userNode);
  });

  return;
};
