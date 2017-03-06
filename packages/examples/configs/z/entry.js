// global.cache = true
// global.NODE_ENV = 'development'
global.flipbox = true

const FlipBox = require('../core/FlipBox')

var externals = [
  'realm-js', 'realm-utils',
  'webpack', 'fuse-box', 'fusebox', 'fsbx', 'happypack',
  'bluebird', 'fsevents',
  'string-replace-webpack-plugin', 'webpack-bundle-analyzer',
  'mocha', 'karma', 'karma-sinon-chai',
  'karma-mocha-reporter', 'karma-notify-reporter',
  'nwb', 'clean-webpack-plugin',
  'jsdom-global', 'jsdom', 'express', 'buble',
  'json', 'json-loader',
  // './dist/flipbox.js': './dist/flipbox.js',
  // 'yargs',
  // 'child_process',
]

// add inferno example...
// uglify
//
// console.log(FlipBox)

const webpack = require('webpack')
const fsbx = require('fsbx')
const apps = [
  {
    homeDir: require('path').resolve(__dirname, '../'),
    name: 'itself',
    entry: './core/FlipBox.js',
    outFile: './z/dist/flipboxed.js',
    presets: ['node'],
    externals,
  },
  {
    name: 'fusebox-plugins',
    entry: './empty.js',
    outFile: './dist/provide.js',
    define: {
      'eh': 'eh',
    },
    params: {
      shim: {
        'realm-utils': {
          exports: `require("realm-utils")`,
        },
      },
      // this works in a similar way to how things such as `process.env`
      // are automatically added for the browser
      autoImport: {
        // used any time we do `Inferno.anything` in the source code
        Inferno: 'inferno',
      },
      plugins: [
        fsbx.JSONPlugin(),
        // these css plugins are chained
        [
          fsbx.LESSPlugin(),
          fsbx.CSSPlugin({
            // file is the file.info.absPath
            // more info on that in the `Plugin API` section
            outFile: (file) => `./tmp/${file}`,
          }),
        ],
      ],
    },
  },
  {
    name: 'webpack-plugins',
    entry: './empty.js',
    outFile: './dist/provide.js',
    loaders: {},
    plugins: [
      new webpack.DefinePlugin({
        test: 'eh!',
      }),
    ],
  },
  {
    name: 'provide-define',
    entry: './empty.js',
    outFile: './dist/provide.js',
    provide: {

    },
    define: {
      'eh': 'eh',
    },
    plugins: [
      new webpack.DefinePlugin({
        test: 'eh!',
      }),
    ],
  },
  {
    name: 'only-entry',
    entry: './empty.js',
  },
  {
    name: 'ts',
    entry: './ts.ts',
    loaders: {
      // WEBPACK PLUGIN HERE O.O
    },
  },
  {
    name: 'custom-env',
    entry: './empty.js',
    loaders: {
      babel: {
        presets: ['env'],
      },
    },
    // env: {
    //   production: {
    //     uglify: false,
    //   },
    // },
  },
  {
    name: 'empty',
    entry: './empty.js',
    outFile: './dist/empty.js',
  },
  {
    name: 'onethreeshawn',
    entry: {
      'mpty': './empty.js',
      'mpty2': './empty2.js',
      'Events': '../core/Events.js',
    },
  },
  {
    name: 'multi-inout',
    entry: {
      'mpty': './empty.js',
      'mpty2': './empty2.js',
      'Events': '../core/Events.js',
    },
    output: {
      path: './dist',
      filename: '[id].[hash].js',
    },
  },

  {
    name: 'timbucktwo',
    entry: './Composite.js',
    outFile: './dist/out.js',
    // loaders: [
    //   'babel',
    // ],
    loaders: {
      'babel': true,

      // 'eh': 'canada',
    },
  },
  {
    flags: {
      names: ['mocks'],
      cb: ({mocks}) => {
        console._text('flag cb!')
        // console.log(mocks)
        // process.exit(1)
      },
    },
    name: 'eh',
    presets: ['node'],
    entry: './Composite.js',
    html: '#aw',
    externals: {
      'fs': 'fs',
    },
    exclude: [
      'react',
    ],
    include: {
      'inferno': 'inferno',
    },
    // ops: {
    //   compile: true,
    // },
    // run: true,

    // webpack: true,
    // fusebox: true,
    loaders: {
      'babel': true,
    },

    alias: {
      z: './z.js',
    },

    sourcemaps: true,

    outFile: './dist/out.js',
    params: {
      path: './dist',
      filename: '[name].js',
    },
  },
]
const flip = FlipBox.init({
  // apps: [apps[1]],
  // apps: [apps[0]],
  // apps: [apps[2]],
  apps,
  root: __dirname,
  // root: require('path').resolve(__dirname, '../'),
})

// logger(flip, {color: 'bgRed.black', level: ' 🤦  badLog ', time: true, verbose: true})
flip.addPreset({
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
})
flip.addDefaults({
  addedDebug: true,
  debug: true,
})
// console._verbose(flip.evts)

function sleepFor(sleepDuration) {
  var now = new Date().getTime()
  while (new Date().getTime() < now + sleepDuration) { /* do nothing */ }
}

const built = flip.build()
// const built = require('./dist/flipboxed')

// sleepFor(2000)
// sleepFor(4000)

// console.log(built)
// logger(built, {color: 'bgRed.black', level: ' 🤦  badLog ', time: true, verbose: true})
badLog(built)
// badLog(flip.apps.apps)

// const bundling = flip.compile()
// badLog(bundling)

// //
// // built.debug()
// // console.log(flip)
// // console.log(built)
