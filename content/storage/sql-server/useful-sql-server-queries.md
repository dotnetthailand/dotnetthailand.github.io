---
title: Useful SQL Server queries
showMetadata: true
editable: true
showToc: true
---

# Drop all tables from a database

```sql
USE [database-name]
GO

-- Disable all referential integrity constraints
EXEC sp_MSforeachtable 'ALTER TABLE ? NOCHECK CONSTRAINT ALL'
GO

-- Drop all tables
EXEC sp_MSforeachtable 'DROP TABLE ?'
GO
```
- *Note!!!* If your database does not have `sp_MSforeachtable` stored proc, you can use [this script](https://gist.github.com/metaskills/893599) to create it.


