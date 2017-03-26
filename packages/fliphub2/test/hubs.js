const test = require('ava')
const {Hub, Workflow} = require('fliphub-core')
const {fosho, log} = require('fosho')
const getFlips = require('./fixtures/simplestConfig')
// fosho.logMode(true)
test.todo('hub lifecycle methods are called')
test.todo('hub has workflow property set on construction')

class AvaHub extends Hub {
  constructor(parent, t) {
    super(parent)

    this.count = 0
    fosho.obj(this.workflow)

    fosho(this.workflow, t)
      .isReal()
      .isObj()
      .instanceOf(Workflow)
  }
  init() {
    console.log('init', this.count++)
  }
  preConfigs() { this.count++ }
  preCreates() { this.count++ }
  postConfigs() { this.count++ }
  postCreates() { this.count++ }

  preInit() { this.count++ }
  postInit() { this.count++ }
  onCreate() { this.count++ }
  onConfig() { this.count++ }
  preConfig() { this.count++ }
  postConfig() { this.count++ }
  coreCreate() { this.count++ }
  coreConfig() { this.count++ }
  coreInit() { this.count++ }
  coreSetup() { this.count++ }
  // coreInit() {}
  // postInit() {}
}

test('can add hubs', (t) => {
  t.plan(3)
  const flips = getFlips().create()
  flips.hub(new AvaHub(flips.workflow, t))
})
test('hubs get their names set on the instance', (t) => {
  t.plan(4)
  const flips = getFlips().create()
  const hub = new AvaHub(flips.workflow, t)
  fosho(hub.name, t).preMuch(hub.constructor.name)
})

test('hubs lifecycles get called', (t) => {
  t.plan(4)
  const flips = getFlips().create()
  const hub = new AvaHub(flips.workflow, t)
  flips.hub(hub)
  flips.setup()
  fosho(hub.count, t).atLeast(10)
})

test('setup will call previous fns if not called', (t) => {
  // log.verbose(100).data(t).echo()
  t.plan(1)
  const flips = getFlips().create().setup()
  const {created, initted, setup} = flips.state
  fosho([created, initted, setup], t).each(fosho.true)
})

// flips.setup()
// const config = flips.toConfig()
// flips.build()
