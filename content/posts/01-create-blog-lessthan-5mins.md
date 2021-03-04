---
slug: "/blog/create-blog-lessthan-5mins"
date: "2019-07-12"
title: "How to create Blog in less than 5 Minutes"
author: "Mohan"
tags: ["gatsby" , "blog"]
description: "In this post, you will see how to create an awesome blog in less than 5 minutes"
authorImg: "https://avatars3.githubusercontent.com/u/21126965?s=460&v=4"
---

Hello Folks,

This is my first post and I'm really excited. I’m pretty sure I’ll write a lot more interesting things in the future. C'mon Let's build an awesome blog with GatsbyJS in less than 5 minutes.

## What is GatsbyJS?
GatsbyJS is a static site generator, based on React that helps us build blazing fast sites with ease. If you're interested to learn more about it, refer [docs](https://www.gatsbyjs.org/docs/). 

It's open-source and has a large community. Gatsby has tons of good looking, minimalistic, responsive starters that help us to get started with Gatsby. In this post, we will be using one of the starter to create our blog.

## Setup

To create a gatsby project, we need `gatsby-cli`.

```
npm install -g gatsby-cli
```

After installing gatsby, we need a starter to get our project up and running. Choose your starter from [here](https://www.gatsbyjs.org/starters/). In this post, I will be using [gatsby-starter-lumen](https://www.gatsbyjs.org/starters/alxshelepenok/gatsby-starter-lumen), it is very light-weight and minimal.

```
gatsby new name-of-your-blog https://github.com/alxshelepenok/gatsby-starter-lumen
```

### Start Developing

```
cd name-of-your-blog

gatsby develop
```
Open the source code and start editing!

Your site is now running at http://localhost:8000

### Edit Content

Go to `Content/Posts` folder and you will see a list of `markdown` files. All the posts of your blog should be written in `markdown`. 

Add your content and Save your changes and the browser will update in real time!

## Deploy

Now its time to deploy your site. Its very easy to deploy follow these instructions.
- Create a Github Repo
- Push your content to it
- Create an account in Netlify from [here](https://app.netlify.com/signup)
- Create a new site from git
- Select your appropriate Github Repo to deploy
- Now, Press on Deploy Button and your site will be deployed

Congrats🎉!!
You have successfully created your blog.


## Update

Its also very easy to update your site.
Just push your changes to your `repo` and commit them.

Boom! You site is updated. I have also created my own starter if you wanna try, click [here](https://github.com/mohanmonu777/gatsby_contentful_starter).