const Analyze = {
  name: 'analyze',
  on: ['*.analyze'],
  handle({builder}) {
    const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
    return builder.plugins.add(new BundleAnalyzerPlugin())
  },
}

module.exports = Analyze
