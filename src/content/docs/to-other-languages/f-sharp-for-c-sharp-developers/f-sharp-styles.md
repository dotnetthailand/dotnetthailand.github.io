---
title: F# Styles
showMetadata: true
editable: true
showToc: true
order: 4
---

This chapter focuses on F# programming style, which is basically functional traits of the language.

# Function call style #

Function call in F# doesn't need parenthesis.  Actually, F# sees all methods like a curry function, even if they come from C# library or BCL!  For example, instead of writing:

```csharp
Console.WriteLine("Hello World!");
```

In F#, we can remove the parathesis and semi-colon, as long as the function's parameters aren't ambiguous.

```fsharp
// it isn't ambiguous as it can match only one function signature out of several overloaded forms.
Console.WriteLine "Hello World!"
```

However, if a method has many parameters, F# will perceive it as a function of a Tuple value and it needs parathesis to signify the tuple, as comma in F#
has (alomost?) lowest operator precedence (in other words, lowest priority).

So you can't do `Console.WriteLine "Hello {0}", "World"`, as it will be interpreted as `(Console.WriteLine "Hello {0}"), "World"` or `unit * string` tuple type.

Class' constructor is automatically treated as a function in F#, so we don't need to use the keyword `new` in order to instantiate a class.

```fsharp
open System.Collections.Generic

let arrayList = List<int>()  // or new List<int>()
```

However, if the class implements `IDisposable`, F# will issue a warning that you should use `new` keyword to show an attention needed for this kind of object, which I don't see the point so I often suppress the warning (760).

## Recursive ##

Good thing in any functional languages is tail-recursive optimization! In order to write a recursive function in F#, you need the keyword `rec` after `let` declaration.

```fsharp
/// Call f() n times
let rec repeatCall f n =
    if n > 0 then
        f()
        repeatCall f (n-1)  // tail-recursive
```

 In case you never heard of it, tail recursive is a kind of self calling without further processing from the return value. From the example, the return value, which is `unit`, is immediately used as a return value, not futhre calculation needed.  This is a kind of tail recursive.

 Following example is not tail recursive:

```fsharp
let factorial n =
    if n = 0
    then 1
    else n * (factorial (n-1))
```

Since the value of `factorial (n-1)` is needed to do further calculation.

## Forward pipe ##

## Backward pipe ##

## Point-free style (Tacit programming) ##

# Pattern Matching #

# Error Handling #

# Outro #

