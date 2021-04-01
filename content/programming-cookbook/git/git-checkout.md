---
title: git checkout
showMetadata: true
editable: true
showToc: true
---

- Create a branch based on the current branch
```
git checkout -b "new-branch-name"
```

- Create a branch based on the hash value or relative to the latest commit of the current branch
```
git checkout -b "new-branch-name" <sha1-of-commit or HEAD~3>
```

- How to reset or revert a file to a specific revision?
```
git checkout c5f567 -- file1/to/restore file2/to/restore

```
- Hard reset of a single file
```
git checkout -- file-name-that-you-deleted
```
**--** basically means: treat every argument after this point as a file name.
More details in [this answer](https://stackoverflow.com/a/6561160/1872200).
