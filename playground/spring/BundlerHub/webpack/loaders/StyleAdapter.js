class StyleAdapter {
  adapt() {
    const loader = {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
    }
    return loader
  }
}

module.exports = StyleAdapter
