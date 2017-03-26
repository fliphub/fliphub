const ChainedMap = require('flipchain/ChainedMapExtendable')
const resolve = require('fliphub-resolve')
const Core = require('./Core')
const Hub = require('./Hub')
const Workflow = require('./Workflow')
const Context = require('./Context')
const Presets = require('./Presets')

// export as named, and as abstract for destructuring support
module.exports = {
  resolve,

  Core,
  AbstractCore: Core,

  Context,
  AbstractContext: Context,

  Workflow,
  AbstractWorkflow: Workflow,

  Hub,
  AbstractHub: Hub,

  Presets,
  AbstractPresets: Presets,

  ChainedMap,
}
