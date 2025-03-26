---
title: The Basic of Unit testing
showMetadata: true
editable: true
showToc: true
---

# Unit testing คืออะไร

Unit testing คือวิธีการเทสต์ซอฟแวร์ที่เราพัฒนาขึ้น ในหน่วยที่ย่อยที่สุด นั่นคือที่ระดับ function ของ source code


# Why Unit test?

หลายคนอาจจะมีคำถามว่าทำไมเราควรเขียน unit test หรือหลายคนที่อาจจะมองว่า unit test เป็นเรื่องที่สำคัญรองลงมาจากการเขียน feature ให้เสร็จ ลองถามตัวเองว่าเราเคยตกอยู่ในสถานการณ์แบบนี้บ้างมั้ย

- แก้ code function ของตัวเองแต่กลัวว่าจะพัง code คนอื่น

- ต้องแก้ code ที่คนอื่นเค้าเขียนไว้ แต่ไม่ค่อยเข้าใจว่ามันทำงานยังไงกันแน่ - (หลายๆครั้งก็มักจะเลือกลบแล้วเขียนใหม่)

- อยากหา bug เจอเร็วๆด้วยตัวเองก่อน กลัวว่าส่ง code ขึ้นไปรัน บน production แล้วจะเจอ bug ทีหลัง

- เวลา user เจอ bug ปกติแล้วคุณใช้เวลานานแค่ไหนในการ debug code เพื่อหา root cause? บางทีต้อง debug กันเป็นวันๆ กว่าจะเจอกว่า bug อยู่ตรงไหน ในระบบใหญ่ๆ อาจจะเป็นสัปดาห์กันเลยทีเดียว

- Do you want to write better code? การเขียน code ให้ testable ได้นั้น จะทำให้ code ของคุณถูก refactor / organized ไปโดยอัตโนมัติ และ code ที่ดีนั้นแท้จริงแล้ว มันก็คือ code ที่รันได้อย่างถูกต้องและไม่มี bug นั่นเอง หากคุณมี unit test cover method ที่คุณเขียนเอาไว้ มี test case ครอบคลุม ทั้ง happy & unhappy case ก็สามารถมั่นใจได้ว่าคุณกำลังเขียน code ที่ดีและได้เติมสิ่งที่มีคุณค่าให้กับระบบของคุณ


นอกจาก นี้ Unit test ช่วยให้การทำงานเป็น Agile team ของคุณง่ายขึ้น เพราะมันสามารถเอามาใช้ ใน TDD (Test-Driven development) หรือ BDD (Behavior-Driven development) เพื่อให้แน่ใจว่า feature ที่เราทำนั้น ตรงตาม requirement และยังเป็นส่วนสำคัญในการทำ Continuous integration อีกด้วย

# Unit test ที่ดี

Unit test ที่ดีควรมีลักษณะสำคัญ 5 อย่างคือ

 ### 1. **Test the smallest possible unit**

 มุ่งเน้นไปที่การ test "Individual unit" of source code , ดังนั้น unit test ที่ดี ไม่ควรเขียนมาเพื่อเทสต์ method มากกว่า 1 method

 ### 2. **Isolated from other dependencies**

 เพื่อให้แน่ใจว่าผลของการรันเทสต์ไม่ว่าจะ pass or fail นั้นขึ้นอยู่กับ code ใน function ที่ต้องการเทสต์จริงๆ ไม่ได้มาจากตัวแปรอื่นๆ หรือจาก library อื่นๆที่เราไปเรียกใช้,  method ที่เราจะไปเทสต์ควรมีการ refactor ให้เกี่ยวข้องกับ module อื่นๆให้น้อยที่สุดเท่าที่จะทำได้  ซึ่งในส่วนนี้เราอาจจะใช้การทำ dependencies injection, การ mock external libaries หรือการเขียน code โดย follow หลักการ single responsibility principle ใน SOLID ก็มีส่วนช่วยให้ลด dependencies กับส่วนอื่นๆได้

 ### 3. **Fast execution time**

  ระบบที่มี code code coverage percentage สูงๆ ส่วนใหญ่จะมีจำนวน unit test มาก, อาจจะมากเป็น 2-3 เท่าของ production code , ยกตัวอย่างเช่น ถ้าระบบเรามี code รวมๆกัน 1ล้าน line of code ก็เป็นเรื่องปกติที่เราจะมี unit test 2-3 ล้าน line of code ถ้า unit test แต่ละ test รันช้า กว่าเราจะทราบผลการรัน อาจจะต้องรอกันเป็นชั่วโมง ถ้าเป็นแบบนี้คงไม่มีใครอยากจะมารอผลของ unit test, ดังนั้นเพื่อให้เราสามารถรู้ผลของการ test ได้เร็ว unit test ควรใช้เวลารันไม่เกิน 100ms ต่อ test

 ### 4. **Controlled data**

 ข้อมูลที่ใช้เพื่อใส่เป็น input ของ unit test นั้นควรเป็น deterministic data หมายความว่า เป็นข้อมูลที่เราทราบแน่ชัดว่ามันจะมีค่าเป็นอะไร ไม่ว่าจะ run เวลาไหน หรือบนเครื่องไหนก็ตาม
 ดังนั้นเราไม่ควรอ่านข้อมูลจาก database, network request / response มาเพื่อใช้เป็น input ใน unit testing.
 ตัวอย่างง่ายๆที่หลายคนมักมองข้ามอย่างเช่น การใช้ DateTime.Now  เป็น test input, เพราะในทุกครั้งที่คุณรัน test คุณจะได้ค่าใหม่เสมอ หรือ บนเครื่องที่ตั้งเวลาเป็นคนละ Timezone ก็จะได้ค่าใหม่ ซึ่งอาจจะทำให้ผลของการรัน test ของคนไม่น่าเชื่อถือ

 ### 5. **Defects revealed by unit test are easy to locate**

 อันนี้ถือว่าเป็นจุดขายอย่างนึงของ unit test เมื่อเทียบกับการรัน end to end testing , หรือ intergration test อื่นๆ นั่นคือเมื่อ unit test ที่ดี เมื่อรันแล้วผลออกมาว่า fail, developer ควรจะทราบได้ทันทีว่า bug อยู่ที่ function ไหนหรือที่ code บรรทัดไหนได้เลย ดังนั้น เราควรที่จะหลีกเลี่ยง การเขียน 1 test มาเพื่อ test 2 methods เพราะเราจะเสียประโยชน์ต้องส่วนนี้ไป

 ซึ่งถ้าเราสามารถเขียน unit test ของเราให้ได้ตามลักษณะ 4ข้อ ข้างบนที่กล่าวมา unit test ของเราก็จะมีคุณลักษณะนี้ไปโดยอัตโนมัติ

