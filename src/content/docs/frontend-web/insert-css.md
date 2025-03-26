---
title: Three way to insert css
showMetadata: true
editable: true
showToc: true
order: 1
---

# Three ways to insert CSS (Stylesheet)
When a browser reads a style sheet, it will format the HTML document according to the information in the style sheet.

## We can insert CSS by three ways
- External CSS
- Internal CSS
- Inline CSS

## External CSS
### yourstyle.css
```css
h1 {
   font-size: 18px;
   color: #ffffff;
}
p {
   padding: 5px 5px 5px 5px;
}
```

### HTML File
```css
<!DOCTYPE html>
<html>
<head>
   <link rel="stylesheet" type="text/css" href="yourstyle.css">
</head>
<body>
   <h1>External CSS</h1>
   <p>iamgique</p>
</body>
</html>
```

## Internal CSS
```css
<!DOCTYPE html>
<html>
<head>
<style>
   h1 {
      font-size: 18px;
      color: #ffffff;
   }
   p {
      padding: 5px 5px 5px 5px;
   }
</style>
</head>
<body>
   <h1>External CSS</h1>
   <p>iamgique</p>
</body>
</html>
```

## Inline CSS
```css
<!DOCTYPE html>
<html>
<head>
</head>
<body>
   <h1 style="font-size: 18px; color: #ffffff;">External CSS</h1>
   <p style="padding: 5px 5px 5px 5px;">iamgique</p>
</body>
</html>
```

- [w3schools css](https://www.w3schools.com/css/css_howto.asp)
- [อย่า! Inline CSS ใน Component เลยนะ ขอร้อง](https://iamgique.medium.com/อย่า-inline-css-ใน-component-เลยนะ-ขอร้อง-73456fcc9ba5)
