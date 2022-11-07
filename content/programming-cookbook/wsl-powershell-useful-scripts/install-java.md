---
title: Install Java on WSL2
showMetadata: true
editable: true
showToc: true
---

# Install a default version for current Ubuntu WSL2
- Execute the following commands to install default Java:
  ```sh
    sudo apt update
    sudo apt search jdk
    sudo apt install default-jdk
  ```
- Alternatively, if you want to install a specific version, sepecify a package as the following command:
  ```sh
    sudo apt install openjdk-8-jdk
  ```

# Set Java home
- Edit .bashrc file to export JAVA_HOME variable:
  ```sh
    sudo vi ~/.bashrc
    export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
  ```
- Open a new terminal session and verify if we have set Java home correclty
  ```sh
    java --version
  ```

# Install Gradle for building Java project
- Download Gradle to `/tmp` folder:
  ```sh
    wget https://services.gradle.org/distributions/gradle-7.3.3-bin.zip -P /tmp
  ```
- Extract zip file to `/opt/gradle`:
  ```sh
    sudo apt install unzip
    sudo unzip -d /opt/gradle /tmp/gradle-*.zip
  ```
  - Verify Gradle files
  ```sh
    ls /opt/gradle/gradle-7.3.3/
  ```
- You should see some Gradle files.
- Set up environment variable by creating gradle.sh:
  ```sh
    sudo vi /etc/profile.d/gradle.sh
  ```
- Add the follwing content to gradle.sh
  ```sh
    # /etc/profile.d/gradle.sh
    export GRADLE_HOME=/opt/gradle/gradle-7.3.3
    export PATH=${GRADLE_HOME}/bin:${PATH}
  ```
- Make the script executable:
  ```sh
    sudo chmod +x /etc/profile.d/gradle.sh
  ```
- Load the environment variable
  ```sh
    source /etc/profile.d/gradle.sh
  ```
- Verify if Gradle has been installed successfully:
  ```sh
    gradle -v
  ```

# Install extensions for VS Code
- [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)
- [Gradle for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-gradle)

# Credit & Useful links
- https://linuxize.com/post/install-java-on-ubuntu-18-04/
- https://linuxize.com/post/how-to-install-gradle-on-ubuntu-18-04/
- https://itsfoss.com/set-java-home-ubuntu/

