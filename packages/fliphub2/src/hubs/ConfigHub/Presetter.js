const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')
const log = require('fliplog')
const firstToUc = require('fliphub-helpers/str/firstToUpper')
const is = require('izz')
const RollupConfig = require('../Bundlers/Rollup')
const FuseBoxConfig = require('../Bundlers/FuseBox')

function ucWord(str) {
  if (str === 'fusebox') return 'FuseBox'
  return firstToUc(str)
}

// @TODO: clean this up, especially the decorating...
module.exports = class Presetter extends ChainedMapExtendable {
  merge({
    contextChain,
    context,
    config,
    bundler,
    box,
  }) {
    this.contextChain = contextChain
    this.context = context
    this.bundler = bundler
    this.bundlerConfig = config
    this.box = box
    return this
  }

  // USE WEBPACK CHAIN
  // SO PRESETS WILL BE COMPATIBLE WITH NEUTRINO PRESETS
  // @TODO for inheriting
  // console.log(presetList)
  // const flipConfig = this.parent.box.flipConfig
  // const presetList = flipConfig.presets
  //
  // @TODO:
  // loopPresetInits(used, list, appConfigChain, log = false, init = false) {}

  handleBoxInit(box, context) {
    const presetList = context.presets
    const list = presetList.list.entries()
    const used = presetList.used.entries()

    for (const name in used) {
      const preset = list[name]
      const args = used[name]

      if (!preset) continue
      if (preset.boxInit) {
        log
          .tags('box,init,preset,decorate')
          .text(`boxInitPreset: ${name}`)
          .data({preset, args}).verbose()
          .echo()
        preset.boxInit(box, context)
      }
    }
  }

  // initiate all of the plugins
  // in case these plugins themselves add more plugins
  handlePresetDecoration(bundler, context) {
    const presetList = context.presets

    // first we go through the presets
    // which allows presets to add other presets
    const list = presetList.list.entries()
    const used = presetList.used.entries()

    for (const name in used) {
      const preset = list[name]
      const args = used[name]

      log
      .tags('used,args,call,preset')
      .emoji('preset')
      .text(`calling preset: ${name}`)
      .data({args}).verbose()
      .echo()

      if (!preset) {
        log
        .tags('used,args,preset,call')
        .emoji('step')
        .text(`calling preset: ${name}`)
        .data({args}).verbose()
        .echo()

        continue
      }
      if (preset.setArgs) preset.setArgs(args)
      if (preset.decorate) preset.decorate(context, bundler)
    }

    return {
      list: presetList.list.entries(),
      used: presetList.used.entries(),
    }
  }

  getFromTo() {
    // get our flips
    // so we can use webpack chain or other
    // depending on the `fromto`
    const {flips} = this.contextChain.entries()
    const {from, to} = flips
    const fromFn = `from${ucWord(from)}`
    const toFn = `to${ucWord(to)}`
    return {fromFn, toFn, from, to, flips}
  }

  getBundlerConfig(to) {
    const contextChain = this.contextChain
    const context = contextChain.entries()
    let bundlerConfig = this.bundlerConfig

    // @TODO
    // - [ ] should use `to` instead?
    //
    // add basic chains for other configs too,
    // even just empty chains with deepmerge
    if (to === 'webpack') {
      const Neutrino = require('../Bundlers/Neutrino')
      const WebpackChain = require('flip-webpack-chain')
      bundlerConfig = new WebpackChain().merge(bundlerConfig)
      const neutrino = new Neutrino()
      neutrino.toConfig = neutrino.getWebpackOptions
      neutrino.config.merge(bundlerConfig.toConfig())
      bundlerConfig = neutrino
    } else if (to === 'rollup') {
      // move config to rollup config
      // so the parent BundlerConfig is no longer used
      // for anything more than its original values...
      const config = new RollupConfig(this)
      config.config.merge(bundlerConfig)
      bundlerConfig = config
    } else if (to === 'fusebox') {
      const config = new FuseBoxConfig(this, context)
      config.config.merge(bundlerConfig)
      bundlerConfig = config
    }

    return bundlerConfig
  }

  setPresetArgs({used, list, bundlerConfig, contextChain}) {
    const presets = {}
    for (const name in used) {
      const preset = list[name]
      const args = used[name]
      if (!preset) continue
      if (preset.init) preset.init(bundlerConfig, contextChain)
      if (preset.setArgs) preset.setArgs(args)
      else log.preset('note').addText(`${name} had no .setArgs`).echo()
      presets[name] = preset
    }
    return presets
  }

  callPresetToFrom({fromFn, toFn, presets, bundlerConfig, contextChain}) {
    // loop through the presets
    // call their flip methods (`from`, `to`)
    for (const name in presets) {
      const preset = presets[name]

      // @example: `preset.fromWebpack(config)`
      if (preset[fromFn]) {
        preset[fromFn](bundlerConfig)
      }

      // so that it is compatible with neutrino
      // or anything returning functions
      if (preset[toFn]) {
        // get return values
        let toMerge = preset[toFn](bundlerConfig, contextChain)

        // log.verbose(true).text('tomerge').data(toMerge).echo()

        // if it is a fn (such as with neutrino) call it
        if (typeof toMerge === 'function') toMerge = toMerge(bundlerConfig)

        // if null is returned, ignore
        else if (is.notReal(toMerge)) continue

        // normal objects returned
        // else if (!bundlerConfig.config) bundlerConfig.merge(toMerge)

        // handle neutrino presets
        else bundlerConfig.config.merge(toMerge)
        continue
      }

      log
        .tags('missing,preset,to,from')
        .preset('note')
        .addText(`${name} had no ${toFn}`)
        .echo()
    }
  }

  // @TODO:
  // check if their config has changed,
  // or the flags have changed,
  // so we can cache this
  //
  // manage our bundle config
  // changed by presets
  toConfig() {
    const {
      box,
      contextChain,
    } = this
    this.handleBoxInit(box, contextChain)
    const {from, to, fromFn, toFn} = this.getFromTo()
    const bundlerConfig = this.getBundlerConfig(to)
    const {used, list} = this.handlePresetDecoration(bundlerConfig, contextChain)
    const presets = this.setPresetArgs({used, list, bundlerConfig, contextChain})

    // then we gather all presets into an array
    this.callPresetToFrom({fromFn, toFn, presets, bundlerConfig, contextChain})

    this.parent.api = bundlerConfig
    return bundlerConfig.config.toConfig()
  }
}
