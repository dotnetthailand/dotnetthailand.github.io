---
title: git-subrepo
showMetadata: true
editable: true
showToc: true
---

# Use git subrepo to manage a custom Orchard Core CMS module
- I use git subrepo to manage my Orchard Core CMS custom modules.  Here are what I did:
- Create a repository for an individual custom module.
- Pull required custom modules to the main project.
- Continue working on the main project.
- Push all changes to an individual modules' repositories.
- We can pull an update version of each module that used by other projects.
- Let's started by following the steps below.

## Create a new repository for a custom module
- Go to [GitHub](https://github.com/) and create a new GitHub repository for your custom Orchard Core CMS module.
- Create an empty project
- Select public project for an open source project or private if not.
- Select Initialize with README file.
- Select Visual Studio git ignore.
- Select MIT License for an open source project.
- Create a new `develop` branch from GitHub UI in branch drop down.
- Change `develop` branch as a default branch.

<!-- When we do marketing we need to have a release version of a module -->

## Install git-subrepo
- Follow [this document](https://github.com/ingydotnet/git-subrepo#installation) to install git-subrepo.
- Execute `git subrepo --version` to verify if you have successfully installed git-subrepo.

## Clone a custom module to the main project
- Assume that we have setup Orchard Core CMS project. You can follow [this document](/web-frameworks/orchard-core-cms/setup-orchard-core-cms) to setup a new Orchard Core CMS project.
- Your Orchard Core CMS project should look like this:
  ```sh
    tree -I "bin|obj" orchard-example
    orchard-example
    ├── nuget.config
    └── src
        └── Orchard.Web
            ├── NLog.config
            ├── Orchard.Web.csproj
            ├── Program.cs
            ├── Properties
            │   └── launchSettings.json
            ├── Startup.cs
            ├── appsettings.json
            └── wwwroot
  ```
- Before cloning a module project with git-subrepo, please make sure your main project is under git repository and you have committed all changes.
- CD to the root of your Orchard Core CMS project and run the following command:
  ```sh
    git subrepo clone <your-custom-module-remote-url> <your-custom-module-path>
  ```
- Please note that the tool does not create another subdirectory with the name of the subrepo that you are adding.
- Example command to clone `Codesanook.OrganizationProfile` to the main project.
  ```sh
    git subrepo clone git@github.com:codesanook/Codesanook.OrganizationProfile.git src/Modules/Codesanook.OrganizationProfile
  ```

## Generate code for a custom module
- If we clone an empty project, we need to generate some code from a template.
- Follow [this document](/web-frameworks/orchard-core-cms/create-a-custom-orchard-core-cms-module#createthemoduleprojectfromatemplate) to generate code for a custom module from a template.

## Your current project's file structure
- After cloning a custom project's repository and generate some code if needed, your project files' structure should look like this:
  ```sh
    tree -Ia "bin|obj|Localization" orchard-example
    orchard-example
    └── src
        ├── Modules
        │   └── Codesanook.OrganizationProfile
        │       └── .gitrepo
        └── Orchard.Web
  ```
- **Some file/folder have been omit for simplicity.**
- git-repo creates `.gitrepo` file for storing some subrepo essential information. We don't edit this file direct but we manage our project with git-subrepo commands instead.
- If you run `git log`, you will find a new commit with the similar content as the following:
```sh
  git log
  Date:   Tue Mar 22 16:31:26 2022 +0700

      git subrepo clone git@github.com:codesanook/Codesanook.OrganizationProfile.git src/Modules/Codesanook.OrganizationProfile

      subrepo:
        subdir:   "src/Modules/Codesanook.OrganizationProfile"
        merged:   "6e44051"
      upstream:
        origin:   "git@github.com:codesanook/Codesanook.OrganizationProfile.git"
        branch:   "develop"
        commit:   "6e44051"
      git-subrepo:
        version:  "0.4.3"
        origin:   "https://github.com/ingydotnet/git-subrepo"
        commit:   "2f68596"
```

## Continue your work
- You can now continue your work commit and push changes to your main project repository as usual without special command.
- **It is good to make a separated commit for changes in your custom module.**

## Push changes to a custom module's repository
- Execute the following command to push changes to a custom module's repository:
  ```sh
    git subrepo push <your-custom-module-path>
  ```
- Example code to push changes in Codesanook.OrganizationProfile back to its repository:
  ```sh
    git subrepo push src/Modules/Codesanook.OrganizationProfile
  ```
- You can also specify a branch name when using a push command.

## Update the latest version of a custom module
- On another project, if you want to update the latest version of a custom module, just execute the following command:
  ```sh
    git subrepo pull <your-custom-module-path>
  ```
- Example code to pull changes in Codesanook.OrganizationProfile to the main project:
  ```sh
    git subrepo pull src/Modules/Codesanook.OrganizationProfile
  ```

## Other consideration to distribute your custom module.
- You can also make your open source custom module as Nuget package and let other projects consume your Nuget package instead of cloning it by git-subrepo.
- This is good if a consumer doesn't make any changes to your custom module.
- You may learn how to publish a Nuget package from [these videos](https://www.youtube.com/watch?v=WW3bO1lNDmo&list=PLdo4fOcmZ0oVLvfkFk8O9h6v2Dcdh2bh_).

# Useful links and credit
- [git-subrepo's repository](https://github.com/ingydotnet/git-subrepo/)
- [git-subrepo tutorial](https://blog.s-schoener.com/2019-04-20-git-subrepo/)
- [git-subrepo basic guide](https://github.com/ingydotnet/git-subrepo/wiki/Basics)
