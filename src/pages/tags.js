import React from 'react'
import Page from '../components/PageLayout';
import Helmet from 'react-helmet';
import Link from 'gatsby-plugin-transition-link/AniLink';
import { graphql, useStaticQuery } from 'gatsby';


const Tags = () => {
    const { allMarkdownRemark } = useStaticQuery(
        graphql`
        {
            allMarkdownRemark {
              edges {
                node {
                  frontmatter {
                    tags
                  }
                }
              }
            }
          }
          
        `
    )

    const posts = allMarkdownRemark.edges

    let TagArray = []

    function getTagArray() {
        posts.map(
            ({node}, index) => {
                var tag = node.frontmatter.tags
                tag.forEach(
                    item => TagArray.push(item)
                )
                return ""
            }
        )
    }

    getTagArray()

    return (
        <Page>
            <Helmet>
                <title>Tags | The 404 Blog</title>
            </Helmet>
            <div className="container">
                <h1>Tags</h1>
                {
                    Array.from(new Set(TagArray)).map(
                        (tagItem, index) => {
                            return <Link
                                fade
                                duration = {.5}
                                to={"/tags/" + tagItem}
                                className="btn mr-4 btn-info my-3">
                                #{tagItem}
                            </Link>
                        }
                    )
                }
            </div>

        </Page>
    )
}

export default Tags
