https://css-tricks.com/css-modules-part-2-getting-started/
https://www.bensmithett.com/smarter-css-builds-with-webpack/
https://survivejs.com/webpack/styling/loading/
https://www.davidmeents.com/blog/journey-into-react-part-4-styling-with-scss-and-webpack/
https://blog.madewithenvy.com/webpack-2-postcss-cssnext-fdcd2fd7d0bd
https://github.com/dinbror/blazy
https://webpack.js.org/plugins/commons-chunk-plugin/#explicit-vendor-chunk

module: {
    rules: [
        { test: /\.scss$/, exclude: /node_modules/, loaders: ['to-string-loader', 'css-loader', 'postcss-loader', 'sass-loader'] }
    ]
},
plugins: [
    new CheckerPlugin(),
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: [
                stripInlineComments(),
                autoprefixer(),
            ]
        }
    })
]
