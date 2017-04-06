const {resolve} = require('path')
const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')
const timer = require('fliptime')
const log = require('fliplog')
// const isRel = require('flipfile')
const Config = require('./Config')

module.exports = class FuseBoxBundler extends ChainedMapExtendable {
  constructor(parent, context) {
    super(parent)
    this.context = context
    this.config = new Config(this)
  }
  toConfig() { return this.config.toConfig() }

  // @TODO: this should be in a `.toFuseBox`
  build() {
    timer.start('fusebox')
    const {FuseBox} = require('fuse-box')
    // const {FuseBox} = require('../../../../../../fuse-box')

    const config = this.config.toConfig()
    const name = this.context.name
    const root = this.context.root || this.parent.workflow.root
    const entry = config.entry
    const {plugins} = config

    // config.output = 'dist/$name.js'
    config.log = config.debug = true
    config.homeDir = root
    // config.cache = false
    // log.quick(config)

    const absOut = require('path').resolve(config.homeDir, config.output)
    config.output = resolve(root, config.output)

    log
      .reset()
      .emoji('fusebox')
      // .tags('fusebox,config,build,ops')
      .text('fusebox config')
      .color('bold')
      .data({config, name, entry})
      .verbose()
      .echo()

    const fuse = FuseBox.init(config)
    fuse.bundle(name + '.js')
      .instructions(`${entry}`)
    const run = fuse.run()

      // .sourceMaps(true)
      // .watch('server/**') // watch only server related code.. bugs up atm
      // .instructions(`*.js`)
      // Execute process right after bundling is completed
      // launch and restart express
      // .completed(proc => proc.start())
      // .completed((proc) => {
      //   timer.stop('fusebox').log('fusebox')
      // })

    log
      .text('fuse,verbose,inside,instance,bundler,config')
      .verbose(100)
      .data({fuse, run})
      .color('bold')
      .text('fuse inside')
      .reset()

    return new Promise(resolve => {
      run.then(() => {
        log
          .data(absOut, config.root, config.homeDir, config.output)
          .text('fuse config')
          .echo()
        // const output = require(absOut)
        // log.data(output, absOut, config.root, config.homeDir, config.output).echo()
      })
      setTimeout(resolve, 2000)
    })
  }
}
