// const kebabCase = require('lodash.kebabcase')
// const snakeCase = require('lodash.snakecase')
const camelCase = require('lodash.camelcase')
const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')
const deepmerge = require('deepmerge')
const arrToObj = require('arr-to-obj')
const log = require('fliplog')

module.exports = class Presets extends ChainedMapExtendable {
  constructor(parent) {
    super(parent)
    this.list = new ChainedMapExtendable(this)
    this.used = new ChainedMapExtendable(this)
  }

  // --- single ---

  hasUsed(name) {
    name = camelCase(name)

    log
      .tags('used,preset,has,hasUsed')
      .color('cyan')
      .text('hasUsedPreset: ' + name)
      .data(this.used.has(name))
      .tosource()
      .echo()

    return this.used.has(name)
  }
  has(name) {
    name = camelCase(name)

    log
      .tags('preset,has')
      .color('cyan')
      .text('hasPreset: ' + name)
      .data(super.has(name))
      .tosource()
      .echo()

    return super.has(name)
  }

  use(name, args) {
    name = camelCase(name)

    log
    .color('green')
    .tags('preset,use,args')
    .text('using preset: ' + name)
    // .data({args})
    .echo()

    if (this.used.has(name)) {
      log
      .tags('preset,use,args,has')
      .preset('warning')
      .text('Preset already has ' + name)
      .data({args, used: this.used.get(name)})
      .echo()

      // if it already has it and the args are empty
      // ignore --- for now
      if (args) {
        console.log('continuing...')
      } else {
        return this
      }
      // return this
    }
    this.used.set(name, args)
    return this
  }
  add(name, preset) {
    if (!preset) {
      preset = name
      name = preset.name
    }
    name = camelCase(name)

    log
    .tags('add,preset')
    .text('adding: ' + name)
    .echo()

    if (this.list.has(name)) {
      log
        .tags('preset,add,has')
        .preset('warning')
        .text('already added preset: ' + name)
        .echo()
      return this
    }

    this.list.set(name, preset)
    return this
  }

  // --- multi for the single ^ ---

  // {name: args}
  useAll(presets) {
    for (const name in presets) this.use(name, presets[name])
    return this
  }
  // {name: preset}
  addAll(presets) {
    for (const name in presets) this.add(name, presets[name])
    return this
  }

  // --- to & from ---

  // so we'd likely need to deref here so we can do per app
  toConfig() {
    return {
      used: this.used.entries(),
      list: this.list.entries(),
    }
  }

  merge(obj) {
    if (!obj) return this
    Object
    .keys(obj)
    .forEach((key) => {
      const value = obj[key]
      switch (key) {
        case 'used':
        case 'list':
          if (!value) return this
          return this[key].merge(value)
        default:
          return this
      }
    })

    return this
  }

  static mergeFor({presets, presetArgs, context}) {
    if (presets) {
      presets = arrToObj.valAsKey(presets)

      if (presetArgs) {
        // allows cloning, and then doing the diff
        // since deep merge mutates
        log.tags('diff,deepmerge,mergefor,presets,config')
        log.diff(presets)
        presets = deepmerge(presets, presetArgs)
        log.diff(presets)
        log.doDiff()
      }

      // log
      //   .tags('flipconfig,presets,args,setup')
      //   .data(presets)
      //   .verbose()
      //   .text('presets')
      //   .echo()

      for (const preset in presets) {
        if (!preset) continue
        context.presets.use(preset,
          presets[preset] === preset ? undefined : presets[preset])
      }
    }
  }
}
