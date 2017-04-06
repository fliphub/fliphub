const flipcache = require('../src')

// is a .to example
// on-the-fly
const onthefly = flipcache
  .from('fromfile').end()
  .to('otherfile')
  .autoRemove(2000)
