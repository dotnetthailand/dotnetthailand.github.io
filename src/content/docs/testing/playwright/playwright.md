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
  ```sh
  $ mkdir playwright-getting-started
  $ cd playwright-getting-started
  ```
- Create a new Node.js project with default configuration.
  ```sh
  $ yarn init -y
  ```
- Install required Node packages. We will use `TypeScript` and `ts-jest` in this project.
  ```sh
  $ yarn add -D \
    @types/jest \
    add \
    jest \
    playwright \
    ts-jest \
    typescript
  ```
- Open `package.json` with your favorite text editor and you will find the content like as following code.
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
- Please be informed that you may get a newer version of NPM packages.

## Configure Jest
- Create `jest.config.js` at the root folder of your project and configure it to use `ts-jest` preset with the following code:
  ```js
  // jest.config.js
  module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
  };
  ```

## Writing your first test case
- Create a folder `src/__tests__` and add `homepage.test.ts` to the folder.
- Add test contents to `homepage.test.ts` with the following code:
  ```ts
  // src/__tests__/homepage.test.ts
  import { chromium } from 'playwright';

  // Use uppercase name for a test suite.
  describe('Homepage', () => {

    // Use lowercase name for a test case.
    test('should launch homepage with expected title', async () => {
      const browser = await chromium.launch();
      const context = await browser.newContext();

      const page = await context.newPage();
      await page.goto('https://todomvc.com');

      const pageTitle = await page.title();
      expect(pageTitle).toBe('TodoMVC');
      await browser.close();
    });
  });
  ```
- This test will launch `http://todomvc.com` with a headless Chromium.
- Verify if a page's title matches `TodoMVC` value.
- By default, Playwright will launch in headless mode so you won't see UI of a browser.
- You can make Playwright launch a UI browser by setting `chromium.launch({ headless: false })` option.

## Adding custom script to your package.json
- Add a custom script with the following content to to your `package.json`.
  ```json
  "scripts": {
    "test": "jest"
  },
  ```
- Then you will find the latest package.json looks like this:
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
  ```sh
  $ tree -I "node_modules" playwright-getting-started/
  playwright-getting-started/
  ├── jest.config.js
  ├── package.json
  ├── src
  │   └── __tests__
  │       └── homepage.test.ts
  └── yarn.lock
  ```

## Running our test case.
- In a terminal at the root level of the project, run the following command:
  ```sh
  $ yarn test
  ```
- Then you will find a passed result in a terminal as following:
  ```sh
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
- This code should work cross platforms, Windows, Mac and Linux (of course WSL2).
- I also tested this code on Windows and it worked well for built-in Webkit (Safari)
  `(import { webkit } from 'playwright';)` which is bundled with Playwright package.
- If Webkit engine does not work on your computer, please change the code to use `chromiume` or `firefox` instead.

# Use a React component name as a selector
Normally, we prefer to use CSS selector when getting an element to perform a action.
However, for we sometimes use CSS in React component e.g. style-components, emotion libraries.
Therefore, out CSS class name is auto-generated and we can't use it as a selector.

We can add `data-test-id` attribute to our component but we already have why don't we use it.
Here are overview of how we use `data-test-id` and `component name` selector.

## Use data-test-id attribute
- Add data-test-id attribute to React component that we are going to test.
- Use attribute selector `[data-test-id="component"]` to get a component.
- Use `babel-plugin-jsx-remove-data-test-id` to remove `data-test-id` attribute from a production build.
- If we have a tester who is responsible for creating an automated test,
  it is possible that a developer can forget to add `data-test-id` attribute.

## Use React component name
- Add `resq` library to a page that we are going to test and use it to query element with React component name.
- [cypress-react-selector](https://github.com/abhinaba-ghosh/cypress-react-selector#readme) uses `resq` under the hood to retrieve HTML nodes.
- Do not need to install any special Webpack plugin.
- A tester can use `react-devtools` to inspect React component name and use it as a selector.

## Code example
- Given, we have React component name like this:
  ```ts
    import { useState } from 'react';
    import { css } from '@emotion/react'

    function App() {
      const [counter, setCounter] = useState(0);

      const handleButtonClick = () => {
        const valueToAdd = 1;
        setCounter(previous => previous + valueToAdd);
      }

      const style = css`
        border: 1px solid #ccc;
      `;

      return (
        <div css={style}>
          <p>
            counter value:  <span>{counter}</span>
          </p>
          <button onClick={handleButtonClick}>Click me</button>
        </div>
      );
    }

    export default App;
  ```

- The example of that script to click a button and assert counter value
  ```ts
    import { chromium } from 'playwright';
    import { RESQNode } from 'resq';

    declare global {
      interface Window {
        resq: {
          resq$: (componentName: string, element: HTMLElement) => RESQNode
        }
      }
    }

    // Uppercase name for a test suite
    describe('Page with React component', () => {
      test('should get correct value after click button inside React component', async () => {
        // Arrange
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('http://localhost:3000');

        // React Element Selector Query (RESQ) helps us query React components and children by component name or HTML selector.
        // We need to have it on a page that we are going to test.
        // Therefore, we add req script to that page.
        // More info https://github.com/baruchvlz/resq
        await page.addScriptTag({ path: require.resolve('resq') });

        const reactComponentName = 'App';
        const rootElementHandle = await page.waitForSelector('#root');

        const result = await rootElementHandle.evaluateHandle((node: HTMLElement, componentName) => {
          const component = window.resq.resq$(componentName, node);
          return component.node; // div with CSS prop node
        }, reactComponentName);
        const tag = result.asElement();
        const button = await tag.$('button');

        // Actual
        await button.click();

        // Assert
        const counter = await tag.$('span');
        const value = await counter.evaluate(element => element.innerText);
        expect(Number(value)).toBe(1);
        await browser.close();
      });
    });
  ```
