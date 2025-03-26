---
title: Data Types in F#
showMetadata: true
editable: true
showToc: true
order: 3
---

In chapter 1, I have shown some mapping between C# data types and F# data types. In this chapter, I will introduce F#'s exotic data types and values. Some types may look scary or hurt your head for the very first time usages, but they'll be a wonderful gift once you can grasp their concept. 😆

# Type Alias #

This is what I really wish to have in C# language but I always wonder why it's never happened.. In C# we can do type alias on file scope basis. If you ever write a thing like this..

```csharp
using System;
using PersonAddressDictionary = System.Collections.Generic.Dictionary<string,MyProgram.Address>;

namespace MyProgram {
    public static class Program {
        PersonAddressDictionary personDict = new();  // C# 9 syntax
    }
}
```

Problem is you need that long line on every C# file that uses the same type.  In F#, it has type alias 💖!

```fsharp
open System

module MyProgram

type PersonAddressDictionary = System.Collections.Generic.Dictionary<string,Address>

let personDict = PersonAddressDictionary()
```

This `PersonAddressDictionary` type can be reused in other F# files without needing to redeclare the type ever again.  I hope C# has a plan for this some day..

# Records #

Yes, this is the same C# Record feature but in different syntax.  While C# uses Kotlin style(which also probably steals from other language too), F#'s record is more verbose.

```csharp
public record Person(string FirstName, string LastName, int Age);

// create a record value
var person = new Person("John", "Doe", 99);
```

In F#:

```fsharp
type Person = {
    FirstName: string
    LastName: string
    Age: int
}
// or
// type Person = { FirstName: string; LastName: string; Age: int }

// create a record value
let person = { FirstName = "John"; LastName = "Doe"; Age = 99 }
```

If you notice, create a record value in F# doesn't need to even specify the record name! F# recognizes the record type by the assignment names.

Just like C#'s record, F# automatically generates code for data structural equality (and hash calculation) of all fields in the record, and also generates code for data comparison too!

# Tuple #

I assume that our reader knows tuple pretty well from C#. But some may not know that in .NET we have tuple as reference type (`System.Tuple`) and tuple as value type (`System.ValueTuple`). In recent C# version, whenever you use the tuple form, it is always `ValueTuple`.  In contrast, Tuple in F# is reference type by default.

```fsharp
type Sample1 = string * int         // equivalent to Tuple<string,int> in C#
type Sample2 = struct(string * int) // equivalent to (string, int) in C#
```

This may be useful in case you want to tune performance.

# List #

# Anonymous Object #

# Tagged Union #

## Option vs Nullable ##

## Result ##

## Pattern Matching ##

# Workflow (Computation Expressions) #

## Sequence ##

## Query ##

## Task ##

## Async ##

# Unit of Measurement #

