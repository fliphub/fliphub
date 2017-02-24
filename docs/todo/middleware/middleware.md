## middlewares
- [ ] split up middleware/plugins
- [ ] transformers, parsers, gatherers, scripts, translation layers (build system compats)

- [x] autoresolve if needed, with keys, use in html plugin
- [ ] split up  plugins so that
  - [ ] the program actually registers the middleware
  - [ ] and allows users to do the same
- [ ] remove middleware fn

## html
- [x] if html is not a path, and is a string, use that for the id of the root div


## config out
- [x] output built config
- [x] output the webpack config to a file or callback,
- [ ] https://github.com/inxilpro/node-app-root-path

## init
- [x] add init middleware to do initial conversions,
  - [ ] should probably split for each type such as loaders and plugins
  - [ ] add more hooks for middleware such as going before other middleware (pre.mwarename)
  - [ ] should be able to extend middleware
