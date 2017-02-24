var apps = [
  {
    name: 'basic-tests-mocha',
    presets: ['react', 'test', 'mocha'],
    entry: './tests/backend.js',
  },
  {
    name: 'basic-tests-karma',
    presets: ['react', 'test', 'karma'],
    entry: './tests/frontend.js',
  },
]

module.exports = apps
