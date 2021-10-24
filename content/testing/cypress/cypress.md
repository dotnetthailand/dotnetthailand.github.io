---
title: Cypress
showMetadata: true
editable: true
showToc: true
---

# Cypress
- A complete end-to-end testing experience.
- All-in-one testing framework, assertion library, with mocking and stubbing, all without Selenium.

## Why Cypress
- Cypress does not use Selenium.
- Cypress focuses on doing end-to-end testing REALLY well.
- Cypress works on any front-end framework or website.
- Cypress tests are only written in JavaScript.
- Cypress is all in one. Writing end-to-end tests takes a lot of different tools to work together. 
- Cypress is for developers and QA engineers.
- Cypress runs much, much faster. These architectural improvements unlock the ability to do TDD with full end-to-end tests for the very first time.
- Slack Integration
- GitHub Integration
- Cypress is built for scale, No matter how big (or small) your project

### How it works
- Setup to record tests, See how many tests failed or passed - and how healthy they are. Get the entire stack trace of failed tests. View screenshots taken on test failure.
- Run in CI, Easily integrate Cypress with your current CI provider. Such as Jenkins, Travis CI, Circle CI, Docker
- Optimize tests

### To install Cypress

```cs
$ npm install cypress 
```
or
```cs
$ yarn add cypress
```

#### Try to use
```cs
$npx cypress open

$vi package.json
//package.json
"scripts": {
     "cypress:open": "cypress open",
     "test": "echo \"Error: no test specified\" && exit 1"
},
$npm run cypress:open
```

#### Try to visit cypress web
```cs
$touch cypress/integration/example.spec.js

describe('My First Test', function() {
     it('Visits the Kitchen Sink', function()
          cy.visit('https://example.cypress.io')
     })
})

$npm run cypress:open
```

#### Try to visit and click something
```cs
$touch cypress/integration/example.spec.js

describe('My First Test', function() {
     it('Visits the Kitchen Sink', function()
          cy.visit('https://example.cypress.io')
          cy.contains('type').click()
     })
})

$npm run cypress:open
```

#### Try to visit and type an email to input box then assert
```cs
$touch cypress/integration/example.spec.js

describe('My First Test', function() {   
     it('Gets, types and asserts', function() {    
          cy.visit('https://example.cypress.io')     
          cy.contains('type').click()      
          // Should be on a new URL which includes '/commands/actions'     
          cy.url().should('include', '/commands/actions')
          // Get an input, type into it and verify that the value has been updated
          cy.get('.action-email')       
               .type('fake@email.com')       
               .should('have.value', 'fake@email.com')   
     }) 
})

$npm run cypress:open
```

### Support Browser
- Chrome
- Firefox
- Edge
- Electron
- Brave

### Link and Example
- [Cypress.io](https://www.cypress.io/dashboard)
- [มาเขียน End-to-End Testing ด้วย Cypress.io และ ลองทำ Login Facebook กันเถอะ](https://medium.com/cypress-io-thailand/มาเขียน-end-to-end-testing-ด้วย-cypress-io-และ-ลองทำ-login-facebook-กันเถอะ-8eb0431ff96f)