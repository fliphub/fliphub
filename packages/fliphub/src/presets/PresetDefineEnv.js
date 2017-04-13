const log = require('fliplog')

class PresetDefineEnv {
  // if this is defined, others are not
  // toConfig(bundler, app) {}
  // from() {}
  // to() {}

  constructor() {
    this.args = [process.env.NODE_ENV || 'development']
  }

  fromWebpack() {}
  fromRollup() {}
  fromFuseBox() {}

  setArgs(args) {
    if (args) this.args = args
  }

  // toConfig...
  toRollup() {
    const replace = require('rollup-plugin-replace')
    return {
      pluginIndex: 90,
      plugins: [
        replace({'process.env.NODE_ENV': JSON.stringify('production')}),
      ],
    }
  }
  toFuseBox() {
    const {FuseBox, ReplacePlugin} = require('fuse-box')

    return {
      pluginIndex: 90,
      plugins: [
        ReplacePlugin({'process.env.NODE_ENV': JSON.stringify('production')}),
      ],
    }
  }
  toWebpack() {
    const {EnvironmentPlugin, DefinePlugin} = require('webpack')
    return (config, workflow, neutrino) => {
      const envs = this.args
      const env = (Array.isArray(envs) ? envs : [])

      config
        .plugin('env')
        .use(EnvironmentPlugin, ['NODE_ENV', ...env])

      config
        .plugin('define')
        .use(DefinePlugin, ['process.env.NODE_ENV', ...env])

      // return config
    }
  }

  // this will allow manual merges for things like
  // output which is a `string` with an object like using `sourceMap`
  // could just be done in `to` tho
  mergeWebpack() {}
}

module.exports = PresetDefineEnv
