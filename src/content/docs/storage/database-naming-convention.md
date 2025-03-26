---
title: Database naming convention
showMetadata: true
editable: true
---

# Using plural or singular table name

## Using plural name

- A table is a collection of entity and it is logical to use plural name for a table.
- It makes sense to write SQL statement to get all records from your table, e.g. `select * from customers`

## Using singular name

- Use singular table name when pointing to a database record is more natural than plural name. e.g.
  `select customer.name` and `select customers.name`
  - For plural table name, you can use table alias e.g. `select customer.name from customers as customer`.
- It avoids confusion of English pluralization:
  - activity becomes activities
  - person becomes people
  - data remains data
  - history remains history (uncountable noun, only singular form)
- It avoids confusion when use a link table.
  - Orders and Products tables would give OrderProducts or OrdersProducts. Neither sounds correct.
- When using singular, you can consider using the set theory to a table.
  It means any instance in the set is representative of the set.
- Table represents a collection of entity. Then we don't need to emphasize it by plural naming.
- Consistent foreign key column's name with table prefix pattern e.g. `customer_id` not `customers_id`.
- If you want to identify a collection in an application, you can use a plural name such as `customers`.
- For ORM e.g. Enitiy Framwork (EF), you can access an entity as `dbContext.DbSet<Customer>` which is consistent with a singular table name.

## Which one should I use?

- I personally prefer singular table name.
- Be consistent naming in matter of plural or singular table name you choose.

## Credit/Sources

- https://medium.com/@fbnlsr/the-table-naming-dilemma-singular-vs-plural-dc260d90aaff
- https://dba.stackexchange.com/questions/13730/plural-vs-singular-table-name
- https://www.databasestar.com/database-table-naming-conventions/
