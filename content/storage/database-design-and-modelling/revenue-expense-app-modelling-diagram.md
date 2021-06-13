# Revenue/Expense App modelling diagram 

## Table per hierarchy (TPH)
- Transaction table represent table per hierarchy which contains two types: 
  Transaction and CalculatedAmountTransaction which derives from Transaction

## ER diagram


```mermaid

erDiagram

  Transaction {
    int Id
    varchar Discriminator
    nvarchar Type
    int CategoryId
    DateTime CreatedUtcDate
    nvarchar UnitName
    decimal NumberOfUnit
    decimal PricePerUnit
    decimal Amount
    int TagId
  }

  Transaction ||--o{ AttachedFile : contains
  AttachedFile {
    int Id
    int TransactionId
    string Url
  } 

  Transaction }|--|| Category: has
  Category{
    int Id
    string Name
  }

  Transaction }o--o| Tag: has
  Tag {
    int Id
    string Name
  }
```

## Class diagram

```mermaid

classDiagram

  class Transaction {
    +int Id
    +TransactionType Type
    +TransactionCategory Category
    +DateTime CreatedUtcDate
    +decimal Amount
    +string Note
  }

  class CalculatedAmountTransaction {
    +UnitName UnitName
    +decimal NumberOfUnit
    +decimal PricePerUnit
    +decimal Amount
  }

  class TransactionType {
    << enumeration >>
    Revenue
    Expense
  }


  class UnitName {
    << enumeration >>
    Kilogram
  }


  class TransactionCategory {
    +int Id
    +string Name
  }

  class Tag {
    +int Id
    +string Name
  }

  Transaction <|-- CalculatedAmountTransaction
  Transaction --> "1" TransactionType
  Transaction --> "1" TransactionCategory
  Transaction --> "0..1" Tag

  CalculatedAmountTransaction --> "1" UnitName

```

# Questions
- Should I rename Tag to LogicalGroup?
- Is it okay to create TransactionType and TransactionCategory to enumeration? 
