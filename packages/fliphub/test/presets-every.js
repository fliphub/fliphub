const test = require('ava')
const {fosho, log} = require('fosho')

class PresetReusable {
  constructor() {
    this.args = {}
  }

  setArgs(args) {
    if (args) this.args = args
  }

  decorate(context, bundler, workflow) {
    // console.log(bundler)
    if (this.args) bundler.config.merge(this.args)
  }
}

class PresetConfigLoader {
  constructor() {
    this.args = {}
  }

  setArgs(args) {
    if (args) this.args = args
  }

  decorate(context, bundler, workflow) {
    if (this.args) bundler.config.merge(this.args)
  }
}

const {Hub, Workflow} = require('fliphub-core')
class AvaHub extends Hub {
  preInit(workflow) {
    log.quick(workflow)
  }
}


test.skip('config loader hub', t => {
  const FlipHub = require('../src')
  const flips = new FlipHub({
    apps: [
      {
        name: 'canada',
        entry: './src/index.js',
        presets: {
          configLoader: new PresetConfigLoader({output: './public/eh'}),
        },
      },
    ],
  }).create()
  flips.hub(new AvaHub(flips.workflow)).setup()
  console.log(flips)
})

test('can use apps with no real config and inherit reusable configs', (t) => {
  const FlipHub = require('../src')
  const flips = new FlipHub({
    apps: [
      {name: 'canada'},
      {name: 'eh'},
    ],
  }).create()

  flips.addPresets({
    reusable: new PresetReusable(),
  })
  flips.usePresets({
    reusable: {
      entry: './src/index.js',
      output: './public/eh',
      flips: {to: 'rollup'},
    },
  })

  // log.quick(flips.toConfig())
  // does not flip webpack though...
  flips.toConfig().forEach(app => {
    fosho(app.entry, t).aight()
    fosho(app.entry, t).aight()
    fosho(Object.keys(app).length, t).eq(3)
  })
  t.pass()
  // t.fail('needs to have optional entry')
})


// configs are inherited by default
// test.failing(`can use apps with no real config
//   and inherit reusable
//   FLIPHUB configs`, t => {
//   t.fail('can only inherit bundler configs...')
// })
