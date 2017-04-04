# 🥕 mono-root

> find the root path in monorepos

### simple

```js
const {resolve} = require('path')
const monoRoot = require('mono-root')()

const pkg = resolve(monoroot, './package.json')
console.log(pkg)
```

### advanced

- the max `depth` it goes up can be customized
- and it can be returned as an object (`asObj`) to see the paths it used

```js
const {resolve} = require('path')
const monoRoot = require('mono-root')

const {
  nearest,
  farthest,
  attempt,
  found,
} = monoRoot({depth: 4, asObj: true})
```

## more
- see [fliphub-resolve](https://www.npmjs.com/package/fliphub-resolve) for more verbose use that resolves objects, arrays, with multiple scopes.
