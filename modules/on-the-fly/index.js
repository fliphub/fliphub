const {resolve} = require('path')
const find = require('flipfind')
const del = require('flipfile/del')

module.exports = function runtimeConfig(configPath, directory, output) {
  const {FuseBox, BabelPlugin, TypeScriptHelpers} = require('fuse-box')

  if (!directory) directory = process.cwd()
  const {dir, file, abs} = find(configPath, directory)
  const name = './' + (output || '.flipconfig.js')
  const nameAbs = resolve(dir, name)
  const outFile = resolve(dir, name)
  // console.log({dir, name, nameAbs, outFile, configPath, file})


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

  // @TODO: may need more
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
    output: outFile,

    package: 'onthefly',
    // project: 'config',
    // globals: {'config': '*'},
    globals: {'onthefly': '*'},
    plugins: [
      [
        plugin,
        new ConfigPlugin(),
      ],
    ],
  })

  const instructions = `> [${file}]`
  // console.log('...building config...', {instructions})
  // console.log({
  //   debug: false,
  //   cache: false,
  //   log: false,
  //   homeDir: dir,
  //
  //   // leave this out to use config plugin
  //   output: outFile,
  //
  //   // project: 'config',
  //   // globals: {'config': '*'},
  //   globals: {'default': '*'},
  //   plugins: [
  //     [
  //       plugin,
  //       new ConfigPlugin(),
  //     ],
  //   ],
  // })

  fuse
    .bundle(name)
    .instructions(instructions)
    .completed(proc => {
      // console.log('...config built...', outFile)
      // const config = eval(contents)
      try {
        const config = require(nameAbs)
        if (!config)
          return console.log('sorry, could not build eh', require(nameAbs))
        del(nameAbs)
        return Promise.resolve(config)
      } catch (e) {
        console.log(e)
      }
    })

  return fuse.run()
}
