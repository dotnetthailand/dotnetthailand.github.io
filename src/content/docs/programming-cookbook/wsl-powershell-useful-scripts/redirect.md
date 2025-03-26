---
title: Redirect
showMetadata: true
editable: true
showToc: true
---

# Good article to learn redirect
- [Bash One-Liners Explained, Part III: All about redirection](https://catonmat.net/bash-one-liners-explained-part-three)

# Example
- cat nope.txt > output.txt 2>&1 is not the same as cat nope.txt 2>&1 > output.txt

```
cat nope.txt > output.txt 2>&1
```
- \> output.txt, stdout points to output.txt
- 2>&1, stderr points to stdout and end up pointing to output.txt.
- Everything is written to output.txt.

```
cat nope.txt 2>&1 > output.txt
```
- 2>&1, stderr points to stdout which is a terminal
- \> output.txt, stdout switches to output.txt but leave stderr still points to a terminal.
- As a result, stderr is written to a terminal but stdout is written to output.txt.

# Discard all outputs of a command
- $ command > /dev/null 2>&1 or
- $ command &> /dev/null

