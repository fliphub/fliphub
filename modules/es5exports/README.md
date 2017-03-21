## example
```js
const es5exports = require('es5exports')

const obj = {core: true}
const export1 = {prop1: true}
const export2 = {prop2: true}

exports.one = export1
exports.two = export2
exports['default'] = obj

module.exports = es5exports(exports['default'], exports)
```
