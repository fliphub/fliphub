// -----------

const flipcache = require('../src')

const mocha = flipcache
  .from('mochaOptsFile')
  .to('mochaOptsBackupFile')
  .autoRestore(2000)

// is a .to example
// on-the-fly
const onthefly = flipcache
  .from('fromfile')
  .to('otherfile')
  .autoRemove(2000)

const config = flipcache
  .to('.config.js')
  .json()
  .load()
  .key('eh', ['some values'])
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
