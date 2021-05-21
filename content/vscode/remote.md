---
title: มา Dev กันแบบไม่ต้องลง SDK กันเถอะ (Developing inside a Container) 
showMetadata: true
editable: true
showToc: true
---



# หากคุณมีปัญหาหรือรู้สึกเบื่อเหนื่อยกับเรื่องเหล่านี้

- เบื่อกับการเตรียม environment ในการ dev หรือต้องมานั่งทำเอกสารเพื่อบอก team ว่าต้องใช้ Nodejs v. ไหน หรือ dotnet sdk version ไหน
- หรือเปลี่ยนเครื่องคอมใหม่แต่เหนื่อยกับการไล่ลง SDK ที่ต้องใช้ทำงาน
- อยากลอง SDK ใหม่ๆ แต่ก็กลัวว่าจะมีปัญหากับ project ที่ทำงานอยู่
- เพื่อนในทีมไม่ได้แม่นเรื่อง Docker แต่อยากให้เขาได้เริ่มใช้งาน
- อยากให้คนในทีมใช้ extensions ใน vscode ใน project เหมือนๆกัน

# dotnetthailand ขอเสนอ [Remote Development extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)

สิ่งที่ต้องเตรียมก็มี (เครื่องเปล่าเปิดซิงก็ทำตามได้ หรือมีอะไรลงไปแล้วก็ข้ามๆไป)

- ลง [Docker](https://docs.docker.com/get-docker/) ก่อนเลย
- แน่นอนลง [VS Code](https://code.visualstudio.com/download)
- เสร็จแล้วลง [Remote Development extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)
- แค่นั้นแหละจบ

# ก่อนไปลุยทำความเข้าใจมันนิดว่ามันทำงานยังไง

![alt text][architecture]

ref: https://code.visualstudio.com/docs/remote/containers

แบบสั้นๆ หลักการคือจะใช้เครื่องเราทำหน้าที่เก็บ code เฉยๆ และใช้ VS Code ที่ลงบนเครื่องทำหน้าที่แค่แสดงผล แต่กระบวนการ build, run อะไรก็ตามจะไปทำงานใน container โดยผ่านการ mount volume ของ code ที่เราทำงาน

ภาษาที่ Support:

- dotnet core 2, 3, 5
- nodejs 12, 14, 16
- PHP
- Golang
- Java
- Python
- Ruby
- Rust
- และอีกเพียบไปลองไล่ดูกันเอา

และไม่ใช่แค่สำหรับ dev อย่างเดียวแต่ยังมี container อย่าง azure cli, Docker in Docker, Kubernetes ที่ทำให้เราไม่ต้องมาลงของพวกนี้ในเครื่องอีกต่อไป ใช้ผ่าน container แล้วเขียน script โลด

# แล้ววิธีใช้ทำยังไง

ขอยกตัวอย่างจากการที่ผู้เขียนทำการ folk project web ตัวนี้เอามาเขียนเนื้อหานี่แหละ

1. แน่นอน clone code ลงมา (หรือจะสร้าง folder เปล่าก็ได้)
2. เปิด VS Code ปกติเราจะสั่งเปิด folder อย่าเพิ่งจิ้มให้กด cmd + P บน Mac (ผู้เขียนลืม Windows ไปแล้ว) แล้วเลือก *Remote-Containers: Open Folder in Container...*

![alt text][open]

3. ตัว web นี้ based on Node ก็แน่นอนเลือก Node ซิ และเลือกเป็น v 14 ด้วยนะ v 16 ผู้เขียนลองแล้ว build ไม่ผ่าน :P

![alt text][selectNode]
![alt text][v14]

4. รอไปซักพักนึงเพราะมันจะ build image ให้ในเครื่องเราแล้วจะ start ขึ้นมาให้แล้วเราจะเจอ folder *.devcontainer* พร้อมอีก 2 files ข้างใน

![alt text][devcontainer]

5. ตัว *devcontainer.json* หน้าตาตอนเปิดครั้งแรกก็จะประมาณนี้

```json
// For format details, see https://aka.ms/devcontainer.json. For config options, see the README at:
// https://github.com/microsoft/vscode-dev-containers/tree/v0.177.0/containers/javascript-node
{
	"name": "Node.js",
	"build": {
		"dockerfile": "Dockerfile",
		// Update 'VARIANT' to pick a Node version: 12, 14, 16
		"args": { "VARIANT": "14" }
	},

	// Set *default* container specific settings.json values on container create.
	"settings": { 
		"terminal.integrated.shell.linux": "/bin/bash"
	},

	// Add the IDs of extensions you want installed when the container is created.
	"extensions": [
		"dbaeumer.vscode-eslint"
	],

	// Use 'forwardPorts' to make a list of ports inside the container available locally.
	// "forwardPorts": [],

	// Use 'postCreateCommand' to run commands after the container is created.
	// "postCreateCommand": "yarn install",

	// Comment out connect as root instead. More info: https://aka.ms/vscode-remote/containers/non-root.
	"remoteUser": "node"
}
```

และเจ้า file นี่แหละที่จะมาเป็นตัวช่วยเราที่จะบังคับให้คนอื่นใช้ extensions ตามเราได้รวมถึงคำสั่ง command ที่อยากให้ run ตอน start container เสร็จ อย่างของผู้เขียน ก็ uncomment "postCreateCommand" บรรทัดนั้นไว้ เพราะ project นี้เขาใช้ yarn นะจ๊ะ ส่วนของการเพิ่ม extensions สามารถทำได้โดยเข้าไปเพิ่ม extension ตามปกติแล้วสั่ง *Add to devcontainer.json*

![alt text][saveextension]

6. ตรงขั้นนี้เนื่องจากจำเป็นต้อง install Yarn และ Gastby ด้วยแต่เราจะไม่สั่ง run install เองแต่จะให้มัน install เพื่อเป็น based อยู่ใน image สำหรับเครื่องเราเลย เพราะฉะนั้น เปิดตัว *.devcontainer/Dockerfile* มาแก้ไขนิดนึงต่อท้ายสุด

```
# [Optional] Uncomment if you want to install more global node modules
# RUN su node -c "npm install -g <your-package-list-here>"
RUN su node -c "npm install -g yarn gatsby-cli"
```
7. ถึงตรงนี้ทำการปิด vscode แล้วเปิดใหม่แบบเดิมอีกที แล้วตัว vscode จะถามว่าต้องการ build image ใหม่ไหม ก็สั่ง build ไป (ลืม cap รูป)

8. รอจนทุกอย่างเสร็จ อาจจะใช้เวลาสักพักนึง เพราะผู้เขียนเองก็ปล่อยทิ้งไว้ตอนมัน build image กับ run yarn install ที่ผ่านตัว postCreateCommand ที่เราตั้งค่าไว้

9. เมื่อทุกอย่างพร้อม ก็เปิด terminal สั่ง run command *yarn start* ตาม README ที่เขาว่า

10. แล้วผู้เขียน ก็ทำการเขียนเนื้อหาที่อันนี้นี่แหละ

![alt text][done]

## เพิ่มเติมนิดนึง

เหมือนจะ perfect สำหรับการ dev แบบไม่ต้องนั่งเตรียมเครื่อง (สำหรับครั้งถัดไป) เพราะเรา set แค่ครั้งเดียวที่เหลือคนอื่นแค่ clone code แล้วเปิดด้วยวิธีที่ว่ามา กับรอเวลานิดนึง แต่ทั้งนี้ผู้เขียนได้ลองเล่นกับ dotnet core 5 ก็ run ได้ปกติดี แต่หากลอง run แบบ watch รู้สึกช้าจนรำคาญ ด้วยไม่แน่ใจว่าปกติกว่ามันจะ refresh ให้ใช้เวลาแค่ไหน แต่จากที่ลองรู้สึกว่าช้า ขนาดแค่เติม html tag ยังใช้เวลาเกือบ 20 วิถึงจะเห็นผล เข้าใจว่าตัว dotnet มัน terminate process เดิมแล้ว start ใหม่เพราะดู tap PORTS จะเห็นว่า map port หายตอนสั่ง refresh แต่ปัญหานี้ไม่เกิดขึ้นนะกับตัว project web อันนี้ หรืออันอื่นที่ผู้เขียนลอง (SvelteKit ก็ด้วย)ก็ทำงานได้รู้สึกปกติเหมือน dev บน local ธรรมดาๆเลย และข้อดีอีกอย่างของตัวนี้เผื่อใครที่เคยลองทำ dotnet development โดยใช้ docker จะรู้ว่าตัว dotnet sdk image ยังไม่รองรับการ run watch เพราะพี่แกเล่น start live reload websocket port แบบ dynamic ทำให้เราคาดการณ์ไม่ได้ว่า ws จะใช้ port ไหน เลยทำ map port ไม่ได้ แต่ตัว extension นี้ฉลาดที่จะทำการ auto map port ให้เองอัตโนมัติ หรือจะกำหนด map port ตัว web ไว้ได้ล่วงหน้าเช่นกันใน *devcontainer.json* file 

ปล. ผู้เขียนทำ pull request ขอแก้ไปเรื่อง ws dynamic port แล้วรอวันเขา merge หากสนใจลองไปติดตามดูได้ที่ https://github.com/dotnet/sdk/pull/17072 

[architecture]: https://code.visualstudio.com/assets/docs/remote/containers/architecture-containers.png "Architecture"
[open]: images/open.png "Open Folder in Container"
[selectNode]: images/selectNodejs.png "Select Nodejs"
[v14]: images/v14.png "Select v14"
[devcontainer]: images/devcontainer.png "Dev Container"
[saveextension]: images/saveextension.png "Save Extension"
[done]: images/done.png "Done"