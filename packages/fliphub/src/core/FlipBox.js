const path = require('path')
const timer = require('fliptime')
const log = require('fliplog')
const flipflag = require('flipflag')
const flipcache = require('flipcache')
const {Core, resolve} = require('fliphub-core')
const Hubs = require('../hubs')
const Workflow = require('./Workflow')
const Ops = require('./Ops')

const cache = flipcache.hashCache(path.resolve(__dirname, './fliphub/flipcaches.json'))

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

  /**
   * @since 0.1.0
   * @param  {Object} config
   * @return {Core}
   */
  setupDebug(config) {
    // setup for benchmarking with buildFast
    if (!flipflag('buildfastinternal')) timer.start('totals')
    timer.start('flip')
    timer.start('setup')

    if (config.debug) {
      log.filter(config.debug)
      delete config.debug
    } else {
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
    }

    return this
  }

  /**
   * @see flipcache, fliphash
   * @since 1.8
   *
   * @param {Array<string>} apps
   * @param {Array<Object>} configs
   * @return {Core}
   */
  persistConfigs(apps, configs) {
    const stringify = require('javascript-stringify')
    const content = stringify(configs)

    console.log('persisting.........', apps)
    cache
      .hash(apps)
      .setContent(content)

    return this
  }

  /**
   * - put in ops
   * - when calling ops, persist
   *
   * @see flipcache, fliphash, javascript-stringify
   * @since 1.8
   * @return {Core}
   */
  hydrateFromCache() {
    const apps = this.config.apps.map(app => app.name)
    cache.hash(apps)

    if (cache.canBeUsed()) {
      console.log('can be used')
      try {
        // eslint-disable-next-line
        const configs = eval(cache.getContent())
        log.quick(configs)

        this.workflow.contexts = configs.map(config => {
          return {
            config: {toConfig() { return config }},
            toConfig() {
              return config
            },
          }
        })
        this.persistConfigs = () => this
        this.setup = () => this
        this.init = () => this
      } catch (e) {
        return false
      }
    }

    // workflow.contexts = context.bundler.config

    return this
  }

  /**
   * @TODO: maybe auto do higher if multi apps?
   * @param  {string} config
   * @return {Core}
   */
  setupRoot(config) {
    if (config.root) {
      resolve.root = config.root
    } else {
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

  /**
   * @param  {Object} config
   */
  constructor(config) {
    super(config)
      .setupDebug(config)
      .setupRoot(config)

    this.config = config

    this.state = {
      created: false,
      initted: false,
      setup: false,
      hydrated: false,
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

    // this.config.hydrate = true
    if (this.config.hydrate) {
      delete this.config.hydrate
      if (this.hydrateFromCache() !== false) {
        return this
      }
    }

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
