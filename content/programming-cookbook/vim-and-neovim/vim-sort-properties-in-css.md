# Vim Sort properties in css

# Step

```css
/* Example */
h4 {
  margin: 15px;
  padding: 20px 0;
  font-size: 11px;
  background: red;
}
```

- let say we would like to sort 11 ,15 and 20 for above example
- put your cursor in front of marging (m)
- then type `<shift + v> 2j`
- then type `:sort`
- let see the output pretty nice :)

```css
/* Example */
h4 {
  font-size: 11px;
  margin: 15px;
  padding: 20px 0;
  background: red;
}
```
