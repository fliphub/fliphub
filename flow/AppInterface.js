type AliasType = string

// array of strings (resolved by resolver)
// object to extend
type Aliases = Array<AliasType> | string
type RelativePath = string
type AbsolutePath = string
type AnyPath = RelativePath | AbsolutePath

// keys to use to build a webpack config
type Params = WebpackConfig

type HTMLType = {
  file?: AnyPath,
  template?: AnyPath,
}

type WebpackConfig = {

}

// optional, gets assigned to the object
type BuilderType = {

}

type AppInterface = {
  // package: version, deps, flow, author, scripts

  name: ?string,

  // for running a server
  port: ?number,

  config?: AnyPath | WebpackConfig,

  alias: Aliases,

  html?: HTMLType,

  builder?: BuilderType,

  // @TODO:
  // - [ ] filter out or add mware
  // - [ ] use different output paths
  // - [ ] run this to overwrite ^
  env: {
    // environment and lifecycle combined
    development: {
      define: {
        'DEV': 1,
      },
      build: {},
    },
    production: {
      build: {},
      run: {},
      loaders: {
        strip: 'console',
      },
    },
  }
}
