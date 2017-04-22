// @TODO:
//  can use neutrino-preset here,
//  need to filter out presets that wrap neutrino presets
module.exports = class PresetCopy {
  constructor() {
    // this.schema = Joi.object().keys({
    //   from: Joi.string().or().array(),
    //   to: Joi.string().or().array(),
    //   force: Joi.boolean(),
    // })
  }
  setArgs(args) {
    if (args) this.args = args
    if (!Array.isArray(this.args)) this.args = [this.args]
  }
  toWebpack() {
    if (!this.args) return null
    const CopyWebpackPlugin = require('copy-webpack-plugin')
    return {
      plugins: [
        new CopyWebpackPlugin(this.args),
      ],
    }
  }

  toFuseBox() {}
}
