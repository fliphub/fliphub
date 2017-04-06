// polyfills
// jsdom
// babel-polyfill

// we run this after the params so we don't affect that middleware's magic
module.exports = function(app, helpers) {
  if (!app.polyfill) return app
  if (!Array.isArray(app.polyfill)) app.polyfill = [app.polyfill]
  app.polyfill.forEach(polyfill => {
    // string -> eh -> [polyfills, eh]
    // obj -> {eh: canada} -> [polyfills, {eh: canada}]
    if (['object', 'string'].includes(typeof app.webpack.entry))
      app.webpack.entry = [app.webpack.entry]

    // @TODO: have a list of valid polyfills and option to validate??
    // app.webpack.entry.unshift(polyfill)
  })

  return app
}
