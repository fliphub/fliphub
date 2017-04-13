// const Joi = require('joi')
const {forProps} = require('fliphub-resolve')

// @TODO: resolve
module.exports = class PresetHTML {
  constructor() {
    // or array...
    // this.schema = Joi.object().keys({
    //   template: Joi.string(),
    //   filename: Joi.array(),
    //   // files:
    // }).unknown(false)
  }
  setArgs(args) {
    if (args) {
      // this.args = args
      this.args = forProps(args, ['filename', 'template'])
    }

    // if (!Array.isArray(args)) this.args = [this.args]
  }
  toWebpack() {
    const HtmlWebpackPlugin = require('html-webpack-plugin')

    return (config, workflow, neutrino) => {
      neutrino.config
        .plugin('html')
        .use(HtmlWebpackPlugin, this.args)
    }
  }
}
