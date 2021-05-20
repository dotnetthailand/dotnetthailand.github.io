---
title: Automate Backup database SQL Server in docker container
showMetadata: true
editable: true
showToc: true
---

Hi, everyone. This is first my post in dev.to and my first time for write article in second language. today I want to share some trick for backup your database from docker container. let's begin...

**Note:** I assume your already running container. 

### 1. Write T-SQL for backup your database.
For example I use TutorialDB database for demonstrate purpose. Your can create same database click [Create a database](https://docs.microsoft.com/en-us/sql/azure-data-studio/quickstart-sql-server?view=sql-server-ver15#create-a-database)
```sql
PRINT "Start Backup process...";
DECLARE @MyFileName varchar(200)
SELECT @MyFileName=N'/tmp/Backup_' + convert(nvarchar(20),GetDate(),112)+'_'+convert(nvarchar(20),GetDate(),108)+ '.bak'
BACKUP DATABASE [TutorialDB] TO DISK=@MyFileName
PRINT "Finished backup process...";
```
Then save above T-SQL to backup-database.sql

### 2. Copy backup-database.sql file to your container.
For example I just copy it to tmp directory. You can copy it to any your directory.
```
docker cp ./backup-database.sql example-database:/tmp
```
<!-- ![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nwiuc0jggck83goacj1u.png) -->
Then go inside container by cli as below.
```
docker exec -it example-database /bin/bash
$ ls -lh /tmp
```

Then see in tmp directory as below.

![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tw5e3z8anxenfrs62tzw.png)

### 3. Update packages list to new version.
Go inside your container by docker exec cli as below. 
```docker
docker exec -it --user root example-database /bin/bash
```

![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/27l83eru4ept5gmu5cfl.png) 

**Note:** You need to use --user root (option) for update package list. Next, update package list by apt-get update -y as below.

![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/n5zisiqcobmgvzat2y41.png) 

Then you will installing 2 package such as vim and cron as below.

![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/u67zj8nurlnvl0hnrjku.png)

![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/s2mmleibq9yok9i8a8gl.png)

### 4. Add sqlcmd cli to crontab by cron -e cli as below.
![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/leod92unp5vtvhi0k8zz.png)

For example above configuration is running backup-database.sql every 1 minute. Keep in mind it's just example for show how it work. Next you want to restart crontab for start your schedule job like this

![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xtuk50cojg5apimviz7c.png)

### 5. See log by tail -f /tmp/daily-backup.log & .bak files.
![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6sgtut8xpcfvvh3101gu.png)

![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qbagw2p288kyzsbsf50e.png)

**_Until we meet again. Thank you_**