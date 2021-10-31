---
title: F# Overview for C# developers
showMetadata: true
editable: true
showToc: true
---

This page intends to overview F# features to you. Once you finish this, you should be able to write simple F# code with functions :)

# F# Introduction #

 The key difference between F# and C# is that F# is a function-first language, meaning it expects us to write code full of functions and lambdas, and less of classes or even none.

This article is not intended for introducing functional programming. I assume that the reader should have some knowledge about functional programming (i.e. its principles).

Let's start from the high-level view...

# Project and file structure #

Here's the list of F# file extensions:

| File Extension | Description     |
| ----           | ----            |
| .fs            | F# source file  |
| .fsx           | F# script file  |
| .fsproj        | F# project file |

`fsx` is similar to `.csx` ([C# Script File](https://docs.microsoft.com/en-us/archive/msdn-magazine/2016/january/essential-net-csharp-scripting)) but it has a nice feature where you can reference libraries from nuget.org with `#r` directive in the file, pretty handy for writing a power script.

In .NET Core, you can run a script by `dotnet fsi script.fsx` (and `dotnet fsi` alone is for F# interactive mode).

## Project Structure ##

Basically, F# project is very like C# project, just a group of `.fs` files but the big difference is on their distinct ideologies.  C# is OO language which usually has many classes, divided into namespaces or packages.  It doesn't matter how many `.cs` files you have, when you compile them, it just becomes a pool of classes which can freely refer to each other (cyclic dependency!? no problem! 😂).

F# is based on top-down, modular design. Functions are often put in modules, each module should be in its `.fs` file, and the **order of files** are important!  Order of `functions` in each `.fs` file is important as well, functions that are declared on top-most of file cannot refer to functions declared later.

For example, supposed that we have a F# project with two modules `A` and `B` and the project structure looks like following:

```
MyProject.fsproj
   |- A.fs
   |- B.fs
```

Any functions in module `A.fs` cannot refer to anything in `B.fs`.

Also, if module `A` has following functions:

```F#
let f() = g()       // compilation error!
let g() = printfn "I'm G"
```

It won't work, `f()` won't recognize `g()`.  Writing code in F# needs you to plan your code dependencies.. :)

# Program entrypoint #

In C# we need a static `Main` method defined as an entry point. Normally we often see this in a console program.

```csharp
// Program.cs
using System;

class Program {
    static void Main(string[] args) {
        Console.WriteLine("Hello world!");
    }
}
```

In F#, there are two ways to define an entrypoint...

## Top-level statements ##

Does the topic sound familiar 🤭? Yes, it's the new feature in C# 9 that I believe taking from F#.

```F#
// Program.fs
printfn "Hello world!"
```

Similar to C#, top-level statement style can be used only in the main program file.

## Explicitly declaring an "EntryPoint" ##

This one looks similar to C#'s.

```F#
// Program.fs
[<EntryPoint>]
let mymain args =
    printfn "Hello world!"
```

To make it more alike, it can also be..

```F#
// Program.fs
module Program

open System

[<EntryPoint>]
let Main(args: string[]) =
    Console.WriteLine("Hello world!")
```

# F# vs C# syntaxes #

## Using module / namespace ##

Basically, F# `open` keyword is like C# `using`. We use `using NameSpace.Name;` to include everything in that namespace, in F# we use `open NameSpace.Name` instead. Note that F# languages doesn't use semi-colon to close statements like C#, though it has other meaning.

`open` in F# not only for including things in namespaces, it's also used for including everything in a "module". You can simply think of F# module as a static class, this analogy works for me.

## .NET Attribute ##

F# uses `[<Attribute>]` style to apply an attribute, where C# just uses `[Attribute]`.  For multiple attributes, you can use `[<Attribute1; Attribute2; Attribute3(Param=123)>]`.  Another note, F# uses semi-colon for separating items, comma is preserved for tuple..

## Simple Function Declaration ##

F# uses keyword `let` to define "variable" and function. Since in FP point-of-view, a function is just a value. Defining a function in F# is as same as defining a "variable".  (I know using the word "variable" here is technically wrong, that's why I put double-quote around the word but I'll omit it from now on.)

Here, an example of defining a function and variable.

```F#
let PI = 3.141  // variable
let radius x = x * PI / 180.0   // function
```

F# type interference is more powerful than C#, I believe, due to language's simpler grammar, so type annotation is often an option. From the example, `x` will be known as `float` (which is `double` type in C#) because it deducts from type of `PI` and `180.0`.. Note that you can't write `let radius x = x * PI / 180` because `180` is a literal of `int` and it doesn't work with `float` type.  F# is type-strict language! (and hence more powerful type interence)

But if you want to annotate a type, you can use `name: type` style (similar to TypeScript and many languages) to do it.

```F#
let PI: float = 3.141
let radius (x: float) :float = x * PI / 180.0
```

Technically, `radius` is a lambda, this is like, tho not exactly, doing this `Func<double,double> radius = x => PI / 180;` in C#.

## printf, printfn ##

If you have C/C++ background, you will immediately familiar with the function name. It's quite same concept but with stronger-typed 😊

```F#
open System

Console.WriteLine("There are {0} people in {1}.", 10_000_000, "Bangkok")
printfn "There are %d people in %s." 10_000_000 "Bangkok"
```

Those statements have the same output.  But `printfn` may look odd to ones who never heard of curry function style, which I will have another dedicated page for curry style.

## Multi-variable Function (C# style) ##

## C# Data Types Mappings ##

