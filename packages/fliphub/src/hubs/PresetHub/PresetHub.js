// maybe should be a folder
const AbstractHub = require('../AbstractHub')
const builtIn = require('./built-in')
const defaultsDeep = require('lodash.defaultsdeep')
const merge = require('lodash.merge')
const chain = require('webpack-chain')

class PresetHub extends AbstractHub {
  // test({context}) { return context.presets }

  // ----------
  decorate({app, context, helpers}) {
    // var d = {
    //   presets: context.presets,
    //   appP: app.presets,
    // }
    context.debugFor('presets.decorate', '🍰  using presets', 224, app.presets)
    if (app.presets) {
      app.presets.forEach(name => {
        // deref and remove `name`
        const preset = Object.assign({}, this.list[name])
        delete preset.name

        // console.exit(this.list, preset, name)
        app = merge(app, preset)

        // app = defaultsDeep(preset, app)
      })
    }
  }
  // ----------

  boxInit({box, helpers}) {
    console.verbose(chain)
    
    this.box = box
    this.list = builtIn(true)
    box.addPresets = (preset) => this._addPreset({helpers, preset})
    box.addPreset = (preset) => this._addPreset({helpers, preset})
    box.extendPreset = (preset) => this.extendPreset({helpers, preset})
    box.extendPresets = (presets) => this.extendPresets({helpers, presets})
    // {on: 'presets.remove'},
    // {on: 'presets.get'},
  }

  addPreset(preset) {
    this._addPreset({
      context: this.context,
      helpers: this.helpers,
      app: this.app,
      preset,
    })
    return this.box
  }
  extendPreset({preset}) {
    // return _defaultsDeep(preset, extended)
    this.list[preset.name] = Object.assign(
      this.list[preset.name] || {},
      preset || {})

    // console.exit(preset, this.list, preset.name)
    return this.box
  }
  extendPresets({presets}) {
    if (!presets.name) {
      const keys = Object.keys(presets)
      keys.forEach(p => {
        const preset = presets[p]
        preset.name = p
        this.extendPreset({preset})
      })
      return this.box
    }
    this.extendPreset({preset: presets})
    // this.evts.emit('presets.extend', presets)
    return this.box
  }
  _addPreset({preset, context, helpers}) {
    // if it has no name, it is an object
    // so convert it to an array
    if (!preset.name) {
      let presetArr = []
      const names = Object.keys(preset)
      for (let i = 0; i < names.length; i++) {
        const name = names[i]
        const presetObj = preset[name]
        presetObj.name = name
        presetArr.push(presetObj)
      }
      preset = presetArr
    }

    if (Array.isArray(preset)) {
      preset.forEach(p => this._addPreset({helpers, preset: p}))
      return this.box
    }

    // @TODO: flip.debugFor?
    // context.debugFor('addPresets', '🍰  adding presets', 224, preset)
    console._log(preset.name, '🍰  adding presets', 224)
    this.list[preset.name] = preset
    return this.box
  }
}

module.exports = PresetHub
