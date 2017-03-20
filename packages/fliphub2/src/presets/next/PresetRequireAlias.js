// @example:
// alias: {'hullabaloo': './src/backend/index.js'},
const Aliaser = require('aliaser')

module.exports = class RequireAlias {
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
  handle(presets) {
    const {resolveAlias} = presets
    const dir = resolveAlias.dir
    let files = resolveAlias.files

    // if it is an array val with no dir
    if (!files && !dir) files = resolveAlias

    // default to box root, or override
    if (dir) this.aliaser.setDir(dir)

    // do the magic
    this.aliases = this.aliaser.requireAndHandle(files)
  }

  appInit({context, app, helpers, box}) {
    // handle merging
    if (app.alias) app.alias = Object.assign(app.alias, this.aliases)
  }
  defaults() {}
  decorate() {}

  boxInit({box}) {
    this.aliaser = new Aliaser(box.root)
  }
}
