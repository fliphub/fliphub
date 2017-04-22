const {Hub} = require('fliphub-core')
const log = require('fliplog')
const is = require('izz')
const forOwn = require('lodash.forown')

module.exports = class PresetHub extends Hub {

  // ----- events -----

  /**
   * @event core.init
   */
  coreInit() {
    this.loopPresets(({preset, args, name}) => {
      if (preset === undefined) return
      if (preset.coreInit) {
        log
          .tags('core,init,preset,decorate')
          .text(`coreInitPreset: ${name}`)
          .data({preset, args})
          .verbose()
          .echo()
        preset.coreInit(this.workflow)
      }
    }, this.workflow.coreConfig.presets)
  }

  /**
   * first we go through the presets
   * which allows presets to add other presets
   *
   * then go over them again to initialize them all
   *
   * @event context.create
   */
  postInit() {
    const workflow = this.workflow
    this.handlePresetDecoration(workflow)
    this.setPresetArgs(workflow)
    this.callPresetToFrom(workflow)
  }

  // ----- private -----

  /**
   * @param {Workflow} workflow
   * @private
   * initiate all of the plugins
   * in case these plugins themselves add more plugins
   */
  handlePresetDecoration(workflow) {
    const context = workflow.current
    const bundler = context.bundler

    // pre-decorate
    // had to add this... -.-
    this.loopPresets(({preset, args, name}) => {
      if (!preset) return
      if (preset.setArgs) preset.setArgs(args)
      if (preset.preDecorate) preset.preDecorate(context, bundler, this.workflow)
    })

    // decorate
    this.loopPresets(({preset, args, name}) => {
      log
        .tags('used,args,call,preset')
        .emoji('preset').text(`calling preset: ${name}`)
        .data({args}).verbose()
        .echo()

      if (!preset) {
        log
          .tags('used,args,preset,call')
          .emoji('step').text(`calling preset: ${name}`)
          .data({args}).verbose()
          .echo()
        return
      }
      if (preset.setArgs) preset.setArgs(args)
      if (preset.decorate) preset.decorate(context, bundler, this.workflow)
    })

    // post-decorate
    this.loopPresets(({preset, args, name}) => {
      if (!preset) return
      if (preset.postDecorate) {
        preset.postDecorate(context, bundler, this.workflow)
      }
    })
  }

  /**
   * @private
   * @see Presets
   * @param {Workflow} workflow
   */
  setPresetArgs(workflow) {
    this.loopPresets(({preset, args, name}) => {
      if (!preset) return
      if (preset.init) preset.init(workflow)
      if (preset.setArgs) preset.setArgs(args)
      else log.preset('note').addText(`${name} had no .setArgs`).echo()
    })
  }

  /**
   * loop through the presets
   * call their flip methods (`from`, `to`)
   *
   * @private
   * @param {Workflow} workflow
   *
   * @see Bundler
   * @TODO: just remember to `bind` the configs as needed
   */
  callPresetToFrom(workflow) {
    const {fromFn, toFn} = workflow.current.config.getFlips()
    const bundler = workflow.current.bundler
    const config = workflow.current.bundler.config
    const contextConfig = workflow.current.config

    log
      .tags('call,preset,to,from')
      .emoji('phone')
      .color('cyan')
      .text('callPresetToFrom')
      .echo()

    this.loopPresets(({name, args, preset}) => {
      if (!preset) {
        log.preset('note').text('missing preset: ' + name).echo()
        return
      }

      log
        .tags('preset,loop,name,fn,to,from')
        .color('cyan')
        .text(name + ':' + fromFn)
        .echo()

      // @example: `preset.fromWebpack(config)`
      if (preset[fromFn]) {
        preset[fromFn](config, workflow)
      }

      // so that it is compatible with neutrino
      // or anything returning functions
      if (preset[toFn]) {
        // get return values
        let toMerge = preset[toFn](config, workflow)

        // if it is a fn (such as with neutrino) call it
        if (typeof toMerge === 'function')
          toMerge = toMerge(config, workflow, bundler.api)

        // if null is returned, ignore
        else if (is.notReal(toMerge)) return

        // normal objects returned or
        // handle neutrino presets
        // else config.merge(toMerge) && contextConfig.merge(toMerge)
        else config.merge(toMerge)

        // log.data({toMerge}).bold('TOMERGE').echo()

        return
      }

      log
        .tags('missing,preset,to,from')
        .preset('note')
        .addText(`${name} had no ${toFn}`)
        .echo()
    })

    workflow.current.bundler.config = config

    // @NOTE:
    workflow.current.bundler.api.config.merge(config.toConfig())
    // workflow.current.bundler.api.config = config

    // log.quick(workflow.current.bundler.api.config.toConfig())
    // log.quick(workflow.current.bundler)
  }

  // ----- helpers -----

  /**
   * @private
   * @see workflow.presets
   * @return {Object} {list, used}
   */
  getEntries() {
    const presets = this.workflow.current.config.presets
    return {
      list: presets.list.entries(),
      used: presets.used.entries(),
    }
  }

  /**
   * @private
   * @param {Function} cb
   * @param {boolean | Object} entries
   * @see this.entries
   * @return {Object}
   */
  loopPresets(cb, entries = false) {
    const entry = (entries || this.getEntries())
    const {list, used} = entry

    forOwn(used, (args, name) => {
      const preset = list[name]
      cb({preset, name, args, list, used})
    })

    return entries || this.getEntries()
  }
}
