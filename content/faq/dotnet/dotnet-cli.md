---
title: การใช้งาน DOTNET CLI
showMetadata: true
showToc: true
tocDepth: 1
---

# การกำหนดเวอร์ชันของ dotnetให้กับโปรเจค

ในกรณีที่เรามี dotnet sdk หลายเวอร์ชันในเครื่องเดียวกัน โดยค่าเริ่มต้น dotnet จะเรียกใช้เวอร์ชันล่าสุดแม้จะเป็น Preview ก็ตาม ซึ่งบางครั้งเราอาจต้องการติดตั้ง Preview เพื่อไว้ลองศึกษา และมีเวอร์ชัน LTS หรือ Stable เพื่อไว้สำหรับพัฒนาโปรเจค ดังนั้น เพื่อไม่ให้เวอร์ชันของ dotnet sdk ชนกัน เราสามารถตรวจสอบว่าเครื่องของเราติดตั้ง dotnet sdk เวอร์ชันอะไรไว้บ้างด้วยคำสั่ง

```sh
dotnet --list-sdks
```

จากนั้น เราสามารถกำหนด directory-scoped ให้กับเวอร์ชันของ dotnet sdk ด้วยการสร้าง global.json ด้วยคำสั่ง

```sh
dotnet new globaljson
notepad ./global.json
```

จากนั้นให้ใช้โปรแกรมแก้ไขเวอร์ชันใน sdk:versions เป็นเวอร์ชันล่าสุด 5.0.400 เช่น

```
{
  "sdk": {
    "version": "5.0.400"
  }
}
```

จากนั้น ทุกไดเรกทอรีที่เป็นไดเรกทอรีย่อยทั้งหมดจะใช้เวอร์ชันของ dotnet sdk เป็น 5.0.400 หรือจนกว่าจะเจอ global.json ใหม่


# การกำหนดประเภทของ Authentication ให้กับโปรเจค MVC

สำหรับโปรเจค MVC นั้น ผู้ใช้งานสามารถกำหนดการ Authentication เริ่มต้นของโปรเจคได้ เนื่องจากหากผู้อ่านใช้คำสั่ง

```sh
dotnet new mvc
```

โปรแกรม dotnet cli จะสร้างเฉพาะตัวอย่างของเว็บ MVC ที่ไม่มีการ Authentication หากต้องการระบุให้มีการ Authentication สามารถใช้คำสั่งด้วยพารามิเตอร์ --auth เช่น

```sh
dotnet new mvc --auth Individual
```

จากตัวอย่างคำสั่ง จะสร้างระบบ Authentication ด้วย ASP.NET Identity ที่ใช้ local database ซึ่งหากสร้างโปรเจคนี้ใน Visual Studio โปรแกรม Visual Studio จะเลือกใช้ฐานข้อมูล SQL Server LocalDB ให้อัตโนมัติ แต่ว่าหากพิมพ์คำสั่งนี้ผ่าน dotnet cli โปรแกรมจะเลือกใช้ฐานข้อมูล SQLLite ให้อัตโนมัติ ดังนั้น ในกรณีที่ต้องการใช้ SQL Server LocalDB ผู้อ่านสามารถใช้คำสั่ง

```sh
dotnet new mvc --auth Individual --use-local-db
```

แต่เมื่อสร้างโปรแกรมโดยเริ่มต้น โปรเจคจะไม่สนับสนุน Razor runtime compilation หมายความว่าหากเราแก้ไขหน้า View แล้วจะต้อง compile โปรเจคใหม่อีกครั้งจึงจะเห็นการเปลี่ยนแปลง เราสามารถกำหนดให้ติดตั้งแพ็คเกจ  Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation  ผ่าน nuget หลังการสร้างโปรเจค ด้วยคำสั่ง

```sh
dotnet add package Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation
```

หรือใช้พารามิเตอร์ --razor-runtime-compilation เมื่อตอนสร้างโปรเจค เช่น

```sh
dotnet new mvc --auth Individual --use-local-db --razor-runtime-compilation
```

จากนั้นเปิด Startup.cs
แล้วแก้ไข

```csharp
    services.AddControllersWithViews();
```
เป็น
```csharp
    services.AddControllersWithViews()
            .AddRazorRuntimeCompilation();
```
