---
title: dbup-cli
showMetadata: true
editable: true
showToc: true
---

# How to setup and use DbUp Command Line Interface (dbup-cli)

- Install .NET

```
sudo apt-get update; \
  sudo apt-get install -y apt-transport-https && \
  sudo apt-get update && \
  sudo apt-get install -y dotnet-sdk-5.0
```

- Install dbup-cli as a global tool

```
dotnet tool install --global dbup-cli
```

- Check if you install dbup-cli properly

```
dbup --version
```

- Initialize dbup-cli

```
dbup init
```

- dbup.yml is created in the current working directory.

- Edit content of dbup.yml, eg. connection string, folder to put migration files

```yaml
dbUp:
  version: 1
  provider: mysql
  connectionString: Server=$MYSQL_HOSTNAME$;Database=$MYSQL_DATABASE$;Uid=$MYSQL_USERNAME$;Pwd=$MYSQL_PASSWORD$;
  connectionTimeoutSec: 30
  scripts:
    - folder: migration
```

- This configuration make dbpub to connect a database on to MySQL server.
- We pass a connection string value as Environment variable e.g. `$MYSQL_HOSTNAME$`
- Use set `migration` folder to store our schema version files

- Create `migration` folder same level as `dbpub.yml`
- Create some database migration file in `migration` folder as SQL script, e.g.

```
2021-01-01 init-database.sql
2021-01-02 create-.sql
```

- Schema versions will be applied in order by name alphabetically.

- Run schema version files to make some change to your database.

```
dbup upgrade
```

- Check your database to see if there is some change from a schema version file and you should find `SchemaVersions` table that stores an information of a version file that has already been applied to your database.

# Useful links
- dbup-cli project https://github.com/drwatson1/dbup-cli

