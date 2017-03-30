// @NOTE: used by fluse only for experimenting building it

global.cache = true
global.NODE_ENV = 'development'

const FlipBox = require('./middleout/core/FlipBox')
console._verbose(FlipBox)
const apps = [
  {
    name: 'timbucktwo',
    entry: './Composite.js',
    outFile: './dist/out.js',
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
    exclude: [
      'react',
    ],
    include: {
      'inferno': 'inferno',
    },
    ops: {
      compile: true,
    },
    compile: true,

    webpack: true,
    // fusebox: true,
    loaders: {
      'babel': true,
    },

    alias: {
      z: './z.js',
    },

    outFile: './dist/out.js',
    params: {
      path: './dist',
      filename: '[name].js',
    },
  },

  {
    name: 'onethreeshawn',
    entry: '../core/Events.js',
  },
]
const flip = FlipBox.init({
  apps: [apps[1]],
  // apps: [apps[0]],
  // apps,
  root: './middleout/',
  homeDir: './middleout/',
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



function sleepFor(sleepDuration) {
  var now = new Date().getTime()
  while (new Date().getTime() < now + sleepDuration) { /* do nothing */ }
}

// sleepFor(1000)

const built = flip.build()

// sleepFor(2000)

// console.log(built)
// logger(built, {color: 'bgRed.black', level: ' 🤦  badLog ', time: true, verbose: true})
badLog(built)

module.exports = built
// const bundling = flip.compile()
// badLog(bundling)

// //
// // built.debug()
// // console.log(flip)
// // console.log(built)
