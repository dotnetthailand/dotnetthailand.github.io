---
title: React Design Pattern
showMetadata: true
editable: true
showToc: true
order: 2
---

# Import & Export (JavaScript modules)

- Default export

    ```ts
    // MyComponent.tsx
    const MyComponent = () => <div>Hey, MyComponent</div>;
    export default MyComponent;

    // App.tsx
    import MyComponent from './MyComponent';
    ```

- Export

    ```ts
    // MyComponent.tsx
    export const MyComponent = () => <div>Hey, MyComponent</div>;

    // App.tsx
    import { MyComponent } from './MyComponent';
    ```

- Rename import

    ```ts
    // MyComponent.tsx
    export const MyComponent = () => <div>Hey, MyComponent</div>;

    // App.tsx
    import { MyComponent as MySuperComponent } from './MyComponent';
    export const App = () => <MySuperComponent />;
    ```

- Group all imports and rename

    ```tsx
    // MyComponent.tsx
    export const Switch = () => <div>Hey, Switch</div>;
    export const Group = () => <div>Hey, Group</div>;

    // App.tsx
    import { * as MyComponent } from './MyComponent';
    export const App = () => (
        <>
            <MyComponent.Switch />
            <MyComponent.Group />
        </>
    );
    ```

- Re-export all

    ```ts
    // MyComponent.tsx
    export const Switch = () => <div>Hey, Switch</div>;
    export const Group = () => <div>Hey, Group</div>;

    // MyParentComponent.tsx
    export * from "./MyComponent";

    // App.tsx
    import { Switch, Group } from './MyParentComponent';
    export const App = () => (
        <>
            <Switch />
            <Group />
        </>
    );
    ```

- Re-export, then group all imports and rename

    ```ts
    // MyComponent.tsx
    export const Switch = () => <div>Hey, Switch</div>;
    export const Group = () => <div>Hey, Group</div>;

    // MyParentComponent.tsx
    export  * as MyComponent from "./MyComponent";

    // App.tsx
    import { MyComponent } from './MyParentComponent';
    export const App = () => (
        <>
            <MyComponent.Switch />
            <MyComponent.Group />
        </>
    );
    ```

- Export type

    ```ts
    // MyComponent.tsx
    export type Gender = "Male" | "Female"; // Accept only "Male" or "Female" 

    // App.tsx
    import { Gender } from './MyComponent'
    ```

- Export interface

    ```ts
    // MyComponent.tsx
    export interface IUser {
        id: string;
        name: string;
    }

    // App.tsx
    import { IUser } from './MyComponent'
    ```

# Handling with side effects

Side effects เป็น function โดยส่วนใหญ่แล้ว เราจะจัดการกับ Side Effect ของ Component โดยมี 3 scenarios:
- ทำงานเฉพาะครั้งแรกที่ Component mount (Only when a component mounts)
- เคลียร์ค่าต่างๆ โดยใช้ return a function (Cleaning up by returning a function)
- ทำงานเมื่อ dependencies มีการเปลี่ยนแปลง (Running when specific dependencies change)a

## ทำงานเฉพาะครั้งแรกที่ Component mount

จะทำครั้งแรก ครั้งเดียวเมื่อ Component โหลดเสร็จ

```ts
function FirstExecuteComponent() {

  // Add event listeners (Flux Store, WebSocket, document, etc.)
  useEffect(
    () => console.log("Component loaded"),
    []
  );
  return null;
}
```

ข้อสังเกตุ `useEffect` ต้องการรับ 2 parameters ถ้าอยากให้เหมือน `componentDidMount()` ให้ใส่ Array เปล่าๆ ใน parameters ตัวที่สอง `[]`

## เคลียร์ค่าต่างๆ โดยใช้ return a function

จะทำงานครั้งสุดท้ายครั้งเดียวก่อนที่ Component ถูกเอาออก (Component is unmounted and destroyed)

```ts
function FirstAndLastExecuteComponent() {

  // Remove event listeners (Flux Store, WebSocket, document, etc.)
  useEffect(
    () => {
        console.log("Component loaded");
        return () => console.log("Component unloaded");
    },
    []
  );
  return null;
}
```

เราสามารถใช้ประโยชน์จาก function `useEffect` ได้ ตรงที่ return ของ parameters ตัวแรกของ `useEffect` โดยเราสามารถ remove event listeners หรือล้างข้อมูลอะไรบางอย่าง ก็ได้ครับ

### ตัวอย่างการเคลียร์ค่า EventListener ของ Window Resize

```tsx
import React, { useState, useEffect } from "react";

function getWindowSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

export default function WindowSize() {
  const [size, setSize] = useState(getWindowSize());

  useEffect(() => {
    const handleResize = () => {
      setSize(getWindowSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <p>
      Width: {size.width}, Height: {size.height}
    </p>
  );
}
```

## ทำงานเมื่อ dependencies มีการเปลี่ยนแปลง

เราสามารถใส่ dependencies ที่อยากตรวจสอบได้ เช่น เมื่อ toggle มีการเปลี่ยนแปลงค่า จากที่ User เป็นคนคลิก ให้เรียก side effect เป็นต้น ดังตัวอย่างข้างล่างนี้

```tsx
import React, { useState, useEffect } from "react";

export default function DetectChange() {
  const [toggle, setToggle] = useState(false);
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    const toggleMessage = toggle ? "True" : "False";
    setMessage(toggleMessage);
  }, [toggle]);

  return (
    <p>
      <button onClick={() => setToggle(!toggle)}>Toggle</button>
      <h1>{message}</h1>
    </p>
  );
}
```

Note: ตัวอย่างนี้ไม่ใช่วิธีการที่ดีในการควบคุม state เขียนอธิบายการทำงานเท่านั้น

# Style Guide

Read more in [Airbnb's Style guide](https://github.com/airbnb/javascript/tree/master/react)

# Other Resources

Other topics can read in below resources:

- [React Design principles](https://facebook.github.io/react/contributing/design-principles.html)
- [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- [React in pattern by krasimir](https://github.com/krasimir/react-in-patterns)
- [React patterns at Planning Center Online](https://github.com/planningcenter/react-patterns)
- [React patterns by Michael Chan](http://reactpatterns.com/)
- [React patterns, techniques, tips and tricks](https://github.com/vasanthk/react-bits)