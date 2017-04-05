<!-- ![fliphub-core]() -->

------------------

### add your own middleware
- you can add your own middleware before building apps
- the name of the middleware maps in as a hook for the properties on the app
- optional index property to insert middleware at any position
- [middleware interface][flow-middleware]

#### example
```js
fliphub.addMiddlewares({
  index: 999, // optional
  name: 'propertyOnApp',
  inject(app, helpers) {
    helpers.log.text('❗ middleware for `.propertyOnApp`!')
    return app
  },
})
```
