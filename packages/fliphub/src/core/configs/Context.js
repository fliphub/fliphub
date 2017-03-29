const cleanObj = require('clean-obj')
const log = require('fliplog')
const firstToUc = require('fliphub-helpers/str/firstToUpper')
const {Presets, ChainedMap} = require('fliphub-core')
const forOwn = require('lodash.forown')

function ucWord(str) {
  if (str === 'fusebox') return 'FuseBox'
  return firstToUc(str)
}

module.exports = class ContextConfig extends ChainedMap {
  constructor(parent) {
    super(parent)
    this.workflow = parent
    delete this.parent

    this.extend([
      'root',
      'name',
      'unified',
      'from',
      'to',
      'flips',
      'config',
      'inherit',
      'presetArgs',
      'debug',
      'defaults',
      'monorepo',
    ])
  }

  /**
   * get our flips
   * so we can use webpack chain or other
   * depending on the `from` and `to`
   *
   * @return {Object} fromFn, toFn, from, to, flips
   */
  getFlips() {
    const flips = this.get('flips')
    const {from, to} = flips
    const fromFn = `from${ucWord(from)}`
    const toFn = `to${ucWord(to)}`
    return {fromFn, toFn, from, to, flips}
  }

  // {name: args}
  usePresets(presets) {
    this.presets.useAll(presets)
    return this
  }
  // {name: preset}
  addPresets(presets) {
    this.presets.addAll(presets)
    return this
  }
  addPreset(name, preset) {
    this.presets.add(name, preset)
    return this
  }

  mergeParent() {
    // @NOTE: technically this should be parent when we instantiate
    // but we want to conditionally merge...
    //
    // merge in parent, unless client says not to
    if (this.get('inherit') === false) return this

    const {
      flips,
      root,
      debug,
    } = this.workflow.coreConfig.toConfig()

    super
      .mergeReal({
        flips,
        root,
        debug,
      })

    this
      .presets
      .merge(this
        .workflow
        .coreConfig
        .presets
        .toConfig())

    return this
  }

  mergePresets(presets) {
    const presetArgs = this.get('presetArgs')

    if (!presets) return this
    Presets.mergeFor({presets, presetArgs, context: this})
    return this
  }

  mergePresetArgs() {
    const args = this.get('presetArgs')
    if (!args) return null

    forOwn(args, (name, arg) => this.presets.use(name, arg))

    return this
  }

  merge(app) {
    const deref = Object.assign({}, {}, app)
    const {
      unified,
      flips,
      config,

      presets,
      presetArgs,

      name,
      inherit,
      root,
      debug,
    } = deref

    const data = {
      unified,
      flips,
      config,
      presetArgs,
      name,
      inherit,
      root,
      debug,
    }

    // removing empty properties
    cleanObj(data)

    super
      .merge(data)

    this
      .mergeParent()
      .mergePresets(presets)
      .mergePresetArgs()

    // filtering logs per context
    if (debug) log.filter(debug)

    return this
  }
}
