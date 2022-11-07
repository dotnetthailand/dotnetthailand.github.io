---
title: Fix Snap on WSL2
showMetadata: true
editable: true
showToc: false
---

## Fix Snap on WSL2
- Enable systemd on WSL2 by running the following commands:
  ```sh
    cd ~
    git clone https://github.com/DamionGans/ubuntu-wsl2-systemd-script.git
    cd ubuntu-wsl2-systemd-script/
    bash ubuntu-wsl2-systemd-script.sh
    # Enter your password and wait until the script has finished
  ```
- Restart WSL2 by opening a new PowerShell session and run `wsl --shutdown`.
- Open a new WSL2 shell and run:
  ```sh
    systemctl --version
  ```
- Your should find a version number `systemd 237` or a newer version of systemd.
- Unmask the snapd.service and restart it with the following command:
  ```sh
    sudo systemctl unmask snapd.service
    sudo systemctl enable snapd.service
    sudo systemctl start snapd.service
  ```
- Now you can use Snap command on WSL2.
