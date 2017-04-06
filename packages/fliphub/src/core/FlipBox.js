const timer = require('fliptime')
const log = require('fliplog')
const flipflag = require('flipflag')
const {Core, resolve} = require('fliphub-core')
const Hubs = require('../hubs')
const Workflow = require('./Workflow')
const Ops = require('./Ops')

/**
 * @classdesc
 *
 * each step will call the previous step
 * if you opt to not call it yourself for finer grain control
 *
 * order:
 * 1. create
 * 2. init
 * 3. setup
 */
module.exports = class FlipBox extends Core {
  static init(config) {
    return new FlipBox(config)
  }

  setupDebug(config) {
    // setup for benchmarking with buildFast
    if (!flipflag('apps')) timer.start('totals')
    timer.start('flip')
    timer.start('setup')
    log.filter(config.debug)
    log.filter([
      '!toconfig',
      '!initConfig',
      '!adding',
      '!flag',
      '!flags',
      '!events',
      '!time',
      '!preset',
      '!call',
      '!setup',
      '!extract',
      '!apps',
      // '!used',
      '!args',
      // '!core&create',
    ])
    return this
  }

  // maybe auto do higher if multi apps?
  setupRoot(config) {
    if (!config.root) {
      this.resolver = resolve.scoped(config.root).setRoot(1)
      config.root = this.resolver.root
    }
    return this
  }

  /**
   * @see Core.create
   * @return {Core}
   */
  setupApps() {
    if (!this.config.apps) this.config = {apps: [this.config]}
    return this
  }

  constructor(config) {
    super(config)
      .setupDebug(config)
      .setupRoot(config)

    this.config = config
    this.state = {
      created: false,
      initted: false,
      setup: false,
    }

    // add the ops regardless,
    // update/mutate on create with real workflow
    this.ops = new Ops({core: this})

    // log.text('====================================').color('bold').echo()
  }

  /**
   * @since 0.1.0
   * @see @next this.init
   * @see fliphub-core/Workflow
   * @return {Core}
   */
  create() {
    this.setupApps()
    this.state.created = true

    // instantiate
    this.workflow = new Workflow(this, this.config)
    this.ops.workflow = this.workflow

    // was coreStart
    log
      .text('fliphub-core-create')
      .tags('core,init,create')
      .data(this.workflow)
      .verbose(3)
      .echo()

    // add hubs before we create
    Hubs.forEach((Hub) =>
      this.hub(new Hub(this.workflow)))

    // emit
    this.workflow.coreCreate()

    return this
  }

  /**
   * @since 0.1.0
   * @see @prev this.create
   * @see @next this.setup
   * @return {Core}
   */
  init() {
    if (!this.state.created) this.create()
    this.state.initted = true
    this.workflow.coreInit()
    return this
  }

  /**
   * @since 0.1.0
   * @see @prev this.init
   *
   * @fires context.*.merge.pre
   * @fires context.*.init.pre
   * @fires context.*.init
   * @fires context.*.init.post
   * @fires context.*.merge.post
   *
   * @return {Core}
   */
  setup() {
    if (!this.state.initted) this.init()
    this.state.setup = true
    const {config, workflow} = this

    workflow.coreConfig.merge(config)
    workflow.log
      .tags('setup,apps')
      .text('👨‍🔧  ⌛  setting up: ')
      .xterm('yellow')
      .echo()

    workflow.contextsFrom(config.apps)
    workflow.emitForContexts('merge.pre')
    workflow.emitForContexts('init.pre')
    workflow.emitForContexts('init')
    workflow.emitForContexts('init.post')
    workflow.emitForContexts('merge.post')

    return this
  }
}
