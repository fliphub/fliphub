- http://jonathancreamer.com/advanced-webpack-part-1-the-commonschunk-plugin/
- http://webpack.github.io/docs/code-splitting.html#chunk-loading

# nodejs
- https://github.com/webpack/webpack/issues/959
- https://github.com/webpack/webpack/issues/2030
- https://github.com/webpack/webpack/issues/959#issuecomment-183132192

```js
// where our files end up
output: {
  // files go into here,
  // @NOTE: should be absolute
  path: outputPath,

  // files are accessible relatively with this path, very important
  // https://webpack.js.org/guides/public-path/#components/sidebar/sidebar.jsx
  publicPath: '/',

  // name of file, name is entry name, unfortunately cannot use [file]
  // https://webpack.js.org/configuration/output/#output-filename
  filename: '[id].[name].bundle.js',

  // https://webpack.js.org/configuration/output/#output-chunkfilename
  chunkFilename: '[id].[name].bundle.js',

  // https://webpack.js.org/configuration/output/#output-sourcemapfilename
  // [name], [id], [hash] and [chunkhash]
  sourceMapFilename: '[id][file].map',
},
```
