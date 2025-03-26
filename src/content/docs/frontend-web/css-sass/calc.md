---
title: CSS calc function
showMetadata: true
editable: true
showToc: true
order: 2
---

## How to use Sass variable in CSS calc function

- We need to use [Sass Interpolation](https://sass-lang.com/documentation/interpolation).
- Example SCSS (Syntactically Awesome Style SheetS) code:

```css
$body-padding: 20px;

body {
  height: calc(100% - #{$body-padding});
}
```

- Credit https://stackoverflow.com/a/20236515/1872200
