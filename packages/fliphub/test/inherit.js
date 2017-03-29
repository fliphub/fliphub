const test = require('ava')
const {fosho, log} = require('fosho')
const FlipHub = require('../src')

test.todo('presets are inherited')
test.todo('presets are not inherited with inherit: false')

class AvaPresetNoInherit {
  toWebpack() {
    throw new Error('was inherited')
  }
}
class AvaPreset {
  constructor(args) {
    this.args = args
  }
  setArgs(args) {
    if (!args) return
    if (args.args) return
    this.args = args
  }
  toWebpack() {
    this.args(this)
  }
}
class AvaPreset2 {
  constructor(args) {
    this.args = args
  }
  toWebpack() {
    this.args(this)
  }
}

test(`not inherited`, (t) => {
  // t.plan(2)
  const flips = new FlipHub({
    root: __dirname,
    presets: {
      ava: new AvaPresetNoInherit(),
    },
    apps: [{
      inherit: false,
      name: 'eh',
      entry: './src/index.js',
      output: './public/eh',
    }],
  })

  flips.setup()
})

test(`inherited`, (t) => {
  t.plan(1)
  const flips = new FlipHub({
    root: __dirname,
    presets: {
      ava: new AvaPreset(() => fosho(true, t).aight()),
    },
    apps: [{
      inherit: true,
      name: 'eh',
      entry: './src/index.js',
      output: './public/eh',
    }],
  })

  flips.setup()
})

test(`presets do not bleed across contexts`, (t) => {
  t.plan(3)
  const ava = new AvaPreset(() => fosho(true, t).aight())
  const ava2 = new AvaPreset2(() => fosho(true, t).aight())
  const flips = new FlipHub({
    root: __dirname,
    apps: [
      {
        presets: {
          ava,
          ava2,
        },
        name: 'eh',
        entry: './src/index.js',
        output: './public/eh',
      },
      {
        presets: {
          ava2,
        },
        name: '2',
        entry: './src/index.js',
        output: './public/eh',
      },
    ],
  })

  flips.setup()
})
