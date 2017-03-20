class PresetDefineEnv {
  // if this is defined, others are not
  // toConfig(bundler, app) {}
  // from() {}
  // to() {}

  fromWebpack() {}
  fromRollup() {}
  fromFuseBox() {}

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
    return (neutrino, envs = [process.env.NODE_ENV || 'development']) => {
      neutrino.config
      .plugin('env')
      .use(EnvironmentPlugin, ['NODE_ENV', ...(Array.isArray(envs) ? envs : [])])

      return neutrino.config
      .plugin('define')
      .use(DefinePlugin, ['process.env.NODE_ENV', ...(Array.isArray(envs) ? envs : [])])
    }
  }

  // this will allow manual merges for things like
  // output which is a `string` with an object like using `sourceMap`
  // could just be done in `to` tho
  mergeWebpack() {}
}

module.exports = PresetDefineEnv
