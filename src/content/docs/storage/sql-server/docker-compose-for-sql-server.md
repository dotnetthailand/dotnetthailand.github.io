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
  FROM mcr.microsoft.com/mssql/server:2019-latest
  EXPOSE 1433
  WORKDIR /app

  COPY ./entrypoint.sh ./
  COPY ./init-db.sql ./

  # https://dbafromthecold.com/2019/11/18/using-volumes-in-sql-server-2019-non-root-containers/
  USER root

  RUN chmod +x ./entrypoint.sh
  RUN mkdir -p /var/opt/mssql/data && chown mssql /var/opt/mssql/data
  RUN mkdir -p /var/opt/mssql/log && chown mssql /var/opt/mssql/log
  RUN mkdir -p /var/opt/mssql/backup && chown mssql /var/opt/mssql/backup

  USER mssql
  ENTRYPOINT ["./entrypoint.sh"]
  ```

# entrypoint.sh
- entrypoint.sh is any entry point script that will be run when we launch a container
- This fill does two things, run `init_db local function` and start a SQL server instance.
  ```sh
  #!/bin/bash
  # entrypoint.sh

  # Exit immediately if a command exits with a non-zero status.
  set -e

  # if MSSQL_SA_PASSWORD_FILE is set or has value
  # https://stackoverflow.com/a/13864829/1872200
  # https://stackoverflow.com/a/16753536/1872200

  init_db () {
    INPUT_SQL_FILE="init-db.sql"

    until /opt/mssql-tools/bin/sqlcmd -S localhost,1433 -U sa -P "$MSSQL_SA_PASSWORD" -i $INPUT_SQL_FILE > /dev/null 2>&1
    do
      # echo -e,  use -e to enable interpretation of backslash-escaped characters
      echo -e "\033[31mSQL server is unavailable - sleeping"
      sleep 1 # Sleep for a second....
    done

    echo -e "\033[31mDone initialize a database"
  }

  # Run init_db and start a SQL Server
  init_db & /opt/mssql/bin/sqlservr
  ```

# init-db.sql
- We use `init-db.sql` to store all SQL statements that will be executed after a SQL server instance is ready.
- Example content of init-db.sql:
  ```sql
  /* init-db.sql */

  CREATE DATABASE [my-db];
  USE [my-db];

  CREATE TABLE [User] (
    Id INT NOT NULL IDENTITY(1,1),
    FirstName VARCHAR(50) NOT null,
    LastName VARCHAR(50) NOT NULL,
    DateOfBirth DATETIME NOT NULL
    CONSTRAINT PK_User_Id PRIMARY KEY (Id ASC)
  );

  INSERT INTO [User] VALUES ('Jose', 'Realman', '2018-01-01');
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
      image: ${COMPOSE_PROJECT_NAME:?err}-mssql-2019
      container_name: ${COMPOSE_PROJECT_NAME:?err}_db
      ports:
        - 1433:1433
      volumes:
        - mssql_data:/var/opt/mssql/data
        - mssql_log:/var/opt/mssql/log
        - mssql_backup:/var/opt/mssql/backup

      # https://docs.docker.com/compose/compose-file/compose-file-v3/#environment
      environment:
        # List of all SQL Server environment variables:
        # https://docs.microsoft.com/en-us/sql/linux/sql-server-linux-configure-environment-variables?view=sql-server-ver15#environment-variables
        - ACCEPT_EULA=Y
        - MSSQL_PID=Express
        - MSSQL_SA_PASSWORD=12345Abc%

        - MSSQL_DATA_DIR=/var/opt/mssql/data
        - MSSQL_LOG_DIR=/var/opt/mssql/log
        - MSSQL_BACKUP_DIR=/var/opt/mssql/backup

      networks:
        - compose_network

  # Create name volumes managed by Docker to not lose data when remove a container.
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
```

# Connect to a database server
- Use these values to connect to a database server:
  - Host=localhost
  - Port=1433 (default port number, you can ignore)
  - Database=my-db
  - Username=sa
  - Password=12345Abc%
- .NET connection string value: `Server=localhost,1433; Database=my-db; User Id=sa; Password=12345Abc%;`

# Reference
- [Microsoft SQL Server on Docker Hub](https://hub.docker.com/_/microsoft-mssql-server)
- [all available tags for mssql/server](https://mcr.microsoft.com/v2/mssql/server/tags/list)

---

# Optionally, update scripts to support secret
- Defined a secret key and set value to a file in a `docker-compose.yml` file.
- Use it in a service.
- Set secret path to an `MSSQL_SA_PASSWORD_FILE` environment variable.
- Update `entrypoint.sh` to use the MSSQL_SA_PASSWORD_FILE variable.
- Example code of docker-compose.yml after setting secret:
  ```yml
  # docker-compose.yml

  # https://docs.docker.com/compose/compose-file/compose-file-v3/
  version: "3.8"

  services:
    db:
      build:
        context: .
        dockerfile: Dockerfile
      image: ${COMPOSE_PROJECT_NAME:?err}-mssql-2019
      container_name: ${COMPOSE_PROJECT_NAME:?err}_db
      ports:
        - 1433:1433
      volumes:
        - mssql_data:/var/opt/mssql/data
        - mssql_log:/var/opt/mssql/log
        - mssql_backup:/var/opt/mssql/backup

      # https://docs.docker.com/compose/compose-file/compose-file-v3/#environment
      environment:
        # List of all SQL Server environment variables:
        # https://docs.microsoft.com/en-us/sql/linux/sql-server-linux-configure-environment-variables?view=sql-server-ver15#environment-variables
        - ACCEPT_EULA=Y
        - MSSQL_PID=Express
        # We don't use MSSQL_SA_PASSWORD here because we will get a password from "MSSQL_SA_PASSWORD_FILE" in entrypoint.sh
        - MSSQL_SA_PASSWORD_FILE=/run/secrets/sa_password
        - MSSQL_DATA_DIR=/var/opt/mssql/data
        - MSSQL_LOG_DIR=/var/opt/mssql/log
        - MSSQL_BACKUP_DIR=/var/opt/mssql/backup

      networks:
        - compose_network

      # Use the defined secret
      secrets:
        - sa_password

  # Create name volumes managed by Docker to not lose data when remove a container
  # https://docs.docker.com/compose/compose-file/compose-file-v3/#volumes
  volumes:
    mssql_data:
    mssql_log:
    mssql_backup:

  networks:
    compose_network:

  # Define a secret at top level
  # External secrets are not available to containers created by docker-compose.
  secrets:
    sa_password:
      file: ./sa_password.secret # Add this file in .gitignore to ignore from a repository.
  ```
  - Example code of entrypoint.sh after setting secret:
  ```sh
  #!/bin/bash
  # entrypoint.sh

  # Exit immediately if a command exits with a non-zero status.
  set -e

  # if MSSQL_SA_PASSWORD_FILE is set or has value
  # https://stackoverflow.com/a/13864829/1872200
  # https://stackoverflow.com/a/16753536/1872200

  if [ ! -z ${MSSQL_SA_PASSWORD_FILE+x} ]
  then
    SA_PASSWORD=$(cat ${MSSQL_SA_PASSWORD_FILE})
  else
    SA_PASSWORD=${MSSQL_SA_PASSWORD}
  fi

  init_db () {
    INPUT_SQL_FILE="init-db.sql"

    until /opt/mssql-tools/bin/sqlcmd -S localhost,1433 -U sa -P "$SA_PASSWORD" -i $INPUT_SQL_FILE > /dev/null 2>&1
    do
      echo -e "\033[31mSQL server is unavailable - sleeping"
      sleep 1 # Sleep for a second....
    done

    echo -e "\033[31mDone initialize a database"
  }

  # Run init_db and start a SQL Server
  init_db & /opt/mssql/bin/sqlservr
  ```
