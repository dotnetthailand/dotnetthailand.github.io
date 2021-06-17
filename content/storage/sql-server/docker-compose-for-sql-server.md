---
title: Docker compose for SQL Server
showMetadata: true
editable: true
---

To use SQL Server Docker compose, we need to create required files and add contents to them.
- Dockerfile, a custom docker image
- entrypoint.sh
- initialize.sh and init-db.sql for initializing a database
- docker-compose.yml
- .env file

# Dockerfile
- SQL Server for Linux image does not have built in database initialization like MySQL or Postgres. Therefore, we need to create a custom image.
- We use an existing `mcr.microsoft.com/mssql/server:2019-CU11-ubuntu-18.04` image as a based image.
- Example content of `Dockerfile`
```sh
# Dockerfile

# https://hub.docker.com/_/microsoft-mssql-server
FROM mcr.microsoft.com/mssql/server:2019-CU11-ubuntu-18.04
EXPOSE 1433
WORKDIR /app

COPY ./entrypoint.sh ./
COPY ./initialize.sh ./
COPY ./init-db.sql ./

USER root
RUN chmod +x ./entrypoint.sh
RUN chmod +x ./initialize.sh

ENTRYPOINT ["./entrypoint.sh"]

```

# entrypoint.sh
- entrypoint.sh is any entry point script that will be run when we launch a container
- This fill does two things, run `initialize.sh` script and start a SQL server instance.
```sh
#!/bin/bash
# entrypoint.sh

# Exit immediately if a command exits with a non-zero status.
set -e

# Run initialize.sh and start SQL Server
 ./initialize.sh & /opt/mssql/bin/sqlservr
 ```

# initialize.sh and init-db.sql
- `initialize.sh` is a Bash script that runs sqlcmd Utility and use `init-db.sql` as a file input.
- Example content of initialize.sh
```sh
#!/bin/bash
# initialize.sh

# How to connect to SQL Server:
# https://docs.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker?view=sql-server-ver15&pivots=cs1-bash#connect-to-sql-server
# sqlcmd Utility options: https://docs.microsoft.com/en-us/sql/tools/sqlcmd-utility?view=sql-server-ver15#syntax

INPUT_SQL_FILE="init-db.sql"
until /opt/mssql-tools/bin/sqlcmd -S localhost,1433 -U sa -P "$MSSQL_SA_PASSWORD" -i $INPUT_SQL_FILE > /dev/null 2>&1
do
  echo -e "\033[31mSQL server is unavailable - sleeping"
  sleep 1 # Sleep in a second
done

echo -e "\033[31mDone initialize a database"

```

- We use `init-db.sql` to store all SQL statements that will be executed after a SQL server instance is ready.
- Example content of init-db.sql:
```sql
-- init-db.sql
CREATE DATABASE my-db;

```

# docker-compose.yml
- Example content of docker-compose.yml
```yml
# docker-compose.yml

# https://docs.docker.com/compose/compose-file/compose-file-v3/
version: "3.8"

services:

  db:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: ${COMPOSE_PROJECT_NAME:?err}_db
    ports:
      - 1433:1433
    volumes:
      - mssql_data:/var/opt/mssql/data
      - mssql_log:/var/opt/mssql/log
      - mssql_backup:/var/opt/mssql/backup

    # https://docs.docker.com/compose/compose-file/compose-file-v3/#environment
    environment:
      # List of SQL Server environment variables
      # https://docs.microsoft.com/en-us/sql/linux/sql-server-linux-configure-environment-variables?view=sql-server-ver15#environment-variables
      - ACCEPT_EULA=Y
      - MSSQL_PID=Express
      - MSSQL_SA_PASSWORD=12345Abc$$ # Escape $ with $$

      - MSSQL_DATA_DIR=/var/opt/mssql/data
      - MSSQL_LOG_DIR=/var/opt/mssql/log
      - MSSQL_BACKUP_DIR=/var/opt/mssql/backup
      - MSSQL_COLLATION=Thai_CI_AS

    networks:
      - compose_network

# Create name volumes managed by Docker to not lose data when remove a container
# https://docs.docker.com/compose/compose-file/compose-file-v3/#volumes
volumes:
  mssql_data:
  mssql_log:
  mssql_backup:

networks:
  compose_network:

```
- We set `MSSQL_PID=Express` to configure SQL Server to Express edition.

# .env file
- We can control prefix of our volumes/networks by specific a value of COMPOSE_PROJECT_NAME
- Example content of .env file
```sh
# .env

# https://docs.docker.com/compose/reference/envvars/#compose_project_name
# Explicitly set volume's prefix or use -P with a docker run command.
COMPOSE_PROJECT_NAME=sql_server_compose

```

# File structure of our SQL server Docker compose
```sh
tree . -a
.
├── .env
├── Dockerfile
├── docker-compose.yml
├── entrypoint.sh
├── init-db.sql
└── initialize.sh
```

# Connect to a database server
- Use these values to connect to a database server:
  - Host=localhost
  - Port=1433 (default port number, you can ignore)
  - Database=my-db
  - Username=sa
  - Password=12345Abc$
- .NET connection string value: `Server=localhost,1433; Database=my-db; User Id=sa; Password=12345Abc$;`
