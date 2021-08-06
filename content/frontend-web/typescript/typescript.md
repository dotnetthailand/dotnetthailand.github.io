---
title: TypeScript
showMetadata: true
editable: true
showToc: true
order: 1
---

# Overview

ก่อนเข้าเรื่องขอเกริ่นอะไรเล็กน้อย หลายๆ คนอาจจะคิดว่าการเขียน TypeScript เป็นเรื่องยาก จะต้องมี Learning Curve ที่สูงมากๆ แน่เลย หรือ จะต้องเรียนรู้อะไรเพิ่มเติมอีก 

ผมขอบอกตรงนี้เลยนะครับ เราสามารถใช้ TypeScript แต่ไม่ต้องกำหนด Type ใดๆ เลยก็ได้ ซึ่งไม่ Error ด้วย ขึ้นอยู่กับเราตั้งค่าใน `tsconfig.json` ยังไง หลายๆ คนอาจจะตั้งคำถามว่าแล้วจะใช้ TypeScript ไปทำไม 

<!-- สามารถไปอ่านรายละเอียดได้ในหัวข้อ [Migrate JavaScript Project to TypeScript](/frontend-web/typescript/migrate-javascript-to-typescript) -->

แบบนี้ครับ เพื่อให้ง่ายสำหรับการเริ่มต้น เราเริ่มต้นจากเล็กไปหาใหญ่ได้ครับ ตรงไหนอยากได้ความแม่นของ Type หรือ code completion โดย Editor หรือ Feature อื่นๆ ของ TypeScript เราก็ค่อยๆ ใส่ไปครับ แบบนี้จะสบายๆ กว่าครับ

## Introduction

> "TypeScript is a superset of JavaScript that compiles to clean JavaScript output." from [TypeScript Repo](https://github.com/microsoft/TypeScript)

TypeScript และ C# มาจากคนสร้างคนเดียวกัน คือ Microsoft ดังนั้น ลักษณะของ Syntax จึงมีความคล้ายคลึงสูงมาก แต่อย่างไรก็ตาม TypeScript ยังคงความเป็นเอกลักษณ์ของตัวภาษา Javascript อยู่

ระบบ type ของ TypeScript ให้ประโยชน์หลายๆ อย่างเช่น ทำ code completion ดีขึ้น  สามารถหา error ได้ง่ายขึ้น และการสื่อสารระหว่างแต่ละส่วนของโปรแกรมค่อนข้างชัดเจน ว่า type อะไร

## TypeScript Feature over JavaScript:

- Types
- Next-gen JS Features (Compiled for older browser)
- Non-JS Feature like interface or Generic
- Meta Programming like Decorator
- Rich Configtion

**Note:**

- ภาษา TypeScript สามารถทำงานร่วมกับ Javascript ได้เลย
- ภาษา TypeScript มีความคล้ายคลึงกับ Javascript ES6 ขึ้นไป
- การใช้ Library ของ TypeScript ร่วมกันกับ Javascript นั่นคือ `npm` ดังนั้น การเลือกใช้ Library ให้พึงสังเกตุว่า Library ตัวนั้นเขียนด้วย Typesctipt หรือไม่
  - ถ้าเขียนด้วย Javascript โดยส่วนใหญ่จะเขียน Type  ของ Javascript แยกเป็นอีกไฟล์ อย่างไรก็ตาม การเรียกใช้ Library ลักษณะนี้อาจจะทำให้ Type ผิดพลาดได้ แต่มีโอกาสเจอน้อยนะ
  - แต่ถ้าเขียนด้วย TypeScript เลย จะมีโอกาสเข้ากันได้ง่ายกว่า


## Co-learning JavaScript

If you’re a Java or C# programmer that is new to JavaScript in general, we recommend learning a little bit of JavaScript *without* types first to understand JavaScript’s runtime behaviors. Because TypeScript doesn’t change how your code *runs*, you’ll still have to learn how JavaScript works in order to write code that actually does something!

ถ้าใครที่คุ้นเคยกับ JavaScript อยู่แล้ว ก็สามารถข้ามหัวพวกนี้ไปได้เลย

### Asynchronous Programming

**Read more**

[Why Asynchronous? - NodeSource](https://nodesource.com/blog/why-asynchronous/)

### Event Loop

[Understanding the Node.js Event Loop - NodeSource](https://nodesource.com/blog/understanding-the-nodejs-event-loop/)

[✨♻️ JavaScript Visualized: Event Loop - DEV Community](https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif)

### Promises & Async/Await

[⭐️🎀 JavaScript Visualized: Promises & Async/Await - DEV Community](https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke)

### Hoisting

[🔥🕺🏼 JavaScript Visualized: Hoisting - DEV Community](https://dev.to/lydiahallie/javascript-visualized-hoisting-478h)

### Execution context

https://medium.com/@happymishra66/execution-context-in-javascript-319dd72e8e2c

[Understanding Execution Context and Execution Stack in Javascript | by Sukhjinder Arora | Bits and Pieces (bitsrc.io)](https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0)

### Scope chain

[⚡️⛓JavaScript Visualized: Scope (Chain) - DEV Community](https://dev.to/lydiahallie/javascript-visualized-scope-chain-13pd)

# Getting Started

## TypeScript for Node.js


# Single File Execution

**TypeScript**

```typescript
// Main.ts File
console.log("Hello World");
```

# Data Types

**TypeScript**

```typescript
const fooInt = 1;
const fooBoolean = true;
const fooString = "Hello";
```


### Union Type

ใน TypeScript สามารถรวม type กันได้ เช่น

```typescript
// `isShow` รับ type เฉพาะ undefined หรือ boolean เท่านั้น
type isShow = undefined || boolean;
```
# Module

[TypeScript: Documentation - Modules (typescriptlang.org)](https://www.typescriptlang.org/docs/handbook/modules.html)

# Collection
# Object

Object ใน C# และ TypeScript ไม่เหมือนกัน

## Custom Object Type e.g. Dictionary  (Microsoft's DI)
```typescript
type Dictionary<T> = {
  [key: string]: T;
};
```
Ref: <https://github.com/microsoft/tsyringe/blob/master/src/types/dictionary.ts>

# Object-Oriented Programming
## Class

## Recommendation Links
- [TypeScript for React Cheat Sheet](https://react-typescript-cheatsheet.netlify.app/)

# Ref

- [Learn c# in Y Minutes (learnxinyminutes.com)](https://learnxinyminutes.com/docs/csharp/)
- [Learn TypeScript in Y Minutes (learnxinyminutes.com)](https://learnxinyminutes.com/docs/typescript/)
- [TypeScript: Documentation - TypeScript for Java/C# Programmers (typescriptlang.org)](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-oop.html)
- [TypeScript Course for Beginners 2021 - Learn TypeScript from Scratch! by 
Academind (Maximilian Schwarzmüller)](https://www.youtube.com/watch?v=BwuLxPH8IDs)
