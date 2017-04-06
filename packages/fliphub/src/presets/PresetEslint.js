const exists = require('flipfile/exists')

module.exports = class PresetEslint {
  constructor() {
    this.args = null
  }

  init(workflow) {
    const root = workflow.current.config.get('root') || workflow.root
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
    const eslint = require('neutrino-middleware-eslint')
    const rules = {eslint: this.args}
    const options = {eslint: {useEslintrc: true}}
    return (neutrino) => neutrino.use(eslint, options)
  }
}
