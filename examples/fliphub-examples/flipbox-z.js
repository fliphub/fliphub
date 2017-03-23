// global.cache = true
// global.NODE_ENV = 'development'
global.flipbox = true

// add inferno example...
// uglify
//
// console.log(FlipBox)

const FlipBox = require('./flipbox')
let externals = [
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
  // 'yargs', 'child_process',
]

const webpack = require('webpack')
// const fsbx = require('fsbx')
const apps = [
  // {
  //   homeDir: require('path').resolve(__dirname, '../'),
  //   name: 'itself',
  //   entry: './core/FlipBox.js',
  //   outFile: './z/dist/flipboxed.js',
  //   presets: ['node'],
  //   externals,
  // },
  //
  // {
  //   name: 'fusebox-plugins',
  //   entry: './empty/empty.js',
  //   outFile: './dist/provide.js',
  //   fusebox: true,
  //   define: {
  //     'eh': 'eh',
  //   },
  //   params: {
  //     shim: {
  //       'realm-utils': {
  //         exports: `require("realm-utils")`,
  //       },
  //     },
  //     // this works in a similar way to how things such as `process.env`
  //     // are automatically added for the browser
  //     autoImport: {
  //       // used any time we do `Inferno.anything` in the source code
  //       Inferno: 'inferno',
  //     },
  //     plugins: [
  //       fsbx.JSONPlugin(),
  //       // these css plugins are chained
  //       [
  //         fsbx.LESSPlugin(),
  //         fsbx.CSSPlugin({
  //           // file is the file.info.absPath
  //           // more info on that in the `Plugin API` section
  //           outFile: (file) => `./tmp/${file}`,
  //         }),
  //       ],
  //     ],
  //   },
  // },
  {
    name: 'webpack-plugins',
    entry: './src/empty/empty.js',
    outFile: './dist/provide.js',
    loaders: {},
    plugins: [
      new webpack.DefinePlugin({
        test: 'eh!',
      }),
    ],
  },
  {
    name: 'imports',
    entry: './src/import/a.js',
  },
  {
    name: 'provide-define',
    entry: './src/empty/empty.js',
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
    entry: './src/empty/empty.js',
  },
  {
    name: 'ts',
    entry: './src/z/ts.ts',
    loaders: {
      // WEBPACK PLUGIN HERE O.O
    },
  },
  {
    name: 'custom-env',
    entry: './src/empty/empty.js',
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
    name: 'emptyes6',
    entry: './src/empty/es6/empty.js',
    outFile: './dist/emptyes6.js',
    builder: 'rollup',
  },
  {
    name: 'blackhole',
    entry: './src/empty/empty2.js',
    outFile: './dist/blackhole.js',
  },
  {
    name: 'empty',
    entry: './src/empty/empty.js',
    outFile: './dist/empty.js',
    // instructions: '!>./src/empty/empty.js',
  },
  {
    name: 'rollup-a-bundle',
    entry: './src/z/rollup-a-bundle',
    outFile: './dist/empty-roll.js',
    builder: 'rollup',
  },
  {
    name: 'onethreeshawn',
    entry: {
      'mpty': './src/empty/empty.js',
      'mpty2': './src/empty/empty2.js',
      // 'Events': './core/Events.js',
    },
  },
  {
    name: 'multi-inout',
    entry: {
      'mpty': './src/empty/empty.js',
      'mpty2': './src/empty/empty2.js',
      // 'Events': './core/Events.js',
    },
    output: {
      path: './dist',
      filename: '[id].[hash].js',
    },
  },

  {
    name: 'timbucktwo',
    entry: './src/z/Composite.js',
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
    entry: './src/z/Composite.js',
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
      z: './src/z/z.js',
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
  apps,
  root: __dirname,
})


// apps: [apps[1]],
// apps: [apps[0]],
// apps: [apps[2]],
// root: require('path').resolve(__dirname, '../'),

// flip.addPreset({
//   'node': {
//     params: {
//       target: 'node',
//     },
//     loaders: {
//       babel: {
//         reactjsx: false,
//       },
//     },
//   },
// })
flip.addDefaults({
  addedDebug: true,
  debug: true,
})
// console._verbose(flip.evts)

const built = flip.build()
// badLog(built)
