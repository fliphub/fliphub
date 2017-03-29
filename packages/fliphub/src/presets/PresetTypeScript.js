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
  toRollup() {
    const ts = require('rollup-plugin-typescript2')
    return {
      pluginIndex: 95,
      plugins: [
        ts(),
      ],
    }
  }

}
