// https://webpack.js.org/guides/development/#source-maps
https://webpack.js.org/loaders/source-map-loader/#components/sidebar/sidebar.jsx
https://webpack.js.org/plugins/source-map-dev-tool-plugin/#components/sidebar/sidebar.jsx
https://webpack.js.org/concepts/output/#output-sourcemapfilename

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
