const flipcache = require('../src')

const mocha = flipcache
  .from('mochaOptsFile')
  .to('mochaOptsBackupFile')
  .autoRestore(2000)
