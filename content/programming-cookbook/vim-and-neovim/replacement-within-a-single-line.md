---
title: Replacement within a single line
showMetadata: true
editable: true
showToc: true
---

## Replacement within a single line

Incase you want to search and replace some word in line of code

## How to do with vim?

### Steps

```js
//Example

let obj = {
  key1: 'value1',
  key2: 'value3',
  key3: 'value3',
};
```

- drop cursor on line do you want to select
- type `:s/key/value/g`
- then the line contain key get replace to value
- Done!

```js
//Example

let obj = {
  value1: 'value1',
  key2: 'value3',
  key3: 'value3',
};
```

![demo](images/replacement_within_a_single_line.gif)
