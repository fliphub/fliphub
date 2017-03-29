const test = require('ava')
const {fosho, log} = require('fosho')

function foReal(obj, t) {
  return fosho(obj, t).isReal()
}

test.todo('presets can add presets')
test.todo('preset lifecycle methods are called')
test.todo('preset.defineEnv sets environment env')
test.todo('hub lifecycle methods are called')
test.todo('hub has workflow property set on construction')

class AvaPreset {
  setArgs(args) {
    this.args = args
  }
  toWebpack() {
    this.args().isTrue()
  }
}

function getFlips() {
  const FlipHub = require('../src')

  const flips = new FlipHub({
    root: __dirname,
    // presets: {
    //   // flags: null,
    //   // ava: null,
    // },
    apps: [{
      // presets: {
      //   resolveAll: __dirname,
      //   ava: null,
      // },
      name: 'eh',
      entry: './src/index.js',
      output: './public/eh',
    }],
  })

  return flips
}

// test.beforeEach((t) => {
//   t.context.flips = getFlips()
// })


test('can call create', (t) => {
  t.plan(1)
  const flips = getFlips()
  foReal(flips.create(), t)
})
test('can call reset', (t) => {
  t.plan(1)
  fosho(getFlips().reset(), t).aintReal()
})

test('can add presets', (t) => {
  t.plan(1)

  const added = getFlips().create()
    .addPresets({
      ava: new AvaPreset(),
    })

  foReal(added, t)
})

test('can use presets', (t) => {
  t.plan(1)

  const added = getFlips().create()
    .usePresets({
      ava: () => fosho(true, t),
    })

  foReal(added, t)
})

function createWith(t) {
  // log.color('bold').text('================\n\n').echo()
  const flip = getFlips().create()
    .addPresets({
      ava2: new AvaPreset(),
    })
    .core
    .usePresets({
      ava2: () => fosho(true, t),
    })
    .core
    .setup()

  const config = flip.toConfig()
  fosho(config, t).isObj()
  return {config, flip}
}

test(`can add + use presets,
  & they are inherited,
  & args passed down,
  & defaults are set,
  & can setup after calling create,
  & preset flipToFns are called`, (t) => {
  // ava2 presets, not ava1 since it was reset
  // and then config obj
  t.plan(2)
  createWith(t)
})

test(`returns config and does nothing else`, (t) => {
  t.plan(2)
  const {config} = createWith(t)
  log.data(config).verbose().echo(false)
})
