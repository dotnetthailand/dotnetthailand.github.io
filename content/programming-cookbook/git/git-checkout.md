---
title: git checkout
showMetadata: true
editable: true
showToc: true
---

# Basic commands
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
**--** basically means: treat every argument after `--` as a file name.
More details in [this answer](https://stackoverflow.com/a/6561160/1872200).

# To checkout a PR branch for coding review
- Add a contributor's remote:
```sh
$ git remote add [REFERENCE_NAME] git@github.com:[CONTRIBUTOR_USERNAME]/[REPOSITORY].github.io.git
```

- REFERENCE_NAME is usually a contributor's name, e.g. aaron, mild.
- Then, fetch all branches of a contributor remote.
```sh
$ git fetch [REFERENCE_NAME]
```

- Git tries to automatically create a local branch which tracks a remote branch for you
- You should see a following message after running `git fetch`.
```sh
* [new branch] branch-name -> [REFERENCE_NAME]/branch-name
```

- You can checkout a new branch with:
```sh
$ git checkout branch-name
```

- This keeps a local branch on your computer.
- You can also checkout a temporary branch with:
```
$ git checkout [REFERENCE_NAME]/branch-name
```
