// convert from loaders
// https://webpack.js.org/configuration/module/#module-rules
module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                sourceMap: true,
                localIdentName: '[path]--[name]-[local]--[hash:base64:5]',
              },
            }],
        }),
      },
    ]
  },

  loader: 'babel-loader',
  query: {
    babelrc: false,
    presets: ['latest'],
    plugins: ['babel-plugin-transform-react-jsx'],
  },
