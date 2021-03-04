import React from 'react'
import Page from '../components/PageLayout'
import Intro from '../components/Intro';
import PostList from '../components/PostList';
import Helmet from 'react-helmet'

function index() {
  return (
    <Page>
      <Helmet>
        <title>Home | The 404 Blog</title>
      </Helmet>
      <div className="container abs">
        <div className="row">
          <div className="col-lg-4">
            <Intro />            
          </div>
          <PostList />
        </div>
      </div>
    </Page>
  )
}

export default index
