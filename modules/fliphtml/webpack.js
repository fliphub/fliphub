const HtmlWebpackPlugin = require('html-webpack-plugin')

// @TODO: make sure to use safety when assigning things like this
function HtmlFromSelectorPlugin(options) {
  HtmlFromSelectorPlugin.selector = options.selector
}

HtmlFromSelectorPlugin.prototype.apply = function(compiler) {
  compiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, callback) => {
      let html = htmlPluginData.html.split('<body>')
      const selector = '<body>' + HtmlFromSelectorPlugin.selector
      html[0] += `<body><div id="${selector}"></div>`
      htmlPluginData.html = html.join('')
      callback(null, htmlPluginData)
    })
  })
}

module.exports = {HtmlFromSelectorPlugin, HtmlWebpackPlugin}
