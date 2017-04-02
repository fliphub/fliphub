const path = require('path')
const test = require('ava')
const {del} = require('flipfile')
const res = require('fliphub-resolve')
const {fosho, log} = require('fosho')
const {FlipHub} = require('../src')

const outputFileAbs = path.resolve(__dirname, './dist/buildSync.js')
test.beforeEach(() => {
  del(outputFileAbs)
})

test('.buildSync builds without errors', async (t) => {
  // t.plan(1)
  const flips = new FlipHub({
    apps: [{
      target: 'node',
      name: 'building builds',
      entry: './src/paths.js',
      output: './test/dist/buildSync.js',
    }],
  })
  // flips.setup()
  // log.quick(flips.toConfig())
  await flips.buildSync()
})

test('.build calls setup if not called already', async (t) => {
  t.plan(1)
  const flips = new FlipHub({
    apps: [{
      target: 'node',
      name: 'building builds',
      entry: './src/paths.js',
      output: './test/dist/buildFast.js',
    }],
  })
  fosho(flips.state.setup, t).isFalse()
  await flips.buildSync()

  const config = flips.toConfig()
  // log.verbose().data(config).echo(false)
})

test(`.buildSync config is same as resolving output file
  & file exists - with webpack`, (t) => {
  // t.plan(3)
  const flips = new FlipHub({
    apps: [{
      target: 'node',
      name: 'building builds',
      entry: './src/paths.js',
      output: './test/dist/buildSync.js',
    }],
  })
  return t.notThrows(new Promise(resolve => {
    const done = flips.buildSync()
    fosho(done, t).isPromise()
    return done.then(() => {
      fosho(outputFileAbs, t).exists()
      // const output = flips.toConfig().pop().output
      // const outputFileConfig = output
      // const outputFile = res('./test/dist/buildSync.js')
      // fosho(outputFile, t).isAbs().eq(outputFileConfig)
      resolve()
    })
  }))
})

test('.buildSync with fusebox', async (t) => {
  t.plan(1)
  const flips = new FlipHub({
    apps: [{
      presets: {
        fusebox: '> [entry]',
      },
      flips: {
        to: 'fusebox',
      },
      name: 'buildSync',
      entry: './src/paths.js',
      output: './test/dist/buildSync.js',
    }],
  })
  // // t.notThrows(new Promise(resolve => {
  const done = await flips.build()
  // log.data(done).verbose().echo()
  // fosho(done, t).isPromise()
  // return done.then(() => t.pass())
  // }))
  fosho(outputFileAbs, t).exists()
})

test('.buildSync outputs built file - with fusebox', async (t) => {
  t.plan(1)
  const flips = new FlipHub({
    apps: [{
      target: 'node',
      presets: {
        // resolveAll: null,
        fusebox: '> [entry]',
      },
      flips: {
        to: 'fusebox',
      },
      name: 'buildSync',
      entry: './src/paths.js',
      output: './test/dist/$name.js',
    }],
  })

  const done = await flips.buildSync()
  // log.data(done).text('done?').color('bold').echo()
  // ava node_modules/ava/lib/test-worker.js
  // setTimeout(() => {
  //   log.data(done).text('done...?').color('bold').echo()
  // }, 5)
  fosho(outputFileAbs, t).exists()
})

test('.buildSync outputs built file - with rollup', async (t) => {
  // for some reason it does not count the ones in my promise?
  // (async fixes it :-)
  t.plan(2)
  const flips = new FlipHub({
    apps: [{
      flips: {
        to: 'rollup',
      },
      name: 'building builds',
      entry: './src/paths.js',
      output: './test/dist/buildSync.js',
    }],
  })
  const done = await flips.buildSync()
  log.data(done).text('done!').color('bold').echo()
  fosho(outputFileAbs, t).exists()
  t.pass()
})


test.failing('.buildFast builds multiple apps (issue with subprocesses in testing)', (t) => {
  t.fail()
  // const flips = new FlipHub({
  //   apps: [
  //     {
  //       target: 'node',
  //       name: 'building builds',
  //       entry: './src/paths.js',
  //       output: './test/dist/buildFast.js',
  //     },
  //   ],
  // })
  // t.notThrows(flips.buildFast().then(() => {
  //   t.plan(1)
  //   fosho(outputFileAbs, t).exists()
  // }))
})


// const outputFile = resolve('./')
// fosho().exists()
// // fosho(built, t).aight()
