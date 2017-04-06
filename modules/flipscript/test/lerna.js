const test = require('ava')
const fosho = require('fosho')
const {ScriptFlip} = require('../src')


// scripts
//   .add()
//   .bin('karma')
//   .flag('only', 'me')
//   .env('dev')
//   .sync()
// 'lerna --scope=+(inferno-app1|inferno-app2|inferno)  --loglevel=info  -- node  --row=0  tsc'

test('prefixes are not duplicated', (t) => {
  const scripts = new ScriptFlip()
  const script = scripts
    .add()
    .lerna()
    .prefix('inferno')
    .scope('app1,app2,inferno')
  fosho(script.toString(), t).occurrs('inferno', 3)
})

test('lerna decorates and prefixes', (t) => {
  const scripts = new ScriptFlip()
  const script = scripts
    .add()
    .env('prod')
    .lerna()
    .prefix('inferno')
    .scope('app1,app2,inferno')
    .log('info')
    .concurrency(1)
    .group(2)
    .raw('node')
    .flag('row', '0')
    .bin('tsc')

  fosho(script.toString(), t)
    .findStr('--scope=+(inferno-app1|inferno-app2|inferno)')
})
