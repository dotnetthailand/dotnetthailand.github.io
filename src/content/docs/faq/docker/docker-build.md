---
title: Docker build
showMetadata: true
editable: true
showToc: true
order: 6
---


# Docker Build คือ อะไร

build / buildx เป็นคำสั่งที่ช่วยแปลง Dockerfile ของเราไปเป็น Docker Image เพื่อเอาไปใช้งานต่อไป 

# การใช้งาน Docker Buid

- [docker build](https://docs.docker.com/engine/reference/commandline/build/) รูปแบบการใช้งาน โดยที่ 
  - `-t` กำหนดชื่อและ tag ของ image ที่จะสร้าง
  - `--no-cache` ไม่ใช้ cache ในการสร้าง image 
  - `[context]` ตำแหน่งของ Dockerfile กรณีที่อยู่ใน directory เดียวกันกับ Dockerfile ให้ใช้ `.` แทน แต่ถ้าไม่ใช่ให้ใช้ path แทน
  - `-f ` กรณีที่กำหนด Dockerfile เป็นชื่ออื่น
```
docker build  -t <Container_name:Tag_version> --no-cache [context]
```

- ตัวอย่างการใช้งาน

```
docker build -t inv-api:1.0.0 .
```

- ตัวอย่างการใช้งาน กรณีที่แยกกำหนดชื่อ Dockerfile เป็นชื่ออื่น

```
docker build -t inv-api:1.0.0 -f Dev.DockerFile
```

- ตัวอย่างการใช้งาน กรณีที่ไม่ใช้ cache ในการสร้าง image

```
docker build -t inv-api:1.0.0 --no-cache -f Prod.DockerFile
```

# การใช้งาน Docker Buildx

เนื่องการจากการใช้งาน docker build เดิมมีข้อจำกัดเรื่องของ Platform ทำให้เกิดปัญหาว่านักพัฒนาที่ใช้ CPU ARM ต้องไปหาเครื่องที่เป็น x86 / amd64 เพื่อ Build และใช้งาน ทาง docker เลยแก้ปัญหา โดยการพัฒนา [docker buildx](https://docs.docker.com/engine/reference/commandline/buildx/) ขึ้นมา

- build & push ขึ้น docker hub
หมายเหตุ ถ้า Build เฉยๆ เราจะไม่ได้ image ออกมา

```
docker buildx build --push --platform <platform> -t <Container_name:Tag_version> <context>
```

- ตัวอย่าง build & push ขึ้น docker hub

```
docker buildx build --push --platform linux/amd64,linux/arm64 -t pingkunga/first-buildx:1.0.0 .
```

- build & load เข้า local registry ของเครื่องเรา
ข้อจำกัด บิ้วได้ทีละ 1 platform

```
docker buildx build --load --platform <platform> -t <Container_name:Tag_version> <context>
```

- ตัวอย่าง build & load เข้า local registry ของเครื่องเรา
```
docker buildx build --load --platform linux/amd64 -t pingkunga/first-buildx:1.0.0 .
```

