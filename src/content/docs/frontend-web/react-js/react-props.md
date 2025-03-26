---
title: React Props
showMetadata: true
editable: true
showToc: true
---

สวัสดีฮะทุกคน เป็นไงกันบ้างฮะทำงาน WFH เหงาๆกันไหมหรืองานล้นจนไฟท่วม ฮ่าๆ วันนี้ผมก็อยากจะมาแชร์ประสบการณ์การทดลองเล่น React ในส่วนของการส่งข้อมูลจาก Parent Component ไปยัง Children Component
ด้วยเจ้าสิ่งที่เรียกว่า props ฮะ

**Note:** เนื้อหาในส่วนนี้เป็นเนื้อที่เหมาะสำหรับคนพึ่งเริ่มเล่น React แบบ 101 นะฮะ ^ ^

### หลักการทำงานของ Props
จากรูปด่านล่างเราจะเห็นได้ว่าการทำงานตรงไปตรงมามากๆคือเป็นส่งข้อมูลจาก Parent ไปที่ Children Component แบบทางเดียว(ReadOnly)
![](https://www.techdiagonal.com/wp-content/uploads/2019/09/react-props-blog-image-design.jpg)

### การใช้งาน Props
เราสามารถส่งข้อมูลหรือFunction จาก Parent ไปที่ Children Component นั้นใน React เราจะส่งข้อมูลในลักษณะนี้ผ่านทาง props ฮะ
และสำหรับตัวข้อมูลที่สามารถส่งผ่านทาง props ได้ก็จะมีตั้งแต่ String, Number, Boolean, Array จนถึง Function ซึ่งการใช้งานก็สะดวกๆมากฮะ 
และในบทความนี้ผมก็ได้ทำตัวอย่างแบบง่ายๆเพื่อเป็นแนวทางการเรียนรู้ props ไว้ที่ตัวอย่างด้านล่างนี้ฮะ
```jsx
function Hello(props) {
  return <div>Hello, {props.who}</div>;
}

function Message({ greet = "Hello", who }) {
  return (
    <div>
      {greet}, {who}
    </div>
  );
}

function Card({ todo }) {
  return <div>{todo.name}</div>;
}

function MyChildren({ children }) {
  return <>{children}</>;
}

function AlertFunction(props) {
  return (
    <>
      <button type="button" onClick={props.fn}>
        Alert
      </button>
    </>
  );
}

function App() {
  const name = "Geidtiphong";
  const objMessage = { greet: "Hi", who: "Poppy" };
  const todos = [
    { id: 1, name: "Pobx 1" },
    { id: 2, name: "Pobx 2" },
    { id: 3, name: "Pobx 3" },
  ];

  const fn = () => alert('test');

  return (
    <div className="App">
      <h4>การส่ง String, Number, Boolean, Template string และ Function</h4>
      <Hello who="Pobx" />
      <Hello who={99} />
      <Hello who={false} />
      <Hello who={`My Name is ${name}`} />

      <AlertFunction fn={fn} />

      <hr />

      <h4>การส่ง Multiple & Optional props</h4>

      <Message greet="Hi" who="Geidtiphong Singseewo" />
      <Message {...objMessage} />
      <Message who="Pobx" />

      <hr />

      <h4>การทำ Looping List</h4>

      {todos.map((todo, index) => (
        <Card todo={todo} key={index} />
      ))}

      <hr />

      <h4>การใช้งาน Special attribute children</h4>
      <MyChildren>
        <p>Hello from children.</p>
      </MyChildren>
    </div>
  );
}
```

สุดท้ายนี้ก็หวังว่าจะเป็นประโยชน์กับทุกๆท่านที่เริ่มเขียน React นะฮะ ส่วนตัวผมนั้นขอตัวไปเรียนรู้ React ต่อก่อนละฮะ แล้วพบกันใหม่ :)

Credit Image: https://www.techdiagonal.com/wp-content/uploads/2019/09/react-props-blog-image-design.jpg