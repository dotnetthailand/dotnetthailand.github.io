---
title: git bisect
showMetadata: true
editable: true
showToc: true
---


## Tool that allows you to find an offending commit
# Start git bisect
```
git bisect start
```
# Give git a commit where there is not a bug
```
git bisect good <commit> or git bisect good <tag>
git bisect good a09c728 or or git bisect good v0.4.1
```
# Give git a commit where there is not a bug
```
git bisect bad <commit>
git bisect bad a09c729
If empty commit will be used last commit
```

**At this point →** splitting  the revisions in half and loading them up for you. It will checkout each revision and then ask you if the commit is good or bad. and git will take care of the rest Like binary search.

Manually finding bugs with bisect is great but we can also automate it with unit test.

# Automatic bisect 
```
git bisect run <file>
```

# After Fix Bug
```
git bisect reset
```

# Log
```
git bisect log
```