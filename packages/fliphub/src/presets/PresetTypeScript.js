// "awesome-typescript-loader": "^3.0.8",
// "ts-loader": "^2.0.1",
// "typescript": "^2.2.1",
// https://github.com/TypeStrong/ts-loader
// https://www.npmjs.com/package/awesome-typescript-loader
// class TypeScriptAdapter {
//   adapt() {
//     const query = JSON.stringify({
//       transpileOnly: true,
//     })
//     const config = {
//       test: /\.tsx?$/,
//       loader: 'ts-loader',
//       query,
//     }
//     return config
//   }
// }

// https://blog.mariusschulz.com/2016/06/27/bundling-es2015-modules-with-typescript-and-rollup
module.exports = class PresetTypeScript {
  setArgs(args) {
    this.args = args
  }
  toRollup() {
    const rollupTypescript = require('rollup-plugin-typescript')
    // const ts = require('rollup-plugin-typescript2')
    return {
      pluginIndex: 95,
      plugins: [
        // ts(this.args),
        rollupTypescript(),
      ],
    }
  }
  toFuseBox() {
    console.log('fusebox has ts support built in :-)')
  }
  toWebpack(config, workflow) {
    // workflow.log.quick(workflow.current.bundler.api.config)
    const ts = require('awesome-typescript-loader')
    console.log(config)
    workflow.current.bundler.api.config.module
      .rule('awesome-typescript-loader')
      .test(/\.tsx?$/)
      .use('awesome-typescript-loader')
        .loader(require.resolve('awesome-typescript-loader'))
    // workflow.log.quick(workflow.current.bundler.api.config)

    // return {
    //   module: {
    //     rules: [
    //       {
    //         test: /\.tsx?$/,
    //         use: ['awesome-typescript-loader'],
    //       },
    //     ],
    //   },
    // }
  }
}
