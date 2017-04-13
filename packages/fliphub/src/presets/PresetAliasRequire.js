const Aliaser = require('fliphub-alias')
const log = require('fliplog')

// @example:
// alias: {'hullabaloo': './src/backend/index.js'},
module.exports = class PresetRequireAlias {
  constructor() {
    this.args = []
  }
  // keys() {
  //   return ['resolveAlias']
  // }
  //
  // would be optional, could just `transform` and do everything in appInit
  //
  // would this be called *after* boxInit?
  // must be since it is after initting box per app...
  //
  // only called if at least 1 key is set?
  // or automagically call like `handle${key}`?
  // handleKeys
  //
  setArgs(args = []) {
    this.args = args
  }

  // @TODO:
  // only resolve if we have resolve preset...
  // which means this goes before the resolve preset
  decorate(context) {
    const workflow = context.workflow
    const config = context.bundler.config
    const presets = context.presets

    let aliases
    const hasResolve = presets.hasUsed('resolveAlias')

    this.aliaser = new Aliaser(context.config.get('root'), this.args.dir)
    // log.quick(context, workflow)

    if (hasResolve) {
      const resolveAlias = presets.list.get('resolveAlias')
      const dir = this.args.dir
      const files = this.args.files

      // if it is an array val with no dir
      // if (!files && !dir) files = resolveAlias
      // if (!files) files = this.args.files
      // if (!dir) dir = this.args.dir

      // default to box root, or override
      // if (dir) this.aliaser.setDir(dir)

      // do the magic
      aliases = this.aliaser.requireAndHandle(files)
    } else {
      aliases = this.aliaser.requireAndHandle(this.args.files)
    }
    this.aliases = aliases

    const resolveAlias = {resolve: {alias: aliases}}

    // handle merging
    if (config.alias) config.merge(resolveAlias)
    else config.merge(resolveAlias)

    // log.quick(config)
  }

  toRollup(config) {
    const aliasPlugin = require('rollup-plugin-alias')
    const {alias} = config.get('resolve')
    config.delete('resolve')
    return {
      plugins: [
        aliasPlugin(alias),
      ],
    }
  }

  // @TODO: only add to bundler here... could delete or add...
  toWebpack(config) {
    // const aliases = this.aliases
    // const resolveAlias = {resolve: {alias: aliases}}
    // // handle merging
    // if (config.alias) config.merge(resolveAlias)
    // else config.merge(resolveAlias)
  }
  toFuseBox(config) {
    const {alias} = config.get('resolve')
    config.merge({alias})
  }
}
