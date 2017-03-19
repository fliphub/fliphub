// do like webpack, default to webpack
// https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsDefaulter.js#L35
const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')
const log = require('fliplog')
const is = require('izz')

class ConfigDefaulter extends ChainedMapExtendable {
  static init(parent) { return new ConfigDefaulter(parent) }
  decorate(app, bundler) {
    let flips = app.get('flips')

    // default to webpack
    if (!flips) {
      flips = {
        from: 'webpack',
        to: 'webpack',
      }
      app.flips(flips)
      // log.data(app).text('appconfig').verbose(true).echo()
    }

    // if not flipping `to` anything, to is the same as from
    if (flips.from && !flips.to) app.flips({from: flips.from, to: 'webpack'})
    if (!flips.from && flips.to) app.flips({from: 'webpack', to: flips.to})
    return this
  }
}

module.exports = ConfigDefaulter
