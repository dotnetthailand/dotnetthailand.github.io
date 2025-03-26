---
title: Why Orchard Core CMS?
showMetadata: true
editable: true
showToc: true
order: 0
---

# ลองพิจาณาเลือกใช้ Orchard Core CMS ถ้าคุณ:
- กำลังมองหา free open source software CMS เพื่อพัฒนา multi-purpose website
- ระบบที่สามารถให้ user ทำการ log in เข้าไปแก้ไข content ได้เลย
- ต้องการต่อยอดจากระบบที่มีโครงสร้างพื้นฐานที่มีหน้า admin, theme, user system, function พื้นฐานอื่นๆ ที่จำเป็น
  แล้วพัฒนาเพิ่มเพียงบางส่วน เพื่อประหยัดเวลาในการพัฒนา ทำการ release ได้ไว
- เบื่อกับการสร้างระบบเดิมๆ เมื่อเริ่ม project ใหม่ ก็ต้อง copy code ไปวางแบบ manual
- ต้องการใช้ระบบแนวเดียวกับ DJango, Drupal, Joomla แต่ extend ได้ดีกว่า Wordpress
- ไม่ต้องการใช้ SharePoint แต่ต้องการระบบที่มีลักษณะใกล้เคียงเพื่อพัฒนา WIKI, intranet website ในองค์กร
- ต้องการเขียน code สร้างเป็น module สามารถ reuse ได้จริง
- สามารถเปิดปิด module ที่หน้า admin ได้เลย เมื่อปิด module แล้ว ตัว features ทั้งหมด รวมถึง UI ก็จะหายไปด้วย
- ต้องการให้แต่ละ module เป็น self-contained feature ที่ประกอบไปด้วย model, view, controller (C# code) , HTML, JavaScript, TypeScript, CSS, SCSS, database migration มีความ portable นำไปใช้กับ project อื่นได้อย่างอิสระ
- ต้องการะบบที่รองรับ theme และสามารถ custom theme เองได้
- ต้องการ headless backend REST API เพื่อใช้กับ single page app หรือ Jamstack
- ต้องการใช้งาน Swagger เพื่อ API document
- ต้องการใช้งาน GraphQL
- ต้องการระบบที่รองรับ multi-tenant เพื่อการ deploy single code base รองรับลูกค้า
หลาย regions/courtiers/domains
  - ด้วย Multi-tenant ใน OrchardCore ทำให้เราสามารถ
  - ใช้พวก cloud service/server เพียงตัวเดียว ประหยัด cost เพราะบาง customers ก็ไม่ได้ใช้ resource เป็นจำนวนมาก ทำให้ utilize resource ได้เต็มที่
  - project เดียว/repo เดียว manage ได้ง่าย
  - deploy ครั้งเดียวสำหรับทุก customers
  - แต่ละ tenant ได้ code ใหม่หมด ไม่ต้องแยก deploy หลายตัว
  - มี feature flag เปิดปิดได้
  - จัดการ routing ไปแต่ละ tenant โดยทำเป็น subdomain แล้ว map มาที่ application ที่ run อยู่เพียงตัวเดียว
- ต้องการระบบที่รองรับ cross platform ทำงานได้ทั้งบนเครื่อง Windows server และ Linux server
- ต้องการใช้ Tech stack ใหม่ๆ
  - .NET Core
  - Static type/modern language - C#
  - ASP.NET Core MVC
  - TypeScript/ReactJS/VueJS
  - Hot reload, auto compile and reload browser during development
- ต้องการระบบที่รองรับฐานข้อมูลเหล่านี้
  - SQL Server
  - MySQL
  - Postgres
  - Sqlite

# แนวคิดการพัฒนา module ใน OrchardCore CMS
- ใน Orchard จะมี concept ของ content part, content type, content item
  - content part => group of reusable properties
  - content type => compose of multiple content parts, like a class
  - content item => object/instance from a class
- ตัวอย่างเช่น หากเราต้องการสร้าง Event content type เราจะก็สร้างขึ้นมาจาก parts ดังนี้:
  - TiltePart BodyPare
  - EventPart (my custom part)
  - AutoRoutePart
- จากนั้นนั้นเราก็ใช้ Event content type สร้าง Event content item ขึ้นมา

# ตัวอย่างการนำไปใช้ในงาน
- รับงานลูกค้าที่มี core พื้นฐานเหมือนกัน แต่ต่างกันในบางส่วน เราก็สร้าง custom modules ขึ้นมา เช่น
- ลูกค้า A ใช้งาน core modules + custom module A
- ลูกค้า B ใช้งาน core modules + custom module B
- อย่างไรก็ตาม บาง custom modules เราอาจะทำเป็น open source แล้วนำไปใช้กับลูกค้าท่านอื่น เราต้องมีสัญญาระบุให้ชัดเจน เพื่อจะไม่เกิดความเข้าใจผิดหรือฟ้องร้องกันในภายหลัง

# ประสบการณ์การส่วนตัวจากการใช้งาน Orchard CMS
- ผมได้สร้าง Orchard modules ไว้เป็น open source หลายตัว https://github.com/topics/orchard-module
- เมื่อเราสร้าง feature เป็น module แบบนี้ พอเรามี project ใหม่ๆ ก็เลือกเฉพาะตัวที่จะใช้ไปติดตั้ง
- ถ้าเราเพิ่ม features ใหม่ๆ ใน module ที่มีอยู่แล้ว เราก็สามารถ update ไปทุกๆ project ที่ติดตั้ง module นั้นได้เลย ผมใช้งานผ่าน git subtree
- module ตัวใดที่เราสามารถ share ได้ ก็ทำเป็น open source
- module ตัวใดที่เรา share ไม่ได้ก็ทำเป็น private module เก็บไว้ใน private repository
- การทำงานก็ใช้ technique git subtree ช่วยในการ maintain module แยกออกมาเป็น repository ของตัวเอง
- ตัวอย่าง open source custom modules ที่ผมสร้างไว้ https://github.com/topics/orchard-module
- Codesanook website https://www.codesanook.com/ สร้างด้วย Orchard CMS ได้ใช้ custom modules ดังต่อไปนี้
  - Codesanook.AmazonS3
  - Codesanook.Common
  - Codesanook.Configuration
  - Codesanook.FacebookConnect
  - Codesanook.Markdown
  - Codesanook.ReactJS (ReactJS server side rendering)
- ตัวอย่าง module อื่นๆ ที่น่าสนใจ ที่ผมได้ใช้กับ project อื่นๆ
  - Codesanook.AdministrativeDivision
  - Codesanook.Authorization
  - Codesanook.CloudWatchLogs
  - Codesanook.Log4netSmtpAppender
  - Codesanook.PushNotification push iOS and Android ผ่าน Google Firebase push service
  - Codesanook.Swagger
  - Codesanook.Youtube

# Useful links
- [OrchardCore CMS website](http://www.orchardcore.net/)
- [OrchardCore CMS GitHub repository](https://github.com/OrchardCMS/OrchardCore)
- [How to create a new custom module in OrchardCore CMS](https://github.com/codesanook/Codesanook.Map)

# Support
- ถ้าท่านใดมีข้อสงสัย หรือปัญหาเกี่ยวกับการใช้งาน OrchardCore CMS ท่านสามารถ:
  - สร้าง post ที่ [.NET Thailand group](https://www.facebook.com/groups/dotnetthailand)
  - ส่งข้อความมาที่ [Codesanook page](https://www.facebook.com/codesanookpage)
- ยินดี support OrchardCore CMS ครับ
