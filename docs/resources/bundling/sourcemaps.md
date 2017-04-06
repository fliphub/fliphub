// https://webpack.js.org/guides/development/#source-maps
// where our files end up
output: {
  // files go into here
  path: outputPath,

  // files are accessible relatively with this path
  publicPath: '/',

  // your filename hash or whatnot as `filename` here
  // name of file and sourcemap
  // '[id].[file].[hash].js',
  filename: '[file].js',
  sourceMapFilename: '[file].map',
},
