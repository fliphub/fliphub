module.exports = class PresetReusable {
  constructor() {
    this.args = {}
  }

  coreInit(workflow) {
    // console.log('called core init -.-')
    this.workflow = workflow
    workflow.evt.on('')
    workflow
    .evt
    .name('config.pre')
    .context()
    .cb((arg1, arg2) => {
      workflow.log.quick(arg1, arg2, 'bah!')
    })
  }

  setArgs(args) {
    if (args) this.args = args
  }

  decorate(context, bundler, workflow) {
    // @TODO: make it inherit for presets aside from bundler...
    // if (this.args) context.config.merge(this.args)
    if (this.args) bundler.config.merge(this.args)
  }
}
