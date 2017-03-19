const Visualizer = require('rollup-plugin-visualizer')
Visualizer({
  sourcemap: true,
})

const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
return builder.plugins.add(new BundleAnalyzerPlugin())
