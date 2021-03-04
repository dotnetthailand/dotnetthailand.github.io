import React from 'react'
import Page from '../components/PageLayout';
import Helmet from 'react-helmet';
import Search from '../components/Search';
import { useStaticQuery, graphql } from 'gatsby';

function Authors() {
    const data = useStaticQuery(graphql`
    query SearchIndexQuery {
      siteSearchIndex {
        index
      }
    }
  `)

    return (
        <Page>
            <Helmet>
                <title>Authors | The 404 Blog</title>
            </Helmet>
            <div className="container">
                <Search searchIndex={data.siteSearchIndex.index} />
                <p className="text-center">Search powered by <a href="http://elasticlunr.com/">Elasticlunr.js</a></p>
            </div>
        </Page>
    )
}

export default Authors
