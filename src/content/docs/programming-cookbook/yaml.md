---
title: YAML
showMetadata: true
editable: true
showToc: true
order: 1
---

## How do I break a string in YAML over multiple lines?
- Use > most of the time: interior line breaks are stripped out, although you get one at the end:
```yaml
key: >
  This is my very very very
  long string.
```
**Become →** This is my very very very long string.`\n`

- Use | if you want those line breaks to be preserved as \n (for instance, embedded markdown with paragraphs).
```yaml
key: |
  This is my very very very
  long string.
```
**Become →** This is my very very very`\n`long string.`\n`

- Other options with summary table
```

                      >     |            "     '     >-     >+     |-     |+
-------------------------|------|-----|-----|-----|------|------|------|------
Trailing spaces   | Kept | Kept |     |     |     | Kept | Kept | Kept | Kept
Single newline => | _    | \n   | _   | _   | _   | _    |  _   | \n   | \n
Double newline => | \n   | \n\n | \n  | \n  | \n  | \n   |  \n  | \n\n | \n\n
Final newline  => | \n   | \n   |     |     |     |      |  \n  |      | \n
Final dbl nl's => |      |      |     |     |     |      | Kept |      | Kept
In-line newlines  | No   | No   | No  | \n  | No  | No   | No   | No   | No
Spaceless newlines| No   | No   | No  | \   | No  | No   | No   | No   | No
Single quote      | '    | '    | '   | '   | ''  | '    | '    | '    | '
Double quote      | "    | "    | "   | \"  | "   | "    | "    | "    | "
Backslash         | \    | \    | \   | \\  | \   | \    | \    | \    | \
" #", ": "        | Ok   | Ok   | No  | Ok  | Ok  | Ok   | Ok   | Ok   | Ok
Can start on same | No   | No   | Yes | Yes | Yes | No   | No   | No   | No
line as key

```
- More details & Credit https://stackoverflow.com/a/21699210/1872200

