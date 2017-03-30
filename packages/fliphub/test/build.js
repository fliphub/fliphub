const path = require('path')
const test = require('ava')
const flipfile = require('flipfile')
const res = require('fliphub-resolve')
const {fosho, log} = require('fosho')
const {FlipHub} = require('../src')

const outputFileAbs = path.resolve(__dirname, './dist/buildSync.js')
test.beforeEach(() => {
  flipfile.del(outputFileAbs)
})

test('.buildSync builds without errors', (t) => {
  t.plan(1)
  const flips = new FlipHub({
    apps: [{
      target: 'node',
      name: 'building builds',
      entry: './src/paths.js',
      output: './test/dist/buildSync.js',
    }],
  })
  flips.setup()
  // log.quick(flips.toConfig())
  t.notThrows(new Promise(resolve => resolve(flips.buildSync())))
})

test('.build calls setup if not called already', (t) => {
  t.plan(2)
  const flips = new FlipHub({
    apps: [{
      target: 'node',
      name: 'building builds',
      entry: './src/paths.js',
      output: './test/dist/buildFast.js',
    }],
  })
  fosho(flips.state.setup, t).isFalse()
  t.notThrows(new Promise(resolve => resolve(flips.buildSync())))

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
  t.notThrows(new Promise(resolve => {
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

test.failing('.buildSync with fusebox', (t) => {
  const flips = new FlipHub({
    apps: [{
      presets: {
        fusebox: '> [entry]',
      },
      flips: {
        to: 'fusebox',
      },
      name: 'building builds',
      entry: './src/paths.js',
      output: './test/dist/buildSync.js',
    }],
  })
  flips.setup()
  t.notThrows(new Promise(resolve => {
    const done = flips.build()
    // log.data(done).verbose().echo()
    fosho(done, t).isPromise()
    return done.then(() => resolve())
  }))
  // const outputFile = res('./test/dist/buildSync.js')
  // fosho(outputFile, t).exists()
})

test.failing('.buildSync outputs built file - with fusebox', (t) => {
  t.plan(2)
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
  t.notThrows(new Promise(resolve => {
    const done = flips.buildSync()
    // log.data(done).text('done?').color('bold').echo()
    // ava node_modules/ava/lib/test-worker.js
    // setTimeout(() => {
    //   log.data(done).text('done...?').color('bold').echo()
    // }, 5)
    fosho(outputFileAbs, t).exists()
  }))
})

// .only
test('.buildSync outputs built file - with rollup', (t) => {
  // for some reason it does not count the ones in my promise?
  // t.plan(2)
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
  t.notThrows(new Promise(resolve => {
    const done = flips.buildSync()
    log.data(done).text('done?').color('bold').echo()
    // setInterval(() => {
    //   log.data(done).text('done...?').color('bold').echo()
    // }, 250)
    // const outputFile = res('./test/dist/buildSync.js')

    return done.then(() => {
      fosho(outputFileAbs, t).exists()
      resolve()
    })
  }))
})

test.failing('.buildFast builds multiple apps', (t) => {
  const flips = new FlipHub({
    apps: [
      {
        target: 'node',
        name: 'building builds',
        entry: './src/paths.js',
        output: './test/dist/buildFast.js',
      },
    ],
  })
  t.notThrows(flips.buildFast().then(() => {
    t.plan(1)
    fosho(outputFileAbs, t).exists()
  }))
})


// const outputFile = resolve('./')
// fosho().exists()
// // fosho(built, t).aight()
