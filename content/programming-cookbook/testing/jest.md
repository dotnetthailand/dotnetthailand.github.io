---
title: Jest
showMetadata: true
editable: true
showToc: true
---

# Folder structure
- We suggest to create a test file inside a `__tests__` folder which is next to the file that you are going to test.
- Here is what it looks like:
```
/src/components/__tests__/ComponentA.test.tsx
/src/components/__tests__/ComponentA.test.tsx
/src/components/ComponetA.tsx
/src/components/ComponentB.tsx
```
- With this structure we get these benefits:
  - Easy to find a test file of a production file, less switching between two files
  - Do not need to make a folder structure of test to match a folder structure of production file.
  - Easy to check if a production file has test or not.
  - Easy to maintain and put other related test files, e.g mock, snapshot inside __tests__ folder

## Sources & Credit
- https://stackoverflow.com/a/62765143/1872200
- https://www.facebook.com/groups/react.th/permalink/4035993509754708
- https://medium.com/opendoor-labs/testing-react-components-with-jest-a7e8e4d312d8

# What is Snapshot testing?
- Save output of a component and compare with a new component output if they match
- https://medium.com/componently/no-more-snapshots-folders-with-jest-98de26681764


# Expect

## .toBe
- Use to compare primitive values or to check referential identity of object instances.
- It calls `Object.is` to compare values
  - [Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
  - [Object.is()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)
- Don't use .toBe with floating-point numbers. Use `.toBeCloseTo` instead.
- It reports a deep comparison of values if the assertion fails. If differences between properties do not help you to understand why a test fails, especially if the report is large, then you might move the comparison into the expect function. For example, to assert whether or not elements are the same instance:
  - rewrite `expect(received).toBe(expected)` as `expect(Object.is(received, expected)).toBe(true)`
  - rewrite `expect(received).not.toBe(expected)` as `expect(Object.is(received, expected)).toBe(false)`
- I think it reports deep comparison value because `.toBe` is used for primitive values.
- Interesing article [Why you should never use .toBe in Jest](https://dev.to/thejaredwilcurt/why-you-should-never-use-tobe-in-jest-48ca)

## .toEqual
- Use .toEqual to compare recursively all properties of object instances (also known as "deep" equality). It calls Object.is to compare primitive values.
- .toEqual won't perform a deep equality check for two errors. Only the message property of an Error is considered for equality. It is recommended to use the .toThrow matcher for testing against errors
-

## .toBe VS .toEqual
```js
// Two players, both happen to have the same name and age
const player1 = { name: 'John', age: 25 };
const player2 = { name: 'John', age: 25 };
const players = [player1, player2];

function getFirstPlayer () {
  return players[0];
}

test('getFirstPlayer', () => {
  // USING TOBE
  expect(getFirstPlayer())
    .toBe(player1); // passes

  expect(getFirstPlayer())
    .not.toBe(player2); // passes

  // USING TOEQUAL
  expect(getFirstPlayer())
    .toEqual(player1); // passes

  expect(getFirstPlayer())
    .not.toEqual(player2); // fails
});
```
