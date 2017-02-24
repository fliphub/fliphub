var apps = [
  {
    name: 'verbose',
    port: (process.env.PORT || 3000),
    happypack: false,
    presets: ['verbose', 'react'],
    // @NOTE: this triggers package differ
    // pkg: {},

    configOut: './build/generated/basic.js',
    // outFileSourcemaps: '',

    // options to be merged into default loaders
    loaders: {
      babel: {
        exclude: /node_modules/,
      },
      'styleloader': {},
    },
    params: {
      entry: './src/front',
      output: {
        // files are accessible relatively with this path
        publicPath: '/',

        // name of file and sourcemap
        filename: '[id].[name].bundle.js', // '[file].js'
        chunkFilename: '[id].[name].bundle.js',
        sourceMapFilename: '[id][file].map',
      },
    },
    // if it has `html` flag, use that specific `html`
    flags: {
      names: ['html'],
      cb({html}) {
        if (!html) return {}
        var template = `./back/verbose/${html}.html`
        return {html: [{template}]}
      },
    },

    // load all html files in this dir
    html: {

      // dir: './back/verbose/',
      //    /Users/james/code/ds/back/webpack-env-builder/example/back/verbose
      dir: '/Users/james/code/ds/back/webpack-env-builder/example/build/verbose/',
    },

    // an obj, or array of objects
    copy: {from: './build/verbose/asset.js', to: './', force: true},

    loaderOptions: {
      options: {
        'worker': {
          output: {
            // this is for using multiple workers
            // filename: '[name].[id].[hash].webworker.js',
            filename: '[name].webworker.js',
            chunkFilename: '[id].webworker.js',
          },
        },
        'serviceworker': {
          output: {
            filename: '[name].serviceworker.js',
            chunkFilename: '[id].serviceworker.js',
          },
        },
      },
    },

    // clean: [outputPath],

    // flags: {
    //   // running disted output on dev server on production mode to test
    //   names: ['mockprod'],
    //   cb: ({mockprod}) => {
    //     if (!mockprod) return {}
    //     return {run: 'output'}
    //   },
    // },
    env: {
      // environment and lifecycle combined
      development: {
        // run dev server only on development env
        run: true,

        // development plugin
        define: {
          'DEV': 1,
        },

        // building on development
        build: {
          html: './src/built.html',
        },
      },
      production: {
        // is default
        uglify: true,
        defineProduction: true,
      },
    },
  },

  // run as many apps as you want simultaniously
  // test inferno and react side by side with the same code on different ports
  {
    name: 'intermediate',
    port: 3103,
    presets: ['inferno'],
    alias: {'hullabaloo': './src/backend/index.js'},
    // also works: alias: ['hullabaloo'],
    entry: './src/front/index.js',
    flags: [
      {
        names: ['html'],
        cb({html}) {
          if (!html) return {}
          var template = `./back/verbose/${html}.html`
          return {html: [{template}]}
        },
      },
      {
        names: [{flag: 'run', type: 'bool', default: false}],
        cb({run}) {
          return {run}
        },
      },
    ],
  },
]

module.exports = apps
