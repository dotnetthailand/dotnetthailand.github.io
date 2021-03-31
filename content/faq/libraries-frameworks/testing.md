---
title: Testing
showMetadata: true
editable: true
showToc: true
---

# Test Framework
- [xUnit](https://github.com/xunit/xunit)
- [NUnit](https://github.com/nunit/nunit)
- Moq

# Mocking Libraries

- [FakeItEasy](https://github.com/FakeItEasy/FakeItEasy)
- [NSubstitute](https://github.com/nsubstitute/NSubstitute)
- [Moq](https://github.com/moq/moq)

# E2E testing
- Cypress
- Puppeteer
- Playwright
- Selenium

# Playwright
- Test Safari ได้
- JavaScript/TypeScript document https://playwright.dev/docs/core-concepts/
- Python document https://playwright.dev/python/docs/core-concepts/
- Java document https://playwright.dev/java/docs/core-concepts
- JS/TS มี document ที่ playwright.dev => native, first class citizen อยู่แล้ว
- Java มี document ที่ playwright.dev => target คนเขียน Selenium
- Java มี document ที่ playwright.dev => target tester ที่ใช้ Python
- C# ยังไม่มี document ที่ playwright.dev => low priority ที่ไปดูที่ github https://github.com/microsoft/playwright-sharp 🤣

# Testing public URL
- ngrok

## Configure ngrok for multiple ports
- Open ~/.ngrok2/ngrok.yml
- Add the following contents:

```yaml
authtoken: your token
tunnels:
  first:
    addr: 3000
    proto: http
  second:
    addr: 3001
    proto: http
```
- Start ngrok with a command:
```shell
./ngrok.exe start --all
```
- More info https://stackoverflow.com/a/38645042/1872200


