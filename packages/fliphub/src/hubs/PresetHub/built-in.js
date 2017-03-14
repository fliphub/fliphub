// http://stackoverflow.com/questions/19965844/lodash-difference-between-extend-assign-and-merge
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

    'babel-env': {
      loaders: {
        babel: {
          config: {
            // presets: ['env'],
            presets: [['env', {
              'targets': {
                'chrome': 56,
              },
              'debug': true,
            }]],
          },
        },
      },
    },
    'babel-latest': {
      loaders: {
        babel: {
          config: {
            // presets: ['env'],
            presets: ['latest'],
          },
        },
      },
    },
    'node': {
      params: {
        target: 'node',
      },
      loaders: {
        babel: {
          config: {
            // reactjsx: true,
            plugins: ['transform-react-jsx'],
            // plugins: [{reacxtjsx: false}],
          },
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
          config: {
            // plugins: [],
            plugins: ['transform-react-jsx'],
            // plugins: [{reactjsx: false}],
          },
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

  if (name === true) return presets
  return presets[name]
}

module.exports = getPreset
