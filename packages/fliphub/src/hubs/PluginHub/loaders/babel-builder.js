/**
* @param {?Object} options @see readme#defaults
 * @return {Object | String}
 */
module.exports = function(options) {
  var defaults = {
    env: false,
    latest: false,
    es2015: true,
    hot: false,
    react: false,
    reactjsx: false,
    asObject: false,
    stringify: false,
    production: false,
    babelrc: false,
    cacheDirectory: true,
    babili: false,
    moduleExports: true,
    inferno: false,
    async: true,
    decorators: true,
    classProperties: true,
    objectSpread: true,
    sourceMaps: true,
    alias: false,
    vue: false,
    stage: '0',
    plugins: [],
    presets: [],
  }
  options = Object.assign(defaults, options)

  // https://github.com/babel/babel-preset-env
  // if (options.env) {
  //   if (target) "node": "current"
  //   ["env", {
  //     "targets": {
  //       "browsers": ["last 2 versions", "safari >= 7"]
  //     }
  //   }]
  // }


  var presets = [
    'env',
    // https://babeljs.io/docs/plugins/preset-stage-0/
    // all presets from stage 1-3
  ].concat(options.presets)

  var plugins = [
    // supported by webpack2 already
    // 'transform-es2015-modules-commonjs',
  ].concat(options.plugins)

  // if (options.latest) {
  //   presets.push('latest')
  // } else {
  //   // if (options.es2015) {
  //   //   presets.push('es2015')
  //   // }
  //   // // default
  //   // if (!options.stage.includes('stage')) {
  //   //   options.stage = 'stage-' + options.stage
  //   // }
  // }
  // presets.push(options.stage)

  // @NOTE: order matters
  // @TODO: inferno & inferno-compat
  if (options.inferno) {
    var inferno = 'inferno-compat'
    var resolveInferno = {
      'root': ['.'],
      'alias': {
        'react': inferno,
        'react-dom': inferno,
        'react-dom/server': inferno,
      },
    }

    if (options.inferno.compat === false) {
      inferno = 'inferno'
    }
    if (options.inferno.imports) {
      resolveInferno['imports'] = true
    }

    plugins.push('inferno')
    plugins.push(['module-resolver', resolveInferno])
  }

  // needs to be before flowRuntime
  if (options.async) {
    plugins.push('transform-runtime')
    plugins.push('transform-regenerator')
    plugins.push('transform-async-to-generator')
  }
  if (options.asyncToPromise) {
    plugins.push('async-to-promises')
  }

  if (options.flowRuntime) {
    if (typeof options.flowRuntime === 'object') {
      plugins.push(['flow-runtime', {
        'assert': options.flowRuntime.assert,
        'annotate': options.flowRuntime.annotate,
      }])
    } else {
      plugins.push(['flow-runtime', {
        'assert': false,
        'annotate': true,
      }])
    }
  }
  if (options.stripFlow) {
    plugins.push('transform-flow-strip-types')
  }

  if (options.classProperties) {
    // es7 props
    plugins.push('transform-class-properties')
  }
  if (options.objectSpread) {
    // {...props}
    plugins.push('transform-object-rest-spread')
  }
  // @decorator
  if (options.decorators) {
    plugins.push('transform-decorators-legacy')
  }

  if (options.moduleExports) {
    // for .default handling
    plugins.push('add-module-exports')
  }

  if (options.react) {
    presets.push('react')
  }
  if (options.reactjsx) {
    plugins.push('transform-react-jsx')
  }
  if (options.hot) {
    plugins.push('react-hot-loader/babel')
    presets.push('react-hmre')
  }

  // babel minifier
  if (options.babili) {
    presets.push('babili')
  }

  if (options.alias) {
    plugins.push(['babel-plugin-webpack-aliases', {'config': options.alias}])
  }

  var prefix = ''

  if (!options.asObject && !options.stringify) {
    // because not all options can be put in the ,loaderformat[]=
    for (var i = 0; i < plugins.length; i++) {
      if (typeof plugins[i] !== 'string') {
        prefix = 'babel-loader?'
        options.stringify = true
        break
      }
    }
  }

  if (options.asObject || options.stringify) {
    var asObject = {plugins, presets}
    if (!options.babelrc) {
      asObject.babelrc = false
    }
    if (options.cacheDirectory) {
      asObject.cacheDirectory = true
    }
    if (options.sourceMaps) {
      asObject.sourceMaps = true
    }

    if (options.stringify) {
      return prefix + JSON.stringify(asObject)
    }
    return asObject
  }

  presets = 'presets[]=' + presets.join(',presets[]=')
  plugins = ',plugins[]=' + plugins.join(',plugins[]=')
  var babel = 'babel-loader?' + presets + plugins

  if (!options.babelrc) {
    babel += ',babelrc=false'
  }
  if (options.cacheDirectory) {
    babel += ',cacheDirectory=true'
  }

  return babel
}
