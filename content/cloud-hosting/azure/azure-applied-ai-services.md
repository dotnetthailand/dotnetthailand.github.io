---
title: Azure Applied AI service
showMetadata: true
editable: true
---

# เริ่มต้นทำความรู้จักกับ Azure Applied AI Service

![Azure Applied AI Service](azure-applied-ai-services/images/Microsoft-Azure-AI-Official-Microsoft.jpeg)

ลองมองดูรอบๆ ตัวเราสิครับ มันมักจะมีสิ่งพื้นๆ สำหรับการเริ่มต้น เช่นก่อนจะว่ายน้ำได้ ก็ต้องลอยตัวให้เป็นก่อน หรือจะเป็นก่อนจะทำต้มยำเป็น ก็ขอให้รู้การทำให้ไข่สุกก่อน การใช้งาน AI ในงานของเราก็เช่นกัน

หากเราคุ้นเคยกับการใช้งาน Azure Cognitive Service ซึ่งเป็นบริการด้าน AI พร้อมใช้บนขุมพลังของ Microsoft Azure แล้ว จะพบว่าตอนนำมาใช้งานในภารกิจหนึ่ง หรือโปรเจคหนึ่งของเรา มักจะมีการเอา Cognitive Service แต่ละตัวมาทำงานร่วมกันเสมอ 

ซึ่งหลังจากปล่อย Cognitive Service ออกมาได้พอสมควร ทาง Microsoft ก็เอา feedback จากผู้ใช้งานอย่างเราๆ (พลก็มีเสนอเข้าไปไม่น้อย) มาสร้างเป็น Solution ที่เจาะจงกับการใช้งานมากขึ้น และเรียกว่า Azure Applied AI Service นั่นเอง

## บริการต่างๆ ของ Azure Applied AI Service

Microsoft ได้แบ่งประเภทของบริการออกจากลักษณะการนำไปใช้งานในธุรกิจ ดังรายการด้านล่าง 

1. Conversation - Azure Bot Service
2. Documents - Azure Form Recognizer
3. Search - Azure Cognitive Search
4. Monitoring - Azure Metrics Advisor
5. Videos - Azure Video Analyzer
6. Accessibility - Azure Immersive Reader

ซึ่งปัจจุบันที่เขียนแนะนำอยู่นี่มี 6 ตัวที่สามารถนำไปใช้ได้อย่างเป็นทางการแล้ว แต่มีอีก 2 ตัวที่กำลังจะถูกเพิ่มเข้ามา ซึ่งเดี๋ยวจะเล่าแยกไว้ต่างหากครับ

## เมื่อไหร่ถึงจะใช้ Applied AI Service?

![when should I use Applied AI service?](azure-applied-ai-services/images/when-to-choose-ai.png)

ทีนี้พอมันมีกลุ่มบริการด้าน AI ถึง 2 กลุ่ม ทำให้พวกเราบางคนอาจจะสงสัยว่า "เอ้า แล้วเราจะใช้ Applied AI Service ตอนไหนล่ะ?"

เลยอยากเสนอแนวคิดง่ายๆ ครับ คือ Applied AI Service เนี่ย สร้างมาสำหรับงานเฉพาะทางมากๆ เช่น Form Recognizer Service ที่สร้างมาเพื่ออ่านข้อมูลจากเอกสารมาเป็นตัวแปรเพื่อส่งเข้าระบบโดยเฉพาะ

ซึ่งถ้าเกิดเคสการใช้งานของเรา ตรงกับตัวนี้ ก็สามารถเข้าไปดูวิธี และขอบเขตการใช้งานได้เลย 

แต่ถ้าเราต้องการวิเคราะห์รูปภาพเพื่อจำแนกภาพถ่ายเป็นกลุ่มต่างๆ ตัว Vision API ของ Azure Cognitive Service ก็จะตรงกับความต้องการของเราอยู่ดีครับ


## ศึกษาเพิ่มเติม 

ถ้าสนใจ สามารถไปศึกษาบริการอื่นๆ เพิ่มเติมได้จากทั้งของ Microsoft หรือที่พลเคยเขียน blog ไว้ได้เลย 

- [Microsoft Applied AI Services](https://azure.microsoft.com/en-us/product-categories/applied-ai-services/#overview)
- [เรื่อง Applied AI Service บน blog ของโค้ชพล](https://nextflow.in.th/tag/azure-applied-ai/)
