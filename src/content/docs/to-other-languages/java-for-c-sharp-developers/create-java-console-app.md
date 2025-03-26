---
title: Create Java console app
showMetadata: true
editable: true
showToc: true
order: 0
---

# Install Java, Gradle on WSL2 (Ubuntu) and VS Code extensions
- You can skip this section if you have already setup Java development environment.
- Follow [this document](/programming-cookbook/wsl-powershell-useful-scripts/install-java) to install Java, Gradle build tool
  and VS Code extensions.

# Create a new Java console app with Gradle
- Open a terminal and execute the following commands to reate a project folder:
  ```sh
    mkdir demo
    cd demo
  ```
- Init Java project with Gradle
```sh
  gradle init
```
- Then select the following options and press enter to create a new Java application project.
  ```sh
    Select type of project to generate:
      1: basic
      2: application
      3: library
      4: Gradle plugin
    Enter selection (default: basic) [1..4] 2

    Select implementation language:
      1: C++
      2: Groovy
      3: Java
      4: Kotlin
      5: Scala
      6: Swift
    Enter selection (default: Java) [1..6] 3

    Split functionality across multiple subprojects?:
      1: no - only one application project
      2: yes - application and library projects
    Enter selection (default: no - only one application project) [1..2] 1

    Select build script DSL:
      1: Groovy
      2: Kotlin
    Enter selection (default: Groovy) [1..2] 1

    Generate build using new APIs and behavior (some features may change in the next minor release)? (default: no) [yes, no]

    Select test framework:
      1: JUnit 4
      2: TestNG
      3: Spock
      4: JUnit Jupiter
    Enter selection (default: JUnit Jupiter) [1..4] 3

    Project name (default: demo):
    Source package (default: demo):
  ```
- The `init` task generates the project with the following structure:
  ```sh
    tree .
    ├── app
    │   ├── build.gradle
    │   └── src
    │       ├── main
    │       │   ├── java
    │       │   │   └── demo
    │       │   │       └── App.java
    │       │   └── resources
    │       └── test
    │           ├── groovy
    │           │   └── demo
    │           │       └── AppTest.groovy
    │           └── resources
    ├── gradle
    │   └── wrapper
    │       ├── gradle-wrapper.jar
    │       └── gradle-wrapper.properties
    ├── gradlew
    ├── gradlew.bat
    └── settings.gradle
  ```

# Run Java console app
- Execute the following comand to run the console app
  ```
    ./gradlew run
  ```
- You will find `Hello World!` message in a terminal as following:
  ```sh
    > Task :app:run
    Hello World!

    BUILD SUCCESSFUL
    2 actionable tasks: 2 executed
  ```
# Run a unit test case
- Execute the following comand to run a unit test case
  ```sh
    ./gradlew test
  ```

# Credit & Useful link
- https://docs.gradle.org/current/samples/sample_building_java_applications.html
- https://stackoverflow.com/questions/3963708/gradle-how-to-display-test-results-in-the-console-in-real-time/36130467#36130467
