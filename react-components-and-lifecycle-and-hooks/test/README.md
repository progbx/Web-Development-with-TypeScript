# Tests Related Description

## Known issues

### "SyntaxError: Unexpected token export" error in tests

There is an issue with `Jest` and `Babel`: [details](https://stackoverflow.com/questions/49263429/jest-gives-an-error-syntaxerror-unexpected-token-export)

In a nutshell you receive: `"SyntaxError: Unexpected token export"` when you try to import some module from `node_modules` to your tests.

By default `Jest` doesn't transform packages from `node_modules`: <https://jestjs.io/docs/configuration#transformignorepatterns-arraystring>.

So, to fix that we must force `Jest` to ignore package we want to use in our tests.

We already doing that for other packages, so to fix it for a new package, please go to `jest.config.js`, and update the `transformIgnorePatterns` property:

```js
{
    transformIgnorePatterns: [
        "node_modules/(?!(hex-rgb))",
        "node_modules/(?!(YOUR_MODULE_NAME))"
    ]
}
```
