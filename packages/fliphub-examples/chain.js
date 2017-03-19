require('./flipbox')
// https://github.com/mozilla-neutrino/neutrino-dev/blob/master/packages/neutrino-preset-react/index.js
// const Chain = require('./node_modules_/flipbox/src/lib/webpack-chain/src/Config')
const Chain = require('./node_modules_/flipbox/packages/fusebox-chain/Config')
const fuse = new Chain()
const eh = fuse
  .cache()
  .log()
  .debug()
  .package('canadaEh')
  .globals({canadaEh: '*'})
  .target('node')
  .homeDir('./')
  .sourceMaps({vendor: true, project: true})

  .alias.from({
    'igloo': '~/igloo',
    'moose': '~/moose',
    'babel-utils': 'babel/dist/something/here/utils',
    'faraway': '~/somewhere/far/away/',
  })
  .shim({
    'react-native-web': {exports: 'require(\'react-native\')'},
  })
  .autoImport({
    Inferno: 'inferno',
  })

  .instruct()
    .entry('eh')
      .noDeps()
      .noCache()
      .execute('./eh')
      .exclude('dis')
      .include(['path', 'fs'])
      .add('eh')
    .entry('canada')
      .cache()
      .noApi()
      .vendor()
      .execute('/src/eh.js')
      .add('webworkerfile.js')
      .exclude('fs')
  .finish()

  .plugins
    .plugin('json')
    .plugin('html').use({default: true})
    .plugin('babel').from({
      'sourceMaps': true,
      'presets': [['env', {
        'targets': {
          'chrome': 56,
        },
      }]],
      'plugins': [
        'transform-react-jsx',
        'transform-object-rest-spread',
        'transform-decorators-legacy',
        'transform-class-properties',
        'add-module-exports',
      ],
    })
    .merge({
      alias: {
        'wut': 'y',
      },
      autoImport: {eeh: 'Oh'},
      shim: {'ehoh': {exports: 'wayohwehohwehohwehoh'}},
    })
    .toFuseBox()

    // .ops.bundle()
    // .sourceMaps().vendor(true).project(true)



  // .bundle()
  // .plugin('babel')
    // .sourceMaps()
    // .preset('env').target('chrome').above(56)
    // .plugins('jsx', 'spread', 'decorators', 'properties', 'exports')

  // @TODO: make ^ as fns?
    // .set('eh', '~/eh')
    // .merge({
    //   'igloo': '~/igloo',
    //   'moose': '~/moose',
    // }).end()
  // .bundle()

  // .finishBundle()
  // .finish();
  //
  // .bundle()
  // .toConfig()

// console.verbose(beh)
// console.verbose(chain)
console.verbose(eh)

// const {Fluent} = require('./node_modules_/flipbox/packages/fusebox-chain/ArithmeticsFluent')
// const fluent = new Fluent()
// const f = fluent
//   .start('eh')
//   .cache(true)
//   .noApi()
//   .execute('./eh')
//   // .onlyDeps()
//   .noDeps()
//   .exclude('wut')
//   .include(['path', 'fs'])
//   .add('eh')
//   .vendor(false)
//   .toConfig()
// console.verbose(f)



// @TODO: add into the config to chain from that
// const WebPack = require('./node_modules_/flipbox/packages/fusebox-chain/src/Config')
// const {FluentChain} = require('./node_modules_/flipbox/packages/fusebox-chain/ArithmeticsFluent')
// const fluent = new FluentChain()
// const f = fluent
//   .cache(true)
//   .noApi()
//   .execute('./eh')
//   // .onlyDeps()
//   .noDeps()
//   .exclude('wut')
//   .include(['path', 'fs'])
//   .add('eh')
//   .vendor(false)
//   .toConfig()
// console.verbose(f)

/**
 * - need to define shorthands
 */
 // 👀 - watch
 // 🎯 - target
 // 🤾 - server
 // 🔈 - log
 // 🗡️ - execute
 // 🏗 - build
 // 🗺 - source maps
 // 🔌 - plugin
 // 🔮 - fuse
 // ✚ - include
 // ℹ️️ - help info
 // 🏚️ - homedir
 //
 // - sourcemaps in lowercase instead of sourceMaps,
- main instead of entry,
- outFile instead of output,
- plugins instead of loaders + plugins
- autoImport instead of Provide
- package + globals instead of libraryTarget
- >[]+-->>>>~!-+^:= instead of words
- sourcemaps in lowercase instead of sourceMaps,
- homeDir instead of context
// const config = {
//   homeDir: './src',
//   outFile: './build/bundle.js',
//   log: true,
//   debug: true,
//   target: 'node',
//   plugins: [
//     fsbx.BabelPlugin({
//       config: {
//         'sourceMaps': true,
//         'presets': [['env', {
//           'targets': {
//             'chrome': 56,
//           },
//         }]],
//         'plugins': [
//           'transform-react-jsx',
//           'transform-object-rest-spread',
//           'transform-decorators-legacy',
//           'transform-class-properties',
//           'add-module-exports',
//         ],
//       },
//     }),
//     fsbx.JSONPlugin(),
//     fsbx.HTMLPlugin({useDefault: false}),
//     fsbx.SourceMapPlainJsPlugin(),
//   ],
//
//   shim: {
//     'react-native-web': {
//       exports: `require("react-native")`,
//     },
//   },
//
//   alias: {
//     'igloo': '~/igloo',
//     'moose': '~/moose',
//     'babel-utils': 'babel/dist/something/here/utils',
//     'faraway': '~/somewhere/far/away/',
//   },
//
//   autoImport: {
//     Inferno: 'inferno',
//   },
//   globals: {'canadaEh': '*'},
//   package: 'canadaEh',
//
//   sourceMap: {
//     vendor: true,
//     project: true,
//   },
// }
//
// const fuse = FuseBox.init(config)
// const instruct = {
//   'eh': `
//     > [eh.js]
//     -dis
//     +path
//     +fs
//     +eh
//   `,
//   'canada': `
//     ^
//     !
//     ~
//     >/src/eh.js
//     +webworkerfile.js
//     -fs
//   `,
// }

// fuse.bundle(instruct)











>[]+-->>>>~!-+

> [index.ts] + stuff
        --file out.js
        --devServer
        --watch
        >> app.js
    &&

    > ~ index.ts
        --watch
        >> vendor.js



.entry('index.js')
.execute()
.noDeps()
.add('stuff')
.out('out.js')
.vendor('> vendor.js')

.watch(['src/**/**.ts'])
.devServer()



.entry('> index.js')
.add('stuff')

.out()
  .entry('out.js')
  .vendor('vendor.js')

.watch(['src/**/**.ts'])
.bundle()
.devServer()






const config = {
  homeDir: './src',
  outFile: './build/bundle.js',
  log: true,
  debug: true,
  target: 'node',
  plugins: [
    fsbx.BabelPlugin({
      config: {
        'sourceMaps': true,
        'presets': [['env', {
          'targets': {
            'chrome': 56,
          },
        }]],
        'plugins': [
          'transform-react-jsx',
          'transform-object-rest-spread',
          'transform-decorators-legacy',
          'transform-class-properties',
          'add-module-exports',
        ],
      },
    }),
    fsbx.JSONPlugin(),
    fsbx.HTMLPlugin({useDefault: false}),
    fsbx.SourceMapPlainJsPlugin(),
  ],

  shim: {
    'react-native-web': {
      exports: `require("react-native")`,
    },
  },

  alias: {
    'igloo': '~/igloo',
    'moose': '~/moose',
    'babel-utils': 'babel/dist/something/here/utils',
    'faraway': '~/somewhere/far/away/',
  },

  autoImport: {
    Inferno: 'inferno',
  },
  globals: {'canadaEh': '*'},
  package: 'canadaEh',

  sourceMap: {
    vendor: true,
    project: true,
  },
}

const fuse = FuseBox.init(config)
const instruct = {
  'eh': `
    > [eh.js]
    -dis
    +path
    +fs
    +eh
  `,
  'canada': `
    ^
    !
    ~
    >/src/eh.js
    +webworkerfile.js
    -fs
  `,
}
fuse.bundle(instruct)
fuse.devServer(`
  :devServer

    > [index.ts] + stuff
        :watch=src/**/**.ts
        >> app.js
    &&

    > ~ index.ts
        :watch=src/**/**.ts
        >> vendor.js
`)
