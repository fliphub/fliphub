// @TODO: if it is .ts, use .ts loader?
module.exports = function(configPath) {
  const split = configPath.split('/')
  const file = split.pop()
  const homeDir = split.join('/')

  let contents = null
  class configPlugin {
    constructor() {
      this.test = /\.(j|t)s(x)?$/
    }
    init(context) {
      this.context = context
      // console.exit(context.source)
    }
    transform(file, ast) {
      contents = file.contents
    }
  }

  const fsbx = require('fsbx')
  const FuseBox = fsbx.FuseBox
  const fuse = FuseBox.init({
    debug: true,
    cache: false,
    homeDir,
    project: 'cliFlip',
    globals: {'cliFlip': '*'},
    plugins: [
      [
        fsbx.BabelPlugin({
          config: {
            presets: [['env', {
              'targets': {
                'node': 'current',
              },
              'debug': false,
            }]],
          },
        }),
        new configPlugin,
      ],
    ],
  })
  fuse.bundle('>[' + file + ']').then((args) => {
    contents = eval(contents)
    contents.root = require('path').resolve(homeDir, contents.root)
    // contents.root = homeDir
    // console.exit(contents.root)
    const FlipBox = require('../../core/FlipBox')
    const flip = FlipBox.init(contents)
    const built = flip.build()
    console.verbose(built)
  })
}
