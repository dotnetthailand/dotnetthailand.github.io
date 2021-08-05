---
title: Migrate Class Component to Functional Component
showMetadata: true
editable: true
showToc: true
order: 3
---

# Local State

เราสามารถแปลงจาก [Class Component](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/class_components/) ด้านล่างนี้

```ts
import React from 'react';

interface MyProps {
  message: string;
};
interface MyState {
  count: number; 
};
class App extends React.Component<MyProps, MyState> {
  state: MyState = {
    // optional second annotation for better type inference
    count: 0,
  };
  render() {
    return (
      <div>
        {this.props.message} {this.state.count}
      </div>
    );
  }
}
```

ให้เป็น [Functional Component](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components) แบบนี้ได้ 

```ts
import React, { useState } from 'react';

interface PropTypes {
  message: string;
}

function App({ message }: PropTypes){
  const [count, setCount] = useState(0);

  return (
    <div>
      {message} {count}
    </div>
  );
};
export default App;
```

ทำไมถึงไม่แนะนำ `React.FC` หรือ `React.FunctionComponent`/`React.VoidFunctionComponent` อ่านรายละเอียดใน [Functional Component](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components) 

# Handle Click Event

เราสามารถแปลงจาก [Class Component](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/class_components) ด้านล่างนี้

```ts
import React from 'react';

interface PropTypes {
  message: string;
}
interface StateTypes {
  counter: number;
}
class App extends React.Component<PropTypes, StateTypes> {
  state: StateTypes = {
    counter: 0
  };

  handleClick(amount: number) {
    this.setState( state => ({
      counter: state.counter + amount
    }));
  }

  render() {
    return (
      <div>
        <h1>{this.props.message}</h1>
        <button onClick={() => this.handleClick(1)}> Increase </button>
        <p>{this.state.counter}</p>
      </div>
    );
  }
}

export default App;
```

> Note: Using an arrow function in render creates a new function each time the component renders, which may break optimizations based on strict identity comparison. Read more at [React Official Doc](https://reactjs.org/docs/faq-functions.html#arrow-function-in-render).

ให้เป็น Functional Component แบบนี้ได้ 

```ts
import React, { useState } from 'react';

interface PropTypes {
  message: string;
}

function App({ message }: PropTypes) {
  const [counter, setCounter] = useState(0);

  const handleClick = (amount: number) => {
    setCounter(counter + amount);
  };

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={() => handleClick(1)}> Increase </button>
      <p>{counter}</p>
    </div>
  );
};
export default App;
```


# componentDidMount() in React Hook 

หนึ่งใน React Lifecyle ที่ใช้บ่อยๆ มากๆ คือ [componentDidMount()](https://reactjs.org/docs/react-component.html#componentdidmount) ซึ่งจะทำครั้งแรก ครั้งเดียวเมื่อ Component โหลดเสร็จ

```ts
function FirstExecuteComponent() {

  // add event listeners (Flux Store, WebSocket, document, etc.)
  useEffect(
    () => console.log("Component loaded"),
    []
  );
  return null;
}
```

ข้อสังเกตุ `useEffect` ต้องการรับ 2 parameters ถ้าอยากให้เหมือน `componentDidMount()` ให้ใส่ Array เปล่าๆ ใน parameters ตัวที่สอง `[]`

# componentWillUnmount() in React Hook 

อีกหนึ่งใน React Lifecyle ที่มีใช้บ้างคือคือ [componentWillUnmount()](https://reactjs.org/docs/react-component.html#componentwillunmount) ซึ่งจะทำงานครั้งสุดท้ายครั้งเดียวก่อนที่ Component ถูกเอาออก (Component is unmounted and destroyed)


```ts
function FirstAndLastExecuteComponent() {

  // remove event listeners (Flux Store, WebSocket, document, etc.)
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
