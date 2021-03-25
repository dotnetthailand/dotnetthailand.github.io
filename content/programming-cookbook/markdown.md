---
title: Markdown
showMetadata: true
editable: true
showToc: true
order: 6
---

# Syntax highlighting

- For some Markdown parser e.g. GitHub Markdown, they support syntax highlight in code block.
- Therefore, you can add a language identifier to code block to enable syntax highlight.
- For example, to syntax highlight Ruby code:

```ruby
require 'redcarpet'
markdown = Redcarpet.new("Hello World!")
puts markdown.to_html
```

- Find more supported language identifiers. https://github.com/github/linguist/blob/master/lib/linguist/languages.yml
