---
title: git rm
showMetadata: true
editable: true
showToc: true
---

# Untrack all files that already added to a repository
- Optionally, commit any code changes
- Add file/folder that you want to ignore to .gitignore file
- Then run the following command:
```
git rm -r --cached .
```
*This removes any changed files from the index(staging area).*
- Explain `rm` command
    - rm is the remove command
    - -r will allow recursive removal
    - –cached will only remove files from the index. Your files will still be there.
    - The . indicates that all files will be untracked. You can untrack a specific file with git rm --cached foo.txt.
    - The rm command can be unforgiving. If you wish to try what it does beforehand, add the -n or --dry-run flag to test things out.

- Then run:
```
git add .
```
*This add all changes files to a staging area.*

- Verify what you have changed.
```
git log
```
*This will show all ignored file are mark as deleted*

- Create a new commit:
```
git commit -m ".gitignore is now working"
```
credit https://www.codeblocq.com/2016/01/Untrack-files-already-added-to-git-repository-based-on-gitignore/

---
