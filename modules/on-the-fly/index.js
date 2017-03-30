const {resolve} = require('path')
const find = require('flipfile/find')
const flipResolve = require('mono-root')

module.exports = function runtimeConfig(configPath, directory, output = 'config.js') {
  const {FuseBox, BabelPlugin, TypeScriptHelpers} = require('fuse-box')
  console.log(configPath, directory)

  if (!directory) directory = flipResolve({depth: 1})
  const {dir, file, abs} = find(configPath, directory)
  const name = './.flip/' + (output || 'config.js')
  const nameAbs = resolve(dir, name)
  const outFile = resolve(dir, name)

  let contents = null
  class ConfigPlugin {
    constructor() {
      this.test = /\.(j|t)s(x)?$/
    }
    init(context) {
      this.context = context
      // console.exit(context.source)
    }
    transform(File, AST) {
      contents = File.contents
      // console.log({contents})
    }
  }

  // bundle for js or ts
  let plugin = BabelPlugin({
    config: {
      presets: [['env', {
        'targets': {
          'node': 'current',
        },
        'debug': false,
      }]],
    },
  })
  if (file.includes('ts')) plugin = TypeScriptHelpers()

  const fuse = FuseBox.init({
    debug: false,
    cache: false,
    log: false,
    homeDir: dir,

    // leave this out to use config plugin
    output: './.flip',

    // project: 'config',
    // globals: {'config': '*'},
    globals: {'default': '*'},
    plugins: [
      [
        plugin,
        new ConfigPlugin(),
      ],
    ],
  })

  const instructions = `> [${file}]`
  // console.log('...building config...', {instructions})
  console.log({
    debug: false,
    cache: false,
    log: false,
    homeDir: dir,

    // leave this out to use config plugin
    output: './.flip',

    // project: 'config',
    // globals: {'config': '*'},
    globals: {'default': '*'},
    plugins: [
      [
        plugin,
        new ConfigPlugin(),
      ],
    ],
  })
  console.log({
    debug: false,
    cache: false,
    log: false,
    homeDir: dir,

    // leave this out to use config plugin
    output: './.flip',

    // project: 'config',
    // globals: {'config': '*'},
    globals: {'default': '*'},
    plugins: [
      [
        plugin,
        new ConfigPlugin(),
      ],
    ],
  })
  console.log({
    debug: false,
    cache: false,
    log: false,
    homeDir: dir,

    // leave this out to use config plugin
    output: './.flip',

    // project: 'config',
    // globals: {'config': '*'},
    globals: {'default': '*'},
    plugins: [
      [
        plugin,
        new ConfigPlugin(),
      ],
    ],
  })


  fuse.bundle(name).instructions(instructions)
  return fuse.run().then((args) => {
    // console.log('...config built...', outFile)
    // const config = eval(contents)

    const config = require(name).default
    if (!config) return console.log('sorry, could not build eh')

    return Promise.resolve(config)
  })
}
