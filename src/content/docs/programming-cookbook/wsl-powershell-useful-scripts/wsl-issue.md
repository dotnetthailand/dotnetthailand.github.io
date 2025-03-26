---
title: WSL Issues
showMetadata: true
editable: true
showToc: true
---

# Puppeteer Failed to launch the browser process
- Failed to launch the browser process: error while loading shared libraries: libnss3.so: No such file or directory
- Follow the step in the following link. https://github.com/alixaxel/chrome-aws-lambda/issues/164#issuecomment-754621407


# System.IO.IOException: The configured user limit (128) on the number of inotify instances has been reached.
- Open a new WSL2 terminal and run the following command:
```
inotify.max_user_instances=524288 | sudo tee -a /etc/sysctl.conf
```
- For more information tee command https://man7.org/linux/man-pages/man1/tee.1.html
- Credit https://github.com/dotnet/aspnetcore/issues/8449#issuecomment-512275929


