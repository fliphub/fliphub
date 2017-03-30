// https://github.com/AngularClass/angular-seed
// https://github.com/nitrogenlabs/arkhamjs-skeleton/blob/master/build/config.js
// https://github.com/bultas/minimal/blob/master/webpack.config.js
//
//
// !!!!!
// https://github.com/webpack/webpack/blob/master/schemas/webpackOptionsSchema.json
// https://github.com/js-dxtools/webpack-validator/tree/master/src
// https://github.com/hapijs/joi
interface WebpackConfig {
  cache?: boolean,
  target?: string,
  devtool?: string,
  entry: Entry,
  output: any,
  module?: any,
  // module?: {
  //   preLoaders?: Array<any>;
  //   loaders?: Array<any>;
  //   postLoaders?: Array<any>
  //   rules...
  // };
  plugins?: Array<any>,
  resolve?: {
    unsafeCache?: boolean | Array<string>,
    root?: string,
    extensions?: Array<string>,
  },
  devServer?: {
    staticOptions?: any,
    setup?: (app: any, fs?: any) => any,
    compress?: boolean,
    quiet?: boolean,
    contentBase?: string,
    port?: number,
    historyApiFallback?: boolean,
    hot?: boolean,
    inline?: boolean,
    host?: string,
    https?: boolean,
  },
  node?: {
    process?: boolean,
    global?: boolean | string,
    Buffer?: boolean,
    crypto?: string | boolean,
    module?: boolean,
    clearImmediate?: boolean,
    setImmediate?: boolean,
    clearTimeout?: boolean,
    setTimeout?: boolean
  },
}
