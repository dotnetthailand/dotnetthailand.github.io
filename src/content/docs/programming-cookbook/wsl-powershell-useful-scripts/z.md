---
title: z command
showMetadata: true
editable: true
showToc: true
---


# How to install z command
- Clone z project to your computer.
- For example, if you are about to clone it to home directory, use the following command:
```sh
$ cd ~
$ git clone git@github.com:rupa/z.git
```
- Add execution of z.sh script to ~/.bash_profile with the following command:
```sh
$ vi ~/.bashrc

```
- Add the following content to the file:
```
. ~/z/z.sh

```
- Save and exit `:wq`.
- Open a new shell, navigate to some directories and try to use z command to see if autocomplete works.
- Ubuntu does not have ~/.bash_profile by default https://askubuntu.com/a/510723/978822
