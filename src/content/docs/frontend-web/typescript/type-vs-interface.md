---
title: Type VS Interface
showMetadata: true
editable: true
showToc: true
order: 2
---

- https://stackoverflow.com/a/65948871/1872200
- https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces

# Type or Interface for React props
- https://dev.to/reyronald/typescript-types-or-interfaces-for-react-component-props-1408
- https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example/#more-advice

Types declarations are almost always more concise than their interface counterparts because of their syntax, and they can also be more composable thanks to the possibility of unions. If the prop object you are typing is really small you can get away with inlining it in the function declaration too, which you wouldn't be able to do if you are strictly sticking to interfaces.

When it comes to re-usable libraries, using interfaces instead is a very good and pragmatic choice as it allows the library itself to be more flexible because now each consumer can re-declare each of those interfaces as needed to add properties.

If you work on a multi-team company, all team use and contribute a component that you own.
You decided to use interfaces because you can re-declare an interface, it's very likely that when another team encounters a typing inconsistency issue they decide to quickly fix it in their code bases by leveraging the flexibility of extension points rather than contributing a fix upstream, and further fragmenting the consistency of the development experience across the company as a result.
