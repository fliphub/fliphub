const {inspectorGadget} = require('inspector-gadget')
const log = require('fliplog')
const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')

module.exports = class Hub extends ChainedMapExtendable {

  /**
   * @param {Workflow} workflow
   * @see this.subscribe
   */
  constructor(workflow) {
    super(workflow)
    this.name = this.constructor.name
    this.inspect = inspectorGadget(this, ['workflow', 'parent'])
    this.workflow = workflow
    this.subscribe()
  }

  /**
   * @see Workflow
   */
  subscribe() {
    const workflow = this.workflow
    const evt = workflow.evt
    const name = this.name

    // --- contexts ---

    if (this.preConfigs) {
      evt
        .name('contexts.configs.start').hub(name)
        .cb((args) => this.preConfigs(args))
    }
    if (this.preCreates) {
      evt
        .name('contexts.create.start').hub(name)
        .cb((args) => this.preCreates(args))
    }
    if (this.postConfigs) {
      evt
        .name('contexts.configs.end').hub(name)
        .cb((args) => this.postConfigs(args))
    }
    if (this.postCreates) {
      evt
        .name('contexts.create.start').hub(name)
        .cb((args) => this.postCreates(args))
    }

    // --- context ---

    if (this.preInit) {
      evt
        .name('init.pre').contexts().hub(name)
        .cb((args) => this.preInit(args))
    }
    if (this.init) {
      evt
        .name('init').contexts().hub(name)
        .cb((args) => this.init(args))
    }
    if (this.postInit) {
      evt
        .name('init.post').contexts().hub(name)
        .cb((args) => this.postInit(args))
    }

    if (this.onCreate) {
      evt
        .name('create').contexts().hub(name)
        .cb((args) => this.onCreate(args))
    }
    if (this.onConfig) {
      evt
        .name('config').contexts().hub(name)
        .cb((args) => this.onConfig(args))
    }
    if (this.preConfig) {
      evt
        .name('config.pre').contexts().hub(name)
        .cb((args) => this.preConfig(args))
    }
    if (this.postConfig) {
      evt
        .name('config.post').contexts().hub(name)
        .cb((args) => this.postConfig(args))
    }

    // --- core ---

    if (this.coreCreate) {
      evt
        .core().once().hub(name)
        .name('create').cb((args) => this.coreCreate(args))
    }
    if (this.coreConfig) {
      evt
        .core().once().hub(name)
        .name('config').cb((args) => this.coreConfig(args))
    }
    if (this.coreInit) {
      evt
        .core().once().hub(name)
        .name('init').cb((args) => this.coreInit(args))
    }
    if (this.coreSetup) {
      evt
        .core().once().hub(name)
        .name('setup').cb((args) => this.coreSetup(args))
    }
  }
}
