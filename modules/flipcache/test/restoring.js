const test = require('ava')
const flipcache = require('../src')

test.todo('config')
test.todo('restore')
test.todo('from to')

const config = flipcache
  .to('.config.js')
  .json()
  .load()
  .update('eh', ['some values'])
  .write()

// is a .to example
// on-the-fly
// const onthefly = flipcache
//   .from('fromfile')
//   .to('otherfile')
//   .autoRemove(2000)


// is a to.from example
// const flip = flipcache
//   .init()
//   .add('mocha')
//     .from('mochaOptsFile')
//     .to('mochaOptsBackupFile')
//     .autoRestore(2000)


// const onthefly = flipcache
//   .init()
//   .add('temp')
//     .from('fromfile')
//     .to('otherfile')
//     .autoRemove(2000)
