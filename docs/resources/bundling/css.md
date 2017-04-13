https://github.com/tomachristian/css-entry-webpack-plugin
https://css-tricks.com/css-modules-part-2-getting-started/
https://www.bensmithett.com/smarter-css-builds-with-webpack/
https://survivejs.com/webpack/styling/loading/
https://www.davidmeents.com/blog/journey-into-react-part-4-styling-with-scss-and-webpack/
https://blog.madewithenvy.com/webpack-2-postcss-cssnext-fdcd2fd7d0bd

https://github.com/jtangelder/sass-loader

https://neutrino.js.org/presets/neutrino-preset-web/
https://neutrino.js.org/middleware/neutrino-middleware-style-loader/

https://www.artembutusov.com/webpack-semantic-ui/
http://neekey.net/2016/12/09/integrate-react-webpack-with-semantic-ui-and-theming/


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
