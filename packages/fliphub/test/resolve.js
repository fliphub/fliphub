const path = require('path')
const test = require('ava')
const {fosho, log} = require('fosho')
const {FlipHub, resolve} = require('../src')

const realMonoRoot = path.resolve(__dirname, '../../../')
const appRoot = path.resolve(__dirname, '../')

// @TODO: fosho().hasString('/').times(10)
test('real appRoot contains packages & monoroot', (t) => {
  fosho(appRoot, t).findString('packages')
  fosho(appRoot, t).findString(realMonoRoot)
})
test('real monoroot does not contain packages', (t) => {
  fosho(realMonoRoot, t).aintGotString('packages')
})
// test.only('resolve root is a string', (t) => {
//   fosho(resolve.root, t).string()
// })


test.todo('resolving works for named scopes')
test.todo('resolving works for regular repo')
test.todo('resolving works for monorepo')
test.todo('is auto detected for regular repo')
test.todo('is auto detected for monorepo')

test('resolving `./`, is resolve by default to monorepo root', (t) => {
  t.plan(2)
  const resolver = resolve.scoped('mono')
  fosho(resolver, t).fn()

  const resolved = resolver('./')
  log.data({resolver, resolved}).verbose().reset(false)
  fosho(resolved, t).eq(realMonoRoot)
})

test(`resolving with a number set dirs up,
  1 will do app from test folder`, (t) => {
  t.plan(2)
  const resolver = resolve.scoped('app').setRoot(1)
  fosho(resolver, t).fn()

  const resolved = resolver('./')
  log
    .text('resolved')
    .color('bold')
    .data({resolved, appRoot})
    .verbose()
    .reset(false)

  fosho(resolved, t).eq(appRoot)
})

test('resolving `./`, is resolve goes to root when setting', (t) => {
  t.plan(2)
  const resolver = resolve.scoped('mono', 10)
  fosho(resolver, t).fn()

  const resolved = resolver('./')
  log.data({resolver, resolved}).verbose().reset(false)
  fosho(resolved, t).eq(realMonoRoot)
})

const obj = {
  fixtures: './fixtures',
  simple: './fixtures/simplestConfig',
  simplejs: './fixtures/simplestConfig.js',
}
test('resolves an object', (t) => {
  const resolver = resolve.scoped('obj', __dirname)
  const resolvedObj = resolver.obj(obj)
  log
    .text('root')
    .color('bold')
    .data(resolver.root)
    .reset(false)
    .text('resolved')
    .color('cyan')
    .json(resolvedObj)
    .reset(false)

  fosho(Object.values(resolvedObj), t).each('isAbs')
})
test('resolves an array', (t) => {
  const resolver = resolve.scoped('arr', __dirname)
  const vals = Object.values(obj)
  const resolvedVals = resolver.arr(vals)
  fosho(resolvedVals, t).each('isAbs')
})
