import React from 'react'
import Card from '../components/Card'
import { useStaticQuery, graphql, } from 'gatsby'
import { Link } from 'gatsby';

export default () => {
  const data = useStaticQuery(graphql`
    {
        allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}, limit: 4) {
          edges {
            node {
              frontmatter {
                title
                slug
                date(formatString: "MMMM DD, YYYY")
                author
                description
              }
            }
          }
        }
      }      
    `
  )

  return (
    <div className='col-lg-8'>
      {
        data.allMarkdownRemark.edges.map(
          ({ node }) => (
            <Card
              key={node.frontmatter.title}
              slug={node.frontmatter.slug}
              authorName={node.frontmatter.author}
              title={node.frontmatter.title}
              description={node.frontmatter.description}
              timeStamp={node.frontmatter.date}
            />
          )
        )
      }
      <Link className='my-3 float-right btn text-info shadow-sm' to='blog'>
        View All →
      </Link>
    </div>
  )
}