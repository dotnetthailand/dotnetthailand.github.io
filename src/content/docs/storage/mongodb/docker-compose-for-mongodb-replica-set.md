---
title: Docker compose for Replica Set
showMetadata: true
editable: true
showToc: true
---


# Files structure

- List all files in this example.

```shell
startdb.sh
startdb.ps1
rs-init.sh
docker-compose.yml
```

# startdb.sh for Linux / Mac
```shell
#!/bin/bash

docker-compose up -d

sleep 100

docker exec mongo1 /scripts/rs-init.sh
```

# startdb.ps1 for using powershell core

```shell
docker-compose up -d

sleep 100

docker exec mongo1 /scripts/rs-init.sh
```

# rs-intl.sh

```Shell
#!/bin/bash

mongo <<EOF
var config = {
    "_id": "dbrs",
    "version": 1,
    "members": [
        {
            "_id": 1,
            "host": "mongo1:27017",
            "priority": 3
        },
        {
            "_id": 2,
            "host": "mongo2:27017",
            "priority": 2
        },
        {
            "_id": 3,
            "host": "mongo3:27017",
            "priority": 1
        }
    ]
};
rs.initiate(config, { force: true });
rs.status();
EOF
```

# docker-compose.yml

```YAML
version: '3.8'

services:
  mongo1:
    image: mongo
    container_name:mongo1
    restart: always
    link:
      - mongo2
      - mongo3
    volumes:
      - ./data1:/data/db
      - ./rs-init.sh:/scripts/rs-init.sh
    ports:
      - 27021:27017
    networks:
      - mongo-network
    entrypoint: [ "/usr/bin/mongod", "--bind_ip_all", "--replSet", "dbrs" ]
  mongo2:
    image: mongo
    container_name:mongo1
    restart: always
    volumes:
      - ./data2:/data/db
    ports:
      - 27022:27017
    networks:
      - mongo-network
    entrypoint: [ "/usr/bin/mongod", "--bind_ip_all", "--replSet", "dbrs" ]
  mongo3:
    image: mongo
    container_name:mongo1
    restart: always
    volumes:
      - ./data3:/data/db
    ports:
      - 27023:27017
    networks:
      - mongo-network
    entrypoint: [ "/usr/bin/mongod", "--bind_ip_all", "--replSet", "dbrs" ]

networks:
  mongors-network:
    driver: bridge
```

# Useful resources
- [Docker compose for replica set](https://blog.tericcabrel.com/mongodb-replica-set-docker-compose/)
- [Sample Dataset](https://www.mongodb.com/docs/atlas/sample-data/)