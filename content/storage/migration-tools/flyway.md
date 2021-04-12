---
title: Flyway
showMetadata: true
editable: true
showToc: true
---

# How to setup and use Flyway Gradle

- Install Java
- Install Gradle
- Create build.gradle with the following content (For an existing database)

```groovy
buildscript{
  repositories{
    jcenter()
  }

  dependencies{
    classpath 'mysql:mysql-connector-java:5.1.37'
  }
}

plugins {
  id 'org.flywaydb.flyway' version '7.7.3'
}

flyway {
  url = "jdbc:mysql://${System.env.MYSQL_HOSTNAME}/${System.env.MYSQL_DATABASE}"
  user = System.env.MYSQL_USERNAME
  password = System.env.MYSQL_PASSWORD
  locations = ['filesystem:migration']
  baselineVersion = "2021.04.09" // For using Flyway with an existing database
}

```

- We configure Flyway to connect to a database on MySQL server.
- We read connection string from environment variables, e.g. `System.env.MYSQL_HOSTNAME`
- Set locations to `migration` folder which we will store schema version files.
- Create `migration` folder as the same level as `build.gradle`
- Create some schema version files inside `migration` folder, e.g.

```
V2021.04.09__baseline.sql
V2021.04.09.1__create-table.sql
```

- File name must follow the convention `V1__Add_new_table` as in https://flywaydb.org/documentation/concepts/migrations#naming unless Flyway won't pick your schema version and apply it to a database
- For an existing database start by running

```
gradle flywayBaseline --info
```

- Note, you may need to setup some required environment variables in your script before running gradle command
  -Next, apply a migration with the following command

```
gradle flywayBaseline --info
```

- Check your database and you will find:
  - `flyway_schema_history` get created to track your schema history
  -  Change from `V2021.04.09__baseline.sql` does not applied because it's used as a baseline.
  - Change in `V2021.04.09.1__create-table.sql` has been applied to your database.

# How to compress/squash way Flyway migration?
- https://stackoverflow.com/a/33510851/1872200
