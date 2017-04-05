## 📚 docs

### constructor
```js
/**
 * @event core.create
 * @param {Core} core
 * @param {object} coreConfig
 *
 * on, evt, once
 */
```

### reset
```js
/**
 * @see fliplog.reset
 * @see this.core.reset
 * @see this.evt.reset
 */
```

### contextNames
```js
/**
 * @see this.contexts
 * @return {Array<String>}
 */
```

### filterContexts(names)
```js
/**
 * filter the contexts
 * @see this.contextType
 * @param {Array<string>} names
 * @return {Workflow}
 */
```

### setContexts(contexts)
```js
/**
 * @param {Array<Context>} contexts
 * @return {Workflow}
 */
```

### setCurrentContext(name)
```js
/**
 * @param {string} name
 * @return {Workflow}
 */
```

### mapContexts(cb)
```js
/**
 * @param {Function} cb
 * @return {Array<any>}
 */
```

### emitForContexts(eventName)
```js
/**
 * @event context.*.any
 * @param {string} eventName
 * @return {Workflow}
 */
```

### coreCreate()
```js
/**
 * @event core.create
 * @return {Workflow}
 */
```

### coreInit()
```js
/**
 * @event core.init
 * @return {Workflow}
 */
```












# Event (available on workflow as .evt & .evts)
### constructor
```js
/**
 * @param {Workflow} parent
 * add shorthand methods to allow chaining
 */
```

### on(name = true, cb = null) {}
```js
/**
 * if they pass a string into `on` or `once`
 * instead of `name`, use that instead
 *
 * @see this.once
 * @param {string} [name]
 * @param {Function} [cb]
 * @return {EventChain}
 */
```

### once(name = true, cb = null) {}
```js
/**
 * if they pass a string into `on` or `once`
 * instead of `name`, use that instead
 *
 * @see this.on
 * @param {string} [name]
 * @param {Function} [cb]
 * @return {EventChain}
 */
```

### reset() {}
```js
/**
 * @return {EventChain}
 */
```

### getName() {}
```js
/**
 * take our chained settings
 * make it into a namespaced string event
 *
 *
 * @see this.workflow, this.context, this.core, this.name
 * @return {string | Object}
 */
```

### emit(data) {}
```js
/**
 * @see this.getName
 * @param {mixed} [data]
 * @return {EventChain}
 */
```

### cb(cb) {}
```js
/**
 * final piece in a chain
 * @see this.getName
 * @param {Function} cb
 * @return {EventChain}
 */
```
