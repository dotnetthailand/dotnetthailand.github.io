---
title: Playwright
showMetadata: true
editable: true
showToc: true
---

# 🎭 Playwright Node.js

# How to setup and use Playwright (minimum setup)

## Creating Node.js project

- Install Node.js
- Install Yarn
- Create a new empty folder.

```
mkdir playwright-getting-started
cd playwright-getting-started
```

- Create a new Node.js project with a default configuration.

```
yarn init -y
```

- Install required Node packages. We will use TypeScript and ts-jest in this project.

```
yarn add -D \
  @types/jest \
  add \
  jest \
  playwright \
  ts-jest \
  typescript \

```

- Open package.json with your favorite text editor and you will find the content like this.

```json
{
  "name": "playwright-getting-started",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "devDependencies": {
    "@types/jest": "^26.0.22",
    "jest": "^26.6.3",
    "playwright": "^1.10.0",
    "ts-jest": "^26.5.4",
    "typescript": "^4.2.3"
  }
}
```

- Please be informed that you may get a newer version of this packages.

## Configure Jest

- Create `jest.config.js` at root of your project and configure to use `ts-jest` preset.

```js
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
```

## Writing your first test case

- Create folder `src/__tests__` and add `homepage.test.ts` in it.
- Add test content to `homepage.test.ts` as the following code:

```ts
import { webkit } from 'playwright';

// Uppercase name for a test suite
describe('Homepage', () => {

  // Lowercase name for a test case
  test('should launch homepage with expected title', async () => {
    const browser = await webkit.launch();
    const context = await browser.newContext();

    const page = await context.newPage();
    await page.goto('https://todomvc.com');

    const pageTitle = await page.title();
    expect(pageTitle).toBe('TodoMVC');
    await browser.close();
  });
});

```

- This test will launch `http://todomvc.com` with Webkit (Safari engine).
- Verify if page's title matches TodoMVC.
- By default Playwright will launch in headless mode so you won't see UI of a browser.
- You can make Playwright launch your browser by use this option `webkit.launch({ headless: false })`.

## Adding custom script to your package.json

- Add a custom script with the following content to to your package.json

```json
  "scripts": {
    "test": "jest"
  },
```

- Then you will find you latest package.json will look like this.

```json
{
  "name": "playwright-getting-started",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "test": "jest"
  },
  "devDependencies": {
    "@types/jest": "^26.0.22",
    "jest": "^26.6.3",
    "playwright": "^1.10.0",
    "ts-jest": "^26.5.4",
    "typescript": "^4.2.3"
  }
}
```

## Checking the project file structure
- Here is the file structure in our project.
```
playwright-getting-started/
├── node_modules
├── src/__tests__/homepage.test.ts
├── jest.config.js
├── package.json
└── yarn.lock
```
## Running our test case.
- In terminal at root level of the project, run the following command.
```
$ yarn test
```
- Then you will find pass result in a console.
```
yarn run v1.22.5
$ jest
 PASS  src/__tests__/homepage.test.ts (6.782 s)
  Homepage
    √ should launch homepage with expected title (4101 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        6.878 s, estimated 7 s
Ran all test suites.
Done in 8.15s.
```

## Note
- This code should work cross platform, Windows, Mac, Linux
- I tested this code on Windows and it works well for built-in Webkit that is bundled with Playwright.
- If the code does not work on your computer, please configure the code to use `chromiume` or `firefox`.

