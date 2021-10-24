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
String literals
```
<Hello who='Pobx' />
```
Template literals with variables
```
<Hello who={`My Name is ${name}`} />
```
Number literals
```
<Hello who={88} />
```
Boolean literals
```
<Hello who={true} />
```
Plain object literals
```
<Hello who={{name: 'pobx'}} />
```
Array literals
```
<Hello who={['pobx', 'poppy']} />
```

### Props สามารถทำ Optional ได้
```
```
