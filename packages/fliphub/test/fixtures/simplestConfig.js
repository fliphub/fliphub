const path = require('path')

module.exports = function getFlips(silent = false) {
  const FlipHub = require('../../src')

  const config = {
    // will auto find root
    // root: path.resolve(__dirname, '../../'),
    apps: [{
      name: 'eh',
      entry: './src/index.js',
      output: './dist/simplestConfig',
    }],
  }

  // if (silent) config.debug = ['silent']

  const flips = new FlipHub(config)
  return flips
}
