---
title: React TypeScript
showMetadata: false
editable: true
showToc: true
order: 1
---

## Prerequisite
- HTML, JavaScript, CSS
- Basic React
- JS ES6+ 
  - Object Destructuring
  - Arrow Function

## Additional resources

- [MDN Web Docs](https://developer.mozilla.org/en-US/) - Basic HTML, CSS, JavaScript
- [React Docs](https://reactjs.org/docs/getting-started.html)
- [Thinking in React](https://reactjs.org/docs/thinking-in-react.html)

## Awesome TypeScript resources

- [React & Redux in TypeScript - Complete Guide](https://github.com/piotrwitek/react-redux-typescript-guide)
- [React TypeScript Cheatsheets](https://react-typescript-cheatsheet.netlify.app/)


# Setup TypeScript with React

## Prerequisites
familiarity with [TypeScript](https://www.typescriptlang.org/docs/handbook/basic-types.html) Types ([2ality's guide](http://2ality.com/2018/04/type-notation-typescript.html) is helpful. If you’re an absolute beginner in TypeScript, check out [chibicode’s tutorial](https://ts.chibicode.com/todo/).)

## React + TypeScript Starter Kits

Cloud setups:

- [CodeSandbox](http://ts.react.new) - cloud IDE, boots up super fast
- [Stackblitz](https://stackblitz.com/edit/react-typescript-base) - cloud IDE, boots up super fast

Local dev setups:

- [Create React App](https://facebook.github.io/create-react-app/docs/adding-typescript): `npx create-react-app name-of-app --template typescript` will create in new folder
- [Next.js](https://nextjs.org/docs/basic-features/typescript): `npx create-next-app -e with-typescript` will create in your current folder

## Getting Started with React TypeScript Template

1. Create app using 
   
   ```sh
   npx create-react-app my-app --template typescript
   ```

2. Enter to the directory

    ```sh
    cd my-app
    ```

    You will see the project structure like this:
    
    ```
    my-app
    ├── package.json
    ├── public
    │   ├── favicon.ico
    │   ├── index.html
    │   ├── logo192.png
    │   ├── logo512.png
    │   ├── manifest.json
    │   └── robots.txt
    ├── README.md
    ├── src
    │   ├── App.css
    │   ├── App.test.tsx
    │   ├── App.tsx
    │   ├── index.css
    │   ├── index.tsx
    │   ├── logo.svg
    │   ├── react-app-env.d.ts
    │   ├── reportWebVitals.ts
    │   └── setupTests.ts
    ├── tsconfig.json
    └── yarn.lock
    ```
3. Run React project using

    ```
    yarn start
    ```

## VS Code Extensions

- Refactoring help https://marketplace.visualstudio.com/items?itemName=paulshen.paul-typescript-toolkit
- React TypeScript Code Snippets:
  - https://marketplace.visualstudio.com/items?itemName=infeng.vscode-react-typescript
  - https://www.digitalocean.com/community/tutorials/the-best-react-extension-for-vs-code
- TypeScript official extension https://code.visualstudio.com/docs/languages/typescript

## Import React

Add `allowSyntheticDefaultImports": true` in your `tsconfig.json`, you can use more familiar imports:

```typescript
import React from 'react';
import ReactDOM from 'react-dom';
```

# Basic React with TypeScript

## Function Components

These can be written as normal functions that take a `props` argument and return a JSX element.

```tsx
// Declaring type of props - see "Typing Component Props" for more examples
type AppProps = {
  message: string;
}; /* use `interface` if exporting so that consumers can extend */

// Easiest way to declare a Function Component; return type is inferred.
const App = ({ message }: AppProps) => <div>{message}</div>;

// you can choose annotate the return type so an error is raised if you accidentally return some other type
const App = ({ message }: AppProps): JSX.Element => <div>{message}</div>;

// you can also inline the type declaration; eliminates naming the prop types, but looks repetitive
const App = ({ message }: { message: string }) => <div>{message}</div>;
```

> Tip: You might use [Paul Shen's VS Code Extension](https://marketplace.visualstudio.com/items?itemName=paulshen.paul-typescript-toolkit) to automate the type destructure declaration (incl a [keyboard shortcut](https://twitter.com/_paulshen/status/1392915279466745857?s=20)).

## Hooks

Hooks are [supported in `@types/react` from v16.8 up](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/a05cc538a42243c632f054e42eab483ebf1560ab/types/react/index.d.ts#L800-L1031).

## useState

Type inference works very well for simple values:

```tsx
const [val, toggle] = useState(false);
// `val` is inferred to be a boolean
// `toggle` only takes booleans
```

## useEffect

When using `useEffect`, take care not to return anything other than a function or `undefined`, otherwise both TypeScript and React will yell at you. This can be subtle when using arrow functions:

```ts
function DelayedEffect(props: { timerMs: number }) {
  const { timerMs } = props;

  useEffect(
    () =>
      setTimeout(() => {
        /* do stuff */
      }, timerMs),
    [timerMs]
  );
  // bad example! setTimeout implicitly returns a number
  // because the arrow function body isn't wrapped in curly braces
  return null;
}
```

### Asynchronous useEffect

อันนี้เป็นตัวอย่างการ fetch ข้อมูลครั้งแรกเมื่อ Component ถูกโหลดนะครับ

```ts
function AsyncUseEffect() {

  useEffect(
    () => asyncFetch(),
    []
  );

  const asyncFetch = async () => {
      const result = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      console.log(result);
  }
  return null;
}
```

For more Hook usage and complex type: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks


# Mostly Used Prop Type

```typescript
interface AppProps {
  children: React.ReactNode; // accepts everything
  style?: React.CSSProperties; // to pass through style props
  onChange?: React.FormEventHandler<HTMLInputElement>; // form events! the generic parameter is the type of event.target
  //  more info: https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#wrappingmirroring
}
```
## Useful React Prop Type Examples

```typescript
interface AppProps {
  children1: JSX.Element; // bad, doesnt account for arrays
  children2: JSX.Element | JSX.Element[]; // meh, doesn't accept strings
  children3: React.ReactChildren; // despite the name, not at all an appropriate type; it is a utility
  children4: React.ReactChild[]; // better, accepts array children
  children: React.ReactNode; // best, accepts everything (see edge case below)
  functionChildren: (name: string) => React.ReactNode; // recommended function as a child render prop type
  style?: React.CSSProperties; // to pass through style props
  onChange?: React.FormEventHandler<HTMLInputElement>; // form events! the generic parameter is the type of event.target
  //  more info: https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#wrappingmirroring
  props: Props & React.ComponentPropsWithoutRef<"button">; // to impersonate all the props of a button element and explicitly not forwarding its ref
  props2: Props & React.ComponentPropsWithRef<MyButtonWithForwardRef>; // to impersonate all the props of MyButtonForwardedRef and explicitly forwarding its ref
}
```

# Ref
- [React TypeScript Cheat sheet](https://react-typescript-cheatsheet.netlify.app/)


