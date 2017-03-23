const Aliaser = require('fliphub-alias')

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
  decorate(context, {config}) {
    let aliases
    const hasResolve = context.presets.hasUsed('resolveAlias')
    this.aliaser = new Aliaser(context.get('root'), this.args.dir)

    if (hasResolve) {
      const resolveAlias = context.presets.list.get('resolveAlias')
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
  }

  // @TODO: only add to bundler here... could delete or add...
  // toWebpack(config) {
  //   const aliases = this.aliases
  //   const resolveAlias = {resolve: {alias: aliases}}
  //   // handle merging
  //   if (config.alias) config.merge(resolveAlias)
  //   else config.merge(resolveAlias)
  // }
  // toFuseBox(config) {
  //   const aliases = this.aliases
  //   const resolveAlias = {alias: aliases}
  //   if (config.alias) config.merge(resolveAlias)
  //   else config.merge(resolveAlias)
  // }
}
