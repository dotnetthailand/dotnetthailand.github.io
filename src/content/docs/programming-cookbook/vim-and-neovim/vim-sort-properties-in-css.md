---
title: Vim Sort properties in css
---

## Step

```css
/* Example */
h4 {
  margin: 15px;
  padding: 20px 0;
  font-size: 11px;
  background: red;
}
```

- Let say we would like to sort 11 ,15 and 20 for above example
- Put your cursor in front of marging (m)
- Then type `<shift + v> 2j`
- Then type `:sort`
- Let see the output pretty nice :)

```css
/* Example */
h4 {
  font-size: 11px;
  margin: 15px;
  padding: 20px 0;
  background: red;
}
```
