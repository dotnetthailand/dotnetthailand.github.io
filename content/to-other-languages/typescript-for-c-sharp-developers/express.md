---
title: Express
showMetadata: false
editable: true
showToc: true
---

# Global exception handler
## Useful links
- [Error Handling from Express document](https://expressjs.com/en/guide/error-handling.html)
- [Central Error Handling in Express](https://dev.to/nedsoft/central-error-handling-in-express-3aej)
- [Default error message in Express](https://github.com/expressjs/express/blob/master/examples/error-pages/views/500.ejs#L3)

## Example code
- Custom Error class
```ts
// HttpError.ts
export default class HttpError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
  }
}
```
- Custom error handler
- Define it as a last middleware, after other app.use() and routes calls.
```ts
// app.ts
import HttpError from './HttpError';
// .... other stuff

app.get('/error', () => {
  throw new HttpError('Invalid input', 422);
});

app.use((err, req, res, next) => {
  const { statusCode, message, stack } = err;
  const jsonBody = { status: 'error', statusCode, message };

  res.status(statusCode).json(
    process.env['NODE_ENV'] === 'production'
      ? jsonBody
      : { ...jsonBody, stack } // Show stacktrace if not production
  );
});
```
