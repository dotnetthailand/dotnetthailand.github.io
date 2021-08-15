---
title: Docker compose for MySQL
showMetadata: true
editable: true
showToc: true
---

# Files structure
- List all files in this example.

```shell
config/
- lower-case-table-names.cnf
init/
- init-database.sql
- set-database-permission.sql
.env
docker-compose.yml

```

# docker-compose.yml
- Use MySQL latest version image with tag '8.0.26'
- Create additional database user
- Create docker secret files to be used for database passwords
- Configure health checking
- Use name volumes to not loss data when remove container
- Use initialize database script
- Use custom configuration to use lower case table name
- Use commands to set database character
- Create a bridge network name that can used by other containers
  This can be useful when using `docker run` to launch a container and attach a compose network.

```YAML
version: '3.8'

services:
  mysql-server:
    container_name: mysql-server
    image: mysql:8.0.26
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD_FILE: "/run/secrets/mysql_root_password"
      # Set permission of this user in "set-database-permission.sql"
      MYSQL_USER: my-user
      MYSQL_PASSWORD_FILE: "/run/secrets/mysql_password"
      MYSQL_DATABASE: my-database

    ports:
      - 3306:3306
    secrets:
      - mysql_root_password
      - mysql_password
    healthcheck:
      test: mysqladmin ping -h localhost -u $$MYSQL_USER --password=$$(cat /run/secrets/mysql_password)
      timeout: 10s
      retries: 10
    volumes:
      # Use name volumes, managed by Docker for local development
      - mysql-data:/var/lib/mysql
      - mysql-logs:/var/log/mysql

      # Map all files in init folder as initialize database files
      - ./init:/docker-entrypoint-initdb.d

      # Using a custom MySQL configuration file
      - ./config:/etc/mysql/conf.d
    command:
      [
        --character-set-server=utf8mb4,
        --collation-server=utf8mb4_unicode_ci,
      ]
    networks:
      - compose_network

# https://serverfault.com/questions/871090/how-to-use-docker-secrets-without-a-swarm-cluster
secrets:
  mysql_root_password:
    file: ./mysql_root_password.txt
  mysql_password:
    file: ./mysql_password.txt

# https://docs.docker.com/compose/compose-file/compose-file-v3/#external-1
volumes:
  mysql-data:
  mysql-logs:

# https://docs.docker.com/compose/compose-file/compose-file-v3/#network-configuration-reference
# Full document https://docs.docker.com/compose/networking/
networks:
  compose_network:
```

# docker secrets
- Create docker secret files to be used for database passwords

```shell
echo "MySQL1234\!" > mysql_root_password.txt
echo "pa\$\$w@rd"  > mysql_password.txt
```

# lower-case-table-names.cnf
- Use lower case table name to prevent case sensitive problem on a Linux machine.
- More details https://stackoverflow.com/a/6134059/1872200.
- Server Command Options https://stackoverflow.com/a/15453913/1872200
- Alternatively, you can use command: [ --lower_case_table_names=1 ] in docker-compose.yml.

```
[mysqld]
lower_case_table_names=1

```

# init-database.sql
- Create a new table.
- Insert some data.

```SQL
USE `my-database`;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(50) NOT null,
  last_name VARCHAR(50) NOT NULL,
  date_of_birth DATETIME NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO users VALUES (NULL, 'Jose', 'Realman', '2018-01-01');

```

# set-database-permission.sql
- Grant all permissions of database 'my-database' to user 'my-user' on a localhost server.
- The user is created by defining in docker-compose.yml.

```SQL
-- set-database-permission.sql
USE mysql;

GRANT ALL PRIVILEGES ON `my-database`.* TO 'my-user'@'%';

```

- If you want to create a user manually, use the following command.
```SQL
  CREATE USER 'my-user'@'localhost' IDENTIFIED BY 'the_secure_password';

```

# .env
- Explicit prefix volume/network name with this value or use -P with docker run
- More details https://docs.docker.com/compose/reference/envvars/#compose_project_name

```Shell
COMPOSE_PROJECT_NAME = my_project

```

# Useful resources
- [My SQL Docker image on Docker hub](https://hub.docker.com/_/mysql )
- [Manage sensitive data with Docker secrets](https://serverfault.com/questions/871090/how-to-use-docker-secrets-without-a-swarm-cluster)
- [What is the difference between utf8mb4 and utf8 charsets in MySQL?](https://stackoverflow.com/a/30074553/1872200)
