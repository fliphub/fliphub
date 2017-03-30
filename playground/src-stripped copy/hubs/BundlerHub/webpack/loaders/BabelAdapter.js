class BabelAdapter {
  constructor() {
    this.test = /\.jsx?$/
    this.files = ['js']
    this.name = 'BabelAdapter'
    this.inspect = inspectorGadget(this)
  }
  adapt({settings}) {
    let loader = {
      loader: 'babel-loader',

      // http://stackoverflow.com/a/41375115
      // @TODO: default on build
      // exclude: [
      //   /node_modules\/babel-/m,
      //   /node_modules\/babel-runtime/m,
      //   /node_modules\/core-js\//m,
      //   /node_modules\/regenerator-runtime\//m,
      //   /node_modules\/webpack-\//m,
      //   /node_modules\/happy-\//m,
      //   /node_modules\/lodash\//m,
      //   /node_modules\/html-\//m,
      //   /node_modules\/core-js\//m,
      // ],
    }

    let query = {}
    if (settings.config) query = settings.config
    if (settings.query) query = settings.query
    else if (settings.params) query = settings.params
    loader.query = query

    loader.exclude = settings.exclude || /node_modules/
    if (settings.include) loader.include = settings.include
    loader.test = settings.test || /\.jsx?$/

    console._log(loader, {level: '🗼 babel', verbose: true})

    if (typeof loader.query !== 'string')
      loader.query = JSON.stringify(loader.query)

    settings.set(loader)
    return loader
  }
}

module.exports = BabelAdapter
