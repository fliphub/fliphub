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

  // initiate all of the plugins
  // in case these plugins themselves add more plugins
  handlePresetDecoration(bundler, context) {
    const presetList = context.presets
    // log.text('list').data({presetList}).verbose().exit(1)

    // first we go through the presets
    // which allows presets to add other presets
    const list = presetList.list.entries()
    const used = presetList.used.entries()

    for (let name in used) {
      const preset = list[name]
      const args = used[preset]
      // log.text(name).data({preset, args}).verbose().echo()

      if (!preset) continue
      if (preset.setArgs) preset.setArgs(args)
      if (preset.decorate) preset.decorate(context, bundler)
    }

    return {
      list: presetList.list.entries(),
      used: presetList.used.entries(),
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
    let {
      contextChain,
      context,
      bundlerConfig,
      bundler,
    } = this

    // get our flips
    // so we can use webpack chain or other
    // depending on the `fromto`
    const {flips} = context
    const {from, to} = flips
    let fromFn = 'from' + ucWord(from)
    let toFn = 'to' + ucWord(to)



    // log.verbose(true).data(this).echo()

    // @TODO
    // - [ ] should use `to` instead?
    //
    // add basic chains for other configs too,
    // even just empty chains with deepmerge
    if (to === 'webpack') {
      const Neutrino = require('../Bundlers/Neutrino')
      const WebpackChain = require('../../../../../modules2/webpack-chain')
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

    const {used, list} = this.handlePresetDecoration(bundlerConfig, contextChain)
    // log.data({used}).verbose().exit(1)

    // then we gather all presets into an array
    // log.text(name).data({preset, args}).verbose().echo()
    const presets = {}
    for (let name in used) {
      const preset = list[name]
      const args = used[name]
      if (!preset) continue
      if (preset.init) preset.init(bundlerConfig, contextChain)
      if (preset.setArgs) preset.setArgs(args)
      else log.preset('note').addText(name + ' had no .setArgs').echo()
      presets[name] = preset
    }

    // loop through the presets
    // call their flip methods (`from`, `to`)
    for (let name in presets) {
      const preset = presets[name]

      // @example: `preset.fromWebpack(config)`
      if (preset[fromFn]) {
        preset[fromFn](bundlerConfig)
      }

      // so that it is compatible with neutrino
      // or anything returning functions
      if (preset[toFn]) {
        // get return values
        let toMerge = preset[toFn](bundlerConfig)

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

      log.preset('note').addText(name + ' had no ' + toFn).echo()
    }

    this.parent.api = bundlerConfig
    return bundlerConfig.config.toConfig()

    // console.log(bundlerConfig)
    // console.log(bundlerConfig.config.toConfig())
    // bundlerConfig.build()
    // log.data(flipConfig).text('flipconfig').verbose().echo()
    // log.data(list).text('list').verbose().echo()
    // log.data(used).text('used').verbose().echo()
  }
}
