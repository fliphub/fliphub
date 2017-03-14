// @TODO: if it is .ts, use .ts loader?
module.exports = function(configPath, dir) {
  const path = require('path')
  console.log('flip!')
  let split, configFile, configFileAbs, homeDir

  if (dir) {
    homeDir = dir
    configFile = configPath
    if (!configFile.includes('ts') && !configFile.includes('js'))
      configFile += '.js'
    configFileAbs = path.resolve(dir, configFile)
  } else {
    // @TODO: cwd
    split = configPath.split('/')
    configFile = split.pop()
    homeDir = split.join('/')
  }

  console.log('finding config...')
  console.log({configFile, homeDir, split, configFileAbs})

  let contents = null
  class ConfigPlugin {
    constructor() {
      this.test = /\.(j|t)s(x)?$/
    }
    init(context) {
      this.context = context
      // console.exit(context.source)
    }
    transform(file, ast) {
      contents = file.contents
      console.verbose(contents)
    }
  }


  const fsbx = require('../BundlerHub/fusebox/api')
  const FuseBox = fsbx.FuseBox

  // bundle for js or ts
  let plugin = fsbx.BabelPlugin({
    config: {
      presets: [['env', {
        'targets': {
          'node': 'current',
        },
        'debug': false,
      }]],
    },
  })
  if (configFile.includes('ts')) plugin = fsbx.TypeScriptHelpers()

  const f = './.flipbox' + '/es5config.js'
  const outFile = path.resolve(homeDir, f)
  // configFile.replace('.ts', '').replace('.js', '') + '.js'
  // console.exit({f, homeDir, outFile})

  const fuse = FuseBox.init({
    debug: true,
    cache: false,
    log: true,
    homeDir,

    // leave this out to use config plugin
    outFile,

    project: 'cliFlip',
    globals: {'cliFlip': '*'},
    plugins: [
      [
        plugin,
        new ConfigPlugin,
      ],
    ],
  })

  const instructions = `> [${configFile}]`
  console.log('...building config...', {instructions})
  fuse.bundle(instructions).then((args) => {
    console.log('...config built...', outFile)
    const config = eval(contents)

    // @TODO: re-enable
    // const config = require(outFile)

    console.verbose({config})
    if (!config) return console.log('sorry, could not build eh')
    
    // config.root = path.resolve(homeDir, config.root)
    config.root = homeDir
    const FlipBox = require('../../core/FlipBox')
    const flip = FlipBox.init(config)
    const built = flip.build()
    console.verbose(built)
  })
}
