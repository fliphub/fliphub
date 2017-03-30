// https://github.com/TypeStrong/ts-loader
// https://www.npmjs.com/package/awesome-typescript-loader
class TypeScriptAdapter {
  adapt() {
    const query = JSON.stringify({
      transpileOnly: true,
    })
    const config = {
      test: /\.tsx?$/,
      loader: 'ts-loader',
      query,
    }
    return config
  }
}

module.exports = TypeScriptAdapter
