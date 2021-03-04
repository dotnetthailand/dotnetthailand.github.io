import { graphql } from "gatsby"
import React from 'react'
import '../style.css'
import Helmet from 'react-helmet'
import AniLink from "gatsby-plugin-transition-link/AniLink";
import useTheme from '../useTheme'
import TagList from "./TagList";
import { DiscussionEmbed } from 'disqus-react'

const Temp = ({ data, pageContext }) => {

  console.log(pageContext)

  const { theme, toggleTheme } = useTheme();

  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html, timeToRead } = markdownRemark
  const { previous, next } = pageContext

  const disqusConfig = {
    shortname: "the404blog",//your site shortname here
    config: { identifier: frontmatter.slug, title: frontmatter.title },
  }

  function getTheme() {
    if (theme === "light") {
      return <img src="https://img.icons8.com/ios-glyphs/24/FFFFFF/moon-symbol.png" alt="moon-icon" />
    }
    else {
      return <img src="https://img.icons8.com/android/24/FFFFFF/sun.png" alt="sun-icon" />
    }
  }


  return (
    <div className={"row post " + theme}>
      <Helmet>
        <title>{frontmatter.title}</title>
      </Helmet>
      <button className="btn theme-toggle-button" onClick={toggleTheme}>
        {getTheme()}
      </button>
      <div className={"col-lg-4 px-5 post-prefix bg-" + theme}>
        <div className="flexbox">
          <AniLink
            to="/"
            cover
            direction="right"
            bg="#00BCD4"
          >
            <img src="https://img.icons8.com/material-rounded/48/00bcd4/back.png" width="48" alt="back-icon" />
          </AniLink>
          <span className="display-4 font-weight-bold">
            {frontmatter.title}
          </span>
          <span className="font-weight-bold text-muted">
            {timeToRead} MIN READ
          </span>
          <div className="row">
            <img
              alt="author-img"
              className="author-img rounded-circle ml-3"
              src={frontmatter.authorImg}
              width="60" />


            <span className="col my-auto">
              <AniLink fade className="font-weight-bold" to="/about">{frontmatter.author}</AniLink>
              <h6>{frontmatter.date}</h6>
            </span>
          </div>
        </div>
      </div>
      <div className={"col-lg-8 " + theme}>
        <div className="post-content" dangerouslySetInnerHTML={{ __html: html }} />
        <hr />
        <div className="px-4 my-2">
          <TagList tags={frontmatter.tags} />
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <AniLink to={previous.frontmatter.slug} fade>
                  ← {previous.frontmatter.title}
                </AniLink>
              )}
            </li>
            <li>
              {next && (
                <AniLink to={next.frontmatter.slug} fade>
                  {next.frontmatter.title} →
              </AniLink>
              )}
            </li>
          </ul>
          <hr/>
          {/* comments go here */}
          <DiscussionEmbed {...disqusConfig} /> 
        </div>
      </div>
    </div>

  )
}

export default Temp

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        tags
        author
        authorImg
      }
      timeToRead
    }
  }
`