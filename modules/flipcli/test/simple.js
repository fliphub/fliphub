const test = require('ava')
const {fosho, log, is} = require('fosho')
const cli = require('../src')


test('simple', t => {
  const fluent = new cli()

  fluent
    .step('presets', 'checkbox', '[presets message]')
      .checkbox('production', true)
      .checkbox('development', false)

  const config = fluent.toConfig()

  log
    .space()
    .data(config)
    .bold('simple config')
    .verbose()
    .echo(false)

  const steps = config.steps
  const step = steps[0]

  fosho(steps.length).eq(1)
  fosho(step.name).eq('presets')
  fosho(step.choices).arr()

  const expected = [
    {
      type: 'checkbox',
      name: 'production',
      value: 'presets.production',
      message: 'production',
      checked: true,
    },
    {
      type: 'checkbox',
      name: 'development',
      value: 'presets.development',
      message: 'development',
      checked: false,
    },
  ]

  t.deepEqual(step.choices, expected)
  t.pass()
})

test('shorthand', t => {
  const fluent = new cli()

  fluent
    .step('presets', 'checkbox', '[presets message]')
    .checkboxs('production,development', true)

  const config = fluent.toConfig()

  fosho.t(t)
  fosho(config).obj()
  fosho(config.steps).arr()
})

test('shorthand and longhand are the same', t => {
  fosho.t(t)

  const fluent = new cli()

  const fluentCompare = new cli()
  const stepsLonghand = fluentCompare
    .step('presets', 'checkbox', '[presets message]')
      .checkbox('production', true)
      .checkbox('development', true)

  const steps = fluent
    .step('presets', 'checkbox', '[presets message]')
    .checkboxs('production,development', true)

  log
    .space()
    .data({steps, stepsLonghand})
    .bold('shorthand steps')
    .verbose()
    .echo(false)

  const config = fluent.toConfig()
  const compareConfig = fluentCompare.toConfig()

  log
    .space()
    .data(config, compareConfig)
    .bold('shorthand config')
    .verbose()
    .echo(false)

  fosho(config).obj()
  fosho(config.steps).arr()
  t.deepEqual(config, compareConfig)
  t.pass()
})
