---
title: Robot
showMetadata: true
editable: true
showToc: true
---

# What are the reasons for Robot Framework not widely being used?

I pulled some comments from
https://www.quora.com/What-are-the-reasons-for-Robot-Framework-not-widely-being-used

Robot framework allows test cases to be written and read by people who don’t understand code.
When your test cases grow, the harder it will be to manage your robot framework.

Robot framework = keyword driven framework which is the old way of automated test design.
It's not designed for heavy maintenance, it's a feature attractive to many testers just starting to automate but not well suited for advanced frameworks.
The Robot framework may be useful as a start with test automation especially if there is no programming knowledge in the testing team.

However, there will be more and more limitations that will become visible as soon as things get more complicated.
These limitations can be overcome by using Selenium directly and a programming language instead of using the Robot framework.

Robot framework are satisfied in general with the results but had different challenges such as:

- How to open a Chrome extension in the browser?
- Obscure errors when synchronizing scripts with the site (explicit waits)
- Obscure errors when using tabs and browser windows
- How to save data in files?
- How to do continuous integration?

How to write a keyword driven test framework - an historical perspective
https://www.eviltester.com/blog/seleniumsimplified/2013-07-24-how-to-write-a-keyword-driven-test-framework-a-historical-perspective/

In general, the Robot framework is a DSL. [It's a 9 on the Configuration Complexity Clock.](http://mikehadlow.blogspot.com/2012/05/configuration-complexity-clock.html)

Article Summary: The dream is that non-technical users will be able to use the DSL. This sometimes works, but usually doesn't.
Usually the mapping of DSL concepts to technical concepts requires a programmer to write the tests.
Programmers would rather use a real programming language with good tooling.
