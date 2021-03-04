import React from 'react'
import Card from './Card'
import AniLink from "gatsby-plugin-transition-link/AniLink";
import { graphql } from 'gatsby';
import '../style.css'

const TagComponent = ({ pageContext, data }) => {

    const tag = pageContext.tag

    return (

        <div className="container">
            <AniLink
                to="/tags"
                fade
                duration={.5}
            >
                <img src="https://img.icons8.com/material-rounded/48/00bcd4/back.png" width="48" alt="back-icon" className="mb-4" />
            </AniLink>

            <h1>#{tag}</h1>
            <div className="col">
                {
                    data.allMarkdownRemark.edges.map(
                        ({ node }, index) => {
                            return <Card
                                key={index}
                                slug={node.frontmatter.slug}
                                authorName={node.frontmatter.author}
                                title={node.frontmatter.title}
                                description={node.frontmatter.description}
                                timeStamp={node.frontmatter.date}
                            />
                        }
                    )
                }
            </div>
        </div>

    )
}

export default TagComponent

export const query = graphql`
    query($tag: String!){
        allMarkdownRemark(filter: {frontmatter: {tags: {eq: $tag}}}) {
        edges {
            node {
            frontmatter {
                title
                slug
                date(formatString: "MMMM DD, YYYY")
                description
                author
            }
            }
        }
        }
    }
`