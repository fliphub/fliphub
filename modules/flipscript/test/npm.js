const test = require('ava')
const fosho = require('fosho')
const {ScriptFlip} = require('../src')

// https://github.com/npm/npm/issues/3494
test('npm auto adds doubledash/groups', (t) => {
  const scripts = new ScriptFlip()
    .add()
    .npm('diggy')
    .arg('--eh')
  fosho(scripts.toCmd().args, t).includes('--')
})
test('using npm created multiple grouped flags', (t) => {
  const scripts = new ScriptFlip()
  scripts
    .add()
    .npm('diggy')
    .env('magic')
    .flag('env.zoolala', 'aoao')
    .arg('-e')

  const data = Object.values(scripts.scripts).pop()
  t.pass(fosho(data.get('_npm')).eq('diggy'))
})

test('scriptflip creates expected result', (t) => {
  const scripts = new ScriptFlip()
  scripts
    .add()
    .npm('diggy')
    .env('magic')
    .flag('env.zoolala', 'aoao')
    .arg('-e')

  const cmd = scripts.toCmd()
  const env = Object.create(process.env)
  env.NODE_ENV = 'magic'

  const expected = [
    {
      bin: 'npm',
      args: [
        'run-script',
        'diggy',
        '--',
        '--env.zoolala=aoao',
        '-e',
      ],
      env,
    },
  ]

  fosho(cmd.pop(), t).deepEqual(expected.pop())
})

test.skip('something else', (t) => {
  const scripts = new ScriptFlip()
  scripts
    .add()
    .file('./diggy.js')
    .raw('--')
    .flag('env.zoolala', 'oaaaa')
    .envs('magicfile')
    .arg('-e')

    // console.log(scripts.toString())
    // log.quick(scripts.toString())
    // log.quick(scripts.toCmd())
    // ---
    // .envDefine('prod')
    // .envArg('prod')
    // .run('name')
    // .parent
    // .exec()
    // ---
    // log.quick(scripts.toString())
    // const data = log.json(log.stringify(scripts).returnVals()).echo()
    // ---
    //
    // .binPath('../../')
    // .nodeBinPath('../../node_modules/.bin/') // not needed
    // log.quick(data)
})
