---
title: Publish APK file to Google Play
showMetadata: true
editable: true
showToc: true
order: 6
---

# Publish APK file to Google Play with command line tool

# Create Service Account and download P12 Key

- Go to Google Developers Console https://console.developers.google.com
- Create a new project
- On Select a project that you have just created.
- At Hamburger button, select APIs & Services.
- Select Credentials.
- On top menu, click `+ CREATE CREDENTIALS` > select `Service accounts`
- Enter your service account name > click `CREATE` > select `Service Account User` > click `Done`
- In Service Account section, select a service account that you have just created.
- Select `KEY` tabs > click `ADD KEY` > click `Create new key > select json > click`CREATE`.
- Save you key and key password

# Add permission to your service account

- Go to Google Play Console https://play.google.com/apps/publish
- On left menu, select Settings > Developer account > API access
- At Service accounts section > find your service account that you have just created > click `Grant access`
- All releases permissions already checked, for simplify this click Invite user.

# Install apkup as a global tool

- apkup is a tool to publish an apk file to Google play
- Install apkup globally with

```
yarn global add apkup
```

- Use with minimum parameters to publish an apk file and make it ready for production.

```
apkup --key service-account-key.json --apk app.apk --release-notes "en-US=Your English release note" --track production

```
