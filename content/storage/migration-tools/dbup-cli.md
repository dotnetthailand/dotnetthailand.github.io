---
title: dbup-cli
showMetadata: true
editable: true
showToc: true
---

# How to setup and use DbUp Command Line Interface (dbup-cli)

# Setup dbup-cli
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
      filter: "^(?!_)[\w-]+\.sql$"
      # Explain ^(?!_)[\w-]+\.sql$ pattern
      # Match a string that does not start with _
      # then match a-z, A-Z, 0-9, _ or - as a file name
      # then match ending with .sql as a file extension.

```

- This configuration make dbpub to connect a database on to MySQL server.
- We pass a connection string value as Environment variable e.g. `$MYSQL_HOSTNAME$`
- Use set `migration` folder to store our schema version files

- Create `migration` folder same level as `dbpub.yml`
- Create some database migration file in `migration` folder as SQL script, e.g.

```
_baseline.sql
_seed-data.sql
2021-01-02 create-user-table.sql
```

# Apply a schema version to a database

- Run the following command to make some changes to your database.
```
dbup upgrade
```
- Schema versions will be applied in order by name alphabetically.
- A schema file name starting with _ will be ignored.
- Check your database to see if there is some changes from a schema version file and you should find `SchemaVersions` table that stores an information of a version file that has already been applied to your database.

# Schema version as plain SQL file

- สร้าง schema version แบบ SQL file ตรงนี้อาจจะไม่ portable เพราะมี specific database vendors
  แต่เจอ use case น้อยมากที่จะเปลี่ยน database ในภายหลัง
- ต้องการเพียง plain SQL schema version ไม่ต้องการ class หรือ script file สำหรับแต่ละ shema version เพิ่มเข้ามาด้วย
  - Liquibase SQL ยังต้องใช้ XML change log file https://www.liquibase.org/blog/plain-sql
  - Sequelize migration ยังต้องใช้ JavaScript file (ที่สามารถปรับให้อ่านจาก SQL file ได้) https://stackoverflow.com/a/51958893/1872200
- เชื่อว่า Schema version ไม่จำเป็นต้องมี downgrade
  - เพราะหากออกแบบให้ schema backward compatible กับ older version of an application
    เราก็สามารถ rollback application ให้ทำงานต่อได้ และ investigate ปัญหา
    ดังนั้น schema version downgrade/rollback ใน production database จึงไม่จำเป็น
  - แต่ก็เห็นด้วยที่การ downgrade มีประโยชน์ตอน development
    แต่ตรงนี้เรา run SQL statement เพื่อลบ schema version record ที่ได้ apply ไปแล้วก็ไม่ได้แย่
  - อ่านเพิ่มเติม https://flywaydb.org/documentation/command/undo#important-notes

# Useful links

- dbup-cli project https://github.com/drwatson1/dbup-cli
