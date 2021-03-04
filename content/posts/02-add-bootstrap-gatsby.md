---
slug: "/blog/add-bootstrap-to-gatsby"
date: "2019-07-13"
title: "How to add Bootstrap to Gatsby"
author: "Mohan"
tags: ["gatsby" , "bootstrap"]
description: "In this post, you will understand how to add bootstrap to your gatsby project"
authorImg: "https://avatars3.githubusercontent.com/u/21126965?s=460&v=4"
---

There are many ways to add bootstrap to our Gatsby project. In this post, we will see all the different ways in which we can add bootstrap to our project. By the way, if you don't know what bootstrap is, no problem, ill give you a quick glimpse of it.

## Bootstrap

Bootstrap is a library from twitter that helps us build responsive webpages with ease. It has pre-defined CSS classes and we can use them in our webpages to give a better look. If you want to learn more about it, refer the [docs](https://www.getbootstrap.com/docs). Trust me they are breathtaking.

## Adding Bootstrap to our Gatsby Site

Before adding bootstrap to our site, we need to create our Gatsby project and I assume you already created one. If you haven't, check out my other post, I wrote a simple tutorial on how to get your Gatsby project up and running.

There are a couple of Libraries like [react-bootstrap](https://react-bootstrap.github.io/), [react-strap](https://reactstrap.github.io/). They ship with ready-made react components, which can be used instantly. (react-bootstrap is a replacement for reactstrap, and is more actively maintained.)

If you're a guy, who likes to use Bootstrap as Components, I will recommend you to go with react-bootstrap.

### Setup 

Lets quickly setup react-bootstrap using `npm`

```nodejs
npm install react-bootstrap bootstrap
```
### Importing

You should import individual components like: react-bootstrap/Button rather than the entire library.Its better to import the components which are useful to you.

```javascript
// for single component
import Button from 'react-bootstrap/Button';

// for Multiple Components
import { Button , Card } from 'react-bootstrap';
```

## An Another way 

Recently, I have tried another way to use bootstrap in our project. We can simply use the classes defined in bootstrap with HTML tags with out using Components.

### Setup

First, install bootstrap using `npm`

```nodejs
npm install bootstrap
```

Now go to root folder of your Gatsby project and find a file called `gatsby-browser.js` 

> Note : If you can't find it, try creating a new file with same name

Edit the file as follows : 

```javascript
//Add the bootstrap files to the project
require("bootstrap/dist/css/bootstrap.css")
require("bootstrap/dist/js/bootstrap")
```

Now save the file and your site will reload.

Congrats🎉!!
You have successfully added `bootstrap` to your site.



If you find any errors, DM me or comment down below.