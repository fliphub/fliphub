type MiddlewareFn = (AppInterface, helpers) => Config

// @TODO: should defaults go per middleware, or per app config?

type MiddlewareObj = {
  // define which keys it is used for
  keys: ['html'] | 'html',

  // type: 'loaders,plugins,'

  // passes in the AppInterface
  // and the options specifically for this key
  //
  // ~~~~~
  // if key is an array, then it is an object with those keys
  // otherwise just an object
  // AppInterface.key
  // ~~~
  //
  // second param is helpers
  inject: MiddlewareFn,
}

type MiddlewareInterface = MiddlewareObj | MiddlewareFn
