import React from 'react'
import Page from '../components/PageLayout';
import Helmet from 'react-helmet'
import { SocialIcon } from 'react-social-icons'

function About() {
    return (
        <Page>
            <Helmet>
                <title>About | The 404 Blog</title>
            </Helmet>
            <div className="container about my-5">
                <h1 className="font-weight-bold">Hi, there</h1>
                <h2>Welcome to The 404 Blog</h2>
                <h6 className="my-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </h6>
                <h2>Authors</h2>

                <div className="row my-5">
                    <div className="col-lg-6">

                        <img
                            width="250"
                            className="rounded-circle author-img mx-4 mb-4"
                            src="https://avatars2.githubusercontent.com/u/21126965?s=400&v=4"
                            alt="author-img" />

                    </div>
                    <div className="col">
                        <h3>
                            Hi , I'm Mohan
                            </h3>
                        <h5>Erstwhile child | Undergrad CS Student | Tech Enthusiast<br /></h5>
                        <p>
                            <br />

                            I created this blog to help people learn something intresting.
                            In this blog, i show case all my work and document them. I hope you get something valuable out of it.
                            <br />
                            I built this entire blog with <a href="http://gatsbyjs.org/">Gatsby Js</a> 🚀.
                        </p>

                        <h5>Stay in touch <br /></h5>
                        <SocialIcon url="github.com/mohanmonu777" className="mr-4" />
                        <SocialIcon url="https://twitter.com/_MrNullPointer" className="mr-4" />
                        <SocialIcon url="https://facebook.com/sree.dhannu" className="mr-4" />
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col-lg-6">
                        <img
                            width="250"
                            className="rounded-circle author-img mx-4 mb-4"
                            src="https://avatars2.githubusercontent.com/u/39739036?s=400&v=4"
                            alt="author-img" />
                    </div>
                    <div className="col">
                        <h3>
                            Hi , I'm Sumanth
                        </h3>
                        <h5>Android | Web | Freelancer <br /></h5>
                        <p>
                            <br />

                            I created this blog to help people learn something intresting.
                            In this blog, i show case all my work and document them. I hope you get something valuable out of it.
                            <br />
                            I built this entire blog with <a href="http://gatsbyjs.org/">Gatsby Js</a> 🚀.
                        </p>

                        <h5>Stay in touch <br /></h5>
                        <SocialIcon url="https://github.com/Mr404Found" className="mr-4" />
                        <SocialIcon url="https://twitter.com/Mr404Found" className="mr-4" />
                        <SocialIcon url="https://www.facebook.com/Mr404Found" className="mr-4" />
                    </div>
                </div>
            </div>

        </Page>
    )
}

export default About
