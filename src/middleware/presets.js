// http://stackoverflow.com/questions/19965844/lodash-difference-between-extend-assign-and-merge
var _defaultsDeep = require('lodash.defaultsdeep')
var _mergeWith = require('lodash.mergewith')

function customizer(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
}

function getPreset(name) {
  var presets = {
    // @TODO: when using react or inferno presets?
    'test': {
      cb(app, helpers) {
        Object.keys(app.loaders).forEach(key => {
          if (key.includes('style')) delete app.loaders[key]
        })
        // app.happypack = false
        return app
      },
      test: true,
      watch: true,
      onCompile(config, helpers) {
        helpers.log.text('onCompile')
        helpers.builder.auto()
      },
      // happypack: false,
      // polyfill: 'window',
      params: {
        target: 'node',
      },
      _loaders: [
        {
          test: /\.css$/,
          loader: 'null-loader',
        },
      ],
      loaders: {
        babel: {
          // @TODO:
          react: true,
          reactjsx: true,
        },
      },

      // https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md
      // https://github.com/airbnb/enzyme/blob/master/docs/guides/webpack.md
      externals: {
        // 'cheerio': 'window',
        'react/addons': 'react',
        'react/lib/ExecutionEnvironment': 'react',
        'react/lib/ReactContext': 'react',
      },
    },

    'karma': {
      cb(app, helpers) {
        app.testingSuite = 'karma'
        return app
      },
    },
    'mocha': {
      cb(app, helpers) {
        app.testingSuite = 'mocha'
        return app
      },
    },

    'node': {
      params: {
        target: 'node',
      },
      loaders: {
        babel: {
          reactjsx: false,
        },
      },
    },

    'react': {
      provide: {
        'React': 'react',
        'ReactDOM': 'react-dom',
        'Inferno': 'react',
      },
      loaders: {
        babel: {
          reactjsx: true,
        },
      },
    },
    'inferno': {
      // alias: ['inferno'],
      provide: {
        // 'React': 'react',
        // 'ReactDOM': 'react-dom',
        'Inferno': 'react',
      },

      // @TODO:
      // make compat with existing loader...
      // rehydratable babel-loader-builder
      loaders: {
        babel: {
          reactjsx: false,
          inferno: {
            imports: true,
            compat: true,
          },
          // plugins: [
          //   'inferno',
          //   ['module-resolver', {
          //     'root': ['.'],
          //     'imports': true,
          //     'alias': {
          //       'react': 'inferno-compat',
          //       'react-dom': 'inferno-compat',
          //       'react-dom/server': 'inferno-compat',
          //     },
          //   }],
          // ],
        },
      },
    },
  }

  return presets[name]
}


function presetter(app, helpers) {
  var merged = app

  app.presets.forEach(name => {
    var preset
    if (!preset) preset = presetter.getExtendedPreset(name)
    if (!preset) preset = presetter.getAddedPresets(name)
    if (!preset) preset = getPreset(name)

    if (app.debug && app.debug.presets) {
      helpers.log.text(name)
      if (app.debug.verbose) {
        helpers.log.verbose({preset})
        helpers.log.verbose({merged})
      }
    }

    _mergeWith(merged, preset, customizer)

    // so presets can decorate ^w^
    if (app.cb) {
      app = app.cb(app, helpers)
      delete app.cb
    }

    // will not merge array with obj
    // merged = _defaultsDeep(preset, merged)
  })
  return merged
}

presetter.addedPresets = presetter.addedPresets ? presetter.addedPresets : {}
presetter.extendedPresets = presetter.extendedPresets ? presetter.extendedPresets : {}
presetter.getPreset = getPreset

presetter.addPresets = function(presets) {
  presetter.addedPresets = presets
}
presetter.extendPreset = function(presets) {
  presetter.extendedPresets = presets
}
presetter.getAddedPresets = function(name) {
  return presetter.addedPresets[name]
}
presetter.getExtendedPreset = function(name) {
  var preset = getPreset(name)
  var extended = presetter.extendedPresets[name]

  if (!extended) return preset
  // @TODO: _.extend | defaultsDeep?
  // return Object.assign(preset, extended)
  return _defaultsDeep(preset, extended)
}

module.exports = presetter
