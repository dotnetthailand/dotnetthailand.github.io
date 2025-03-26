---
title: dbup-cli
showMetadata: true
editable: true
showToc: true
---

# How to setup and use DbUp Command Line Interface (dbup-cli)

# Setup dbup-cli
- Here is for Ubuntu 18.04. For other OS, please check https://docs.microsoft.com/en-us/dotnet/core/install/.
- Add package repository.
```
wget https://packages.microsoft.com/config/ubuntu/18.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
```

- Install .NET
```
sudo apt-get update; \
  sudo apt-get install -y apt-transport-https && \
  sudo apt-get update && \
  sudo apt-get install -y dotnet-sdk-5.0
```

- Install dbup-cli as a global tool.
```
dotnet tool install --global dbup-cli
```

- Check if you install dbup-cli properly.
```
dbup --version
```
# Initialize dbup
- Create a new folder with name `migration`.
- CD to `migration` folder.
- Run the following command to initialize dbup-cli.
```
dbup init
```
- dbup.yml is created in the current working directory (migration folder).
- Example of current file structure.
```
migration/
- dbup.yml
```

# Update dbup configuration file
- Edit content of dbup.yml, eg. connection string, folder to put schema version files.
```yaml
# dbup.yml
dbUp:
  version: 1
  provider: mysql
  connectionString: Server=$MYSQL_HOSTNAME$;Database=$MYSQL_DATABASE$;Uid=$MYSQL_USERNAME$;Pwd=$MYSQL_PASSWORD$;
  connectionTimeoutSec: 30
  scripts:
    - folder: schema-versions
      filter: /^(?!_)[\w\s\-\.]+\.sql$/
      # To use Regular Expression, you must surround the filter by forward-slashes.
      # Explain the Regex pattern:
      # Match a string that does not start with _ (negative look ahead)
      # then match a-z, A-Z, 0-9, _, space, - and . as a file name
      # then match a string ending with .sql as a file extension.
```
- This configuration makes dbpub to connect to a database on MySQL server.
- We pass a connection string values as an environment variables e.g. `$MYSQL_HOSTNAME$`, `MYSQL_DATABASE`.
- We use `schema-versions` folder to store our schema version files.

# Create a schema version file
- Create `schema-versions` folder in the same level as `dbpub.yml`.
- Create some schema version files which container raw SQL statement in `schema-versions` folder.
- Here is the example of file structure.
```sh
migration/
  - schema-versions/
    - _baseline.sql
    - _seed-data.sql
    - 2021-01-02 create-user-table.sql
  - dbup.yml
```

# Apply a schema version to a database
- Run the following command to make some changes to your database.
```
dbup upgrade
```
- Please not that our current working directory is `migration` folder.
  Therefore dbup will look for `dbup.yml` and schema version files inside `migration` folder.
- Schema versions will be applied in order by name alphabetically.
- A schema file name starting with `_` will be ignored.
- Check your database to see if there is some changes from a schema version file and you should find `SchemaVersions` table that stores an information of a version file that has already been applied to your database.
- If there is no schema version file to be applied, dbup won't create `SchemaVersions` table.

# Schema version as a plain SQL file
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
