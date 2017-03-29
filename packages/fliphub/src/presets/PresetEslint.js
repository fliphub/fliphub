const exists = require('flipfile/exists')

module.exports = class PresetEslint {
  constructor() {
    this.args = null
  }

  init(bundler, context) {
    const root = context.get('root')
    const eslint = `${root}/.eslint`
    if (exists(eslint)) this.args = require(eslint)
  }

  toRollup() {
    const eslint = require('rollup-plugin-eslint')
    return {
      plugins: [eslint()],
    }
  }

  toFuseBox() {
    const eslint = require('fuse-box-eslint-plugin')
    return {
      plugins: [eslint()],
    }
  }

  // Usage shows default values
  toWebpack() {
    console.log('using?')
    const eslint = require('neutrino-middleware-eslint')
    const rules = null // {eslint: this.args}
    const options = {eslint: {useEslintrc: true}}
    return (neutrino) => neutrino.use(eslint, options)
  }
}
