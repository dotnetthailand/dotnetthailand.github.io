---
title: Atlas API
showMetadata: true
editable: true
showToc: true
---

# Requirement
- [Public and Private of API Keys](https://www.mongodb.com/docs/atlas/configure-api-access/)
- [cURL command tools](https://curl.se/download.html)

# Creating MongoDB Atlas Cluster
```shell
curl -s -u "{ATLAS_PUBLIC_API}:{ATLAS_PRIVATE_API}"  \
        --digest --header 'Content-Type: application/json' \
        --request POST "https://cloud.mongodb.com/api/atlas/v1.0/groups/{project_id}/clusters/?pretty=true" \
    --data '{
            "autoScaling": 
            {
                "compute": 
                {
                    "enabled": false,
                    "scaleDownEnabled": false
                },
                "diskGBEnabled": false
            },
            "backupEnabled": false,
            "clusterType": "REPLICASET",
            "diskSizeGB": 10,
            "labels": [
                {
                    "key": "env",
                    "value": "dev"
                }
            ],
            "mongoDBMajorVersion": "4.2",
            "name": "cluster01",
            "providerSettings": 
            {
                "providerName": "AWS",
                "instanceSizeName": "M10"
            },
            "replicationSpecs": [
                {
                    "numShards": 1,
                    "regionsConfig": 
                    {
                        "AP_SOUTHEAST_1": 
                        {
                            "analyticsNodes": 0,
                            "electableNodes": 3,
                            "priority": 7,
                            "readOnlyNodes": 0
                        }
                    },
                    "zoneName": "Zone 1"
                }
            ]
        }'
```

# Deleting MongoDB Atlas Cluster
```shell
curl -s -u "{ATLAS_PUBLIC_API}:{ATLAS_PRIVATE_API}"  \
        --digest --header 'Content-Type: application/json' \
        --request DELETE "https://cloud.mongodb.com/api/atlas/v1.0/groups/{project_id}/clusters/?pretty=true"
```