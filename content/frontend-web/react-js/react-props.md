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
จากรูปด่านล่างเราจะเห็นได้ว่าการทำงานตรงไปตรงมามากๆคือเป็นส่งข้อมูลจาก Parent ไปที่ Children Component แบบทางเดียว
![](https://www.techdiagonal.com/wp-content/uploads/2019/09/react-props-blog-image-design.jpg)

### ข้อมูลที่สามารถส่งผ่าน Props ได้
#### String literals
```
<Hello who='Pobx' />
```
#### Template literals with variables
```
<Hello who={`My Name is ${name}`} />
```
#### Number literals
```
<Hello who={88} />
```
#### Boolean literals
```
<Hello who={true} />
```
#### Plain object literals
```
<Hello who={{name: 'pobx'}} />
```
#### Array literals
```
<Hello who={['pobx', 'poppy']} />
```
#### Function
```
const fn = () => alert(1);
<Hello fn={fn} />
```

### Props สามารถทำ Optional ได้
```
function Message({ greet = "Hello", who }) {
  return (
    <div>
      {greet}, {who}
    </div>
  );
}

<Message who="Pobx" />
```

### Props ในรูปแบบ Spread syntax
```
const messageObj = { greet: "Hi", who: "Poppy" };
<Message {...messageObj} />
```

### Props Children
```
function MyChildren({children}) {
  console.log(children)
  return <>{children}</>
}

<MyChildren>
  <h1>Hello Pobx !</h1>
</MyChildren>
```

### Props Key
```
const todos = [
  { id: 1, name: "Pobx 1" },
  { id: 2, name: "Pobx 2" },
  { id: 3, name: "Pobx 3" },
];

function Card({todo}) {
  return <div>{todo.name}</div>
}

{todos.map((todo, index) => (
  <Card todo={todo} key={index} />
))}
```