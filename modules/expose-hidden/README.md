# expose-hidden 🔦

When extending objects in nodejs, Object.keys and Object.getOwnPropertyNames may not give you all of the methods on the object. Use expose hidden to re-expose the hidden methods.

```js
const exposeHidden = require('expose-hidden')
class Eh {
  hidden1() {}
  hidden2() {}
}
const eh = new Eh()

// @returns eh, it mutates so it does not need to return, but for convenience
exposeHidden(eh, thisArgToBindWith)

// using false will expose, but will not bind
exposeHidden(eh, false)
```
