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


# Search text in all tables and columns

```sql
DECLARE @SearchStr nvarchar(100) = 'searched-text'
DECLARE @Results TABLE (ColumnName nvarchar(370),
    ColumnValue nvarchar(3630))

SET NOCOUNT ON

DECLARE @TableName nvarchar(256), @ColumnName nvarchar(128), @SearchStr2 nvarchar(110)
SET  @TableName = ''
SET @SearchStr2 = QUOTENAME('%' + @SearchStr + '%','''')

WHILE @TableName IS NOT NULL
BEGIN
    SET @ColumnName = ''
    SET @TableName =
    (
        SELECT MIN(QUOTENAME(TABLE_SCHEMA) + '.' + QUOTENAME(TABLE_NAME))
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_TYPE = 'BASE TABLE'
        AND QUOTENAME(TABLE_SCHEMA) + '.' + QUOTENAME(TABLE_NAME) > @TableName
        AND OBJECTPROPERTY(OBJECT_ID(QUOTENAME(TABLE_SCHEMA) + '.' + QUOTENAME(TABLE_NAME)), 'IsMSShipped') = 0
    )
    WHILE (@TableName IS NOT NULL) AND (@ColumnName IS NOT NULL)

    BEGIN
        SET @ColumnName =
        (
        SELECT MIN(QUOTENAME(COLUMN_NAME))
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = PARSENAME(@TableName, 2)
            AND TABLE_NAME = PARSENAME(@TableName, 1)
            AND DATA_TYPE IN ('char', 'varchar', 'nchar', 'nvarchar', 'int', 'decimal')
            AND QUOTENAME(COLUMN_NAME) > @ColumnName
        )
        IF @ColumnName IS NOT NULL
        BEGIN
            INSERT INTO @Results
            EXEC
            (
                'SELECT ''' + @TableName + '.' + @ColumnName + ''', LEFT(' + @ColumnName + ', 3630) ' +
                'FROM ' + @TableName + ' (NOLOCK) ' +
                'WHERE ' + @ColumnName + ' LIKE ' + @SearchStr2
            )
        END
    END
END

SELECT ColumnName, ColumnValue
FROM @Results
```
