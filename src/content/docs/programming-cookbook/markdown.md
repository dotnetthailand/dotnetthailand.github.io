---
title: Markdown
showMetadata: true
editable: true
showToc: true
order: 1
---

# Syntax highlighting

- For some Markdown parser e.g. GitHub Markdown, they support syntax highlight in code block.
- Therefore, you can add a language identifier to code block to enable syntax highlight.
- For example, to syntax highlight Ruby code:

<!-- https://stackoverflow.com/a/31834381/1872200 -->
~~~
```ruby
require 'redcarpet'
markdown = Redcarpet.new("Hello World!")
puts markdown.to_html
```
~~~
- Find more supported language identifiers. https://github.com/github/linguist/blob/master/lib/linguist/languages.yml and use `ace_mode` key

# Syntax highlight in .NET Thailand website
- For C#, please use `cs`, `csharp` or `dotnet`. [REF](https://github.com/PrismJS/prism/blob/master/components/prism-csharp.js#L367)
- For example:
~~~
```cs
// Hello World! program
// Program.cs file
using System;

namespace HelloWorld
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
        }
    }
}

```
~~~

# Useful links
- https://docs.github.com/en/github/writing-on-github/creating-and-highlighting-code-blocks#syntax-highlighting
- https://ace.c9.io/ Amazon Cloud Editor
