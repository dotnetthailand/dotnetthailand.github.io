---
title: OAuth 2
showMetadata: true
editable: true
showToc: true
---

# Major components
- Resource owner (user)
- Client (application)
- Authorization server
- Resource server

# Client ID, Client Secret and Redirect URI
- Before a client application can request an access to resources on a resource server, the client application must be registered on an authorization server associated with the resource server.
- The registration is typically a one-time task. Once registered, the registration remains valid, unless the client app registration is revoked.
- At registration, the client application is assigned a client ID and a client secret (password) by an authorization server.
- An authorization server will use client ID and secret for authentication a client application and a redirect URI for sending a authorization code.

```mermaid
sequenceDiagram
  autonumber
  participant developer
  participant server as authorization server

  developer ->> server : Register a client application with a 'redirectURI' value.
  server ->> developer: Get assigned client ID and random secret (password).
```
---
- Client ID and secret are unique to a client application on that authorization server.
- All web, mobile or single page applications for the same client application have the same client ID specific to that authorization server.
- Given some scenarios that `application A` has many types of applications e.g. mobile, single page app:

```mermaid
  graph LR
      A[client application A, mobile app on user M's phone]---|client ID is 'ABC'|B[Authorization server X]

      C[client application A, single page app on user M's browser]---|client ID is 'ABC'|D[Authorization server X]

      E[client application A, mobile app on user N's phone]---|client ID is 'ABC'|F[Authorization server X]
```
---
- If a client application registers with multiple authorization servers (e.g. both Facebook, Twitter and Google), each authorization server will issue its own unique client ID to the client application.
- Given the following example:

```mermaid
  graph LR
      A[client application A, mobile app on user M's phone]---|client ID is 'ABC'|B[Authorization server X]

      C[client application B, mobile app on user M's phone]---|client ID is 'DEF'|D[Authorization server X]

      E[client application A, mobile app on user M's phone]---|client ID is 'XYZ'|F[Authorization server Y]
```
---
# Redirect URI
- During the registration the client also registers a redirect URI.
This redirect URI is used when a resource owner grants authorization to the client application.
- When a resource owner has successfully authorized the client application via the authorization server, the resource owner is redirected back to the client application to the redirect URI.
- ** ❗❗❗ Don't store a secret on mobile app and single page app.**
- For those kind of the app, use redirect URI and Authorization code grant type with PKCE for security.

# Sequence diagrams of each grant type

## Assumption
- We have registered user and client application on Authorization server database.
- Our authorization and resource are on the different machines.
- However, the authorization server may be the same server as the resource server or a separate entity as mentioned in https://tools.ietf.org/html/rfc6749#section-1.1

# Client credentials grant type
- client send client id and secret and get token in response body
- No URL redirect, if someone can steal id and secret, one can get an access token
- The main usage is for **server to server**.

---
# Authorization code grant type
- Unlike the Clients Credentials grant type, it involves a user for approval.
- This process requires a user to logged in before getting an authorization code.

```mermaid
sequenceDiagram
  autonumber
  participant user as user (resource owner)
  participant client as client (application)
  participant authorization_server as authorization server
  participant resource_server as resource server

  user ->> client: Log in to a client application
  client ->> authorization_server: Connect to an authorization server with client ID and redirect URI.
  authorization_server ->> user: Show a form to a user to log in and then ask a user to allow permissions (scopes).
  user --> authorization_server: Get approval from a user that a client app can access user's resources.
  authorization_server ->> client: Save an authorization code temporary and redirect to a redirect URI with an authorization code.
  client ->> authorization_server: Send HTTP POST with an authorization code to request tokens
  authorization_server ->> client: Verify the correctness of authorization code clientID, redirectURI. Then send access token and refresh token back.
  client ->> resource_server: Save tokens and request an API to access a user's resources with an access token in HTTP header.
```
- If someone can steal client ID and redirectURI, one can't get an authorization code because it requires a user to log in allow permission.
- However, a hacker can fake a redirect URI and an authorization code especially on mobile device.
---

# Authorization code grant type with PKCE to get access token

# What is PKCE?
- Proof Key for Code Exchange
- Usually pronounce 'Pixie'
- A superset feature on top of OAuth2 Authorization Code grant type
- OAuth 2.1 will force to use Authorization code grant type with PKCE.
- A hacker can get an authorization code and code challenge but cannot know a code verify. Then one cannot get an access token.

```mermaid
sequenceDiagram
  autonumber
  participant user as user (resource owner)
  participant client as client (application)
  participant verify as code verify
  participant challenge as code challenge
  participant authorization_server as authorization server
  participant resource_server as resource server

  user ->> client: Log in to a client application
  client ->> authorization_server: Create code verify, code challenge and connect to an authorization server with client ID, redirect URI, code challenge and code challenge method.
  authorization_server ->> user: Show a form to a user to log in and then ask a user to allow permissions (scopes).
  user --> authorization_server: Get approval from a user that a client can access user's resources.
  authorization_server ->> client: Save an authorization code and code challenge temporary and redirect to a redirect URI with an authorization code.
  client ->> authorization_server: Send HTTP POST with an authorization code and code verify to request tokens.
  authorization_server ->> client: Verify the correctness of code verify, code challenge, authorization code clientID, redirectURI and send access token and refresh token back.
  client ->> resource_server: Save tokens and request an API to access a user's resources with an access token in HTTP header.

```
# Authorization code flow with PKCE has some extra work as following
- Generation of code verify and code challenge
- Code verify is generated from a random string (>=43 characters)
- Code challenge is generated from `BASE64URL-ENCODE(SHA256(ASCII(code_verifier)))` as defined in https://tools.ietf.org/html/rfc7636#section-4.2
- Client send code challenge when connect to a authorization server for getting a  authorization code
- Client send code verify when exchange token with an authorization code

# Common mistakes
- Be careful for authorization code get URI encoded because it return as part of query string value
- We don't store client secret on a public client application e.g. mobile app, single page app, desktop app.
- https://www.oauth.com/oauth2-servers/mobile-and-native-apps/
- https://www.valentinog.com/blog/oauth2/

# Tips
- We use token as value of Authorization header when making a request to a resource server
```
  Authorization: `Bearer ${tokens.access_token}`
```

# Credit and Useful links
-  OAuth 2.0 กับ Grant Types ทั้ง 6 by Sakul Montha ttps://iamgique.medium.com/oauth-2-0-%E0%B8%81%E0%B8%B1%E0%B8%9A-grant-types-%E0%B8%97%E0%B8%B1%E0%B9%89%E0%B8%87-6-e9c82ca978b
- Express with TypeScript https://medium.com/the-andela-way/how-to-set-up-an-express-api-using-webpack-and-typescript-69d18c8c4f52
- JWT passport https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314
- Express Route with TypeScript https://dev.to/aryclenio/configuring-routes-in-nodejs-with-typescript-2281
- Passport Local https://github.com/jaredhanson/passport-local
- Get HTTP POST Body in Express.js https://stackabuse.com/get-http-post-body-in-express-js/
- cookie JWT https://dev.to/mr_cea/remaining-stateless-jwt-cookies-in-node-js-3lle
- custom authenticate function https://dmitryrogozhny.com/blog/easy-way-to-debug-passport-authentication-in-express
- oauth2orize_client_credentials_example https://github.com/reneweb/oauth2orize_client_credentials_example
- oauth2orize_authorization_grant_example https://github.com/reneweb/oauth2orize_authorization_grant_example
- mongojs https://howtonode.org/node-js-and-mongodb-getting-started-with-mongojs
- Building a RESTful API With Node — OAuth2 Server https://medium.com/@henslejoseph/building-a-restful-api-with-node-oauth2-server-4236c134be4
- check if cookie pass through HTTPS only https://security.stackexchange.com/a/101
- PKCE example https://github.com/Vavassor/Glance-March-2019/blob/master/controllers/oauth2.js
- https://mermaid-js.github.io/mermaid/#/sequenceDiagram
- Should we add role in JWT https://stackoverflow.com/a/53527119/1872200
- http://tutorials.jenkov.com/oauth2/authorization.html

