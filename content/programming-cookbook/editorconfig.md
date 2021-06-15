---
title: EditorConfig
showMetadata: true
editable: true
showToc: true
order: 1
---

# Example configuration
```sh
# .editorconfig

root =  true

[*]
indent_size = 2
indent_style = space
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
charset = utf-8

```

# Connect to a database server
- Use these values to connect to a database server (Postgres)
  - Host=localhost
  - Port=5432
  - Database=my-db
  - Username=postgres
  - Password=12345Abc$
- .NET connection string value: `Host=localhost;Port=5432;Database=my-db;Username=postgres;Password=12345Abc$`
