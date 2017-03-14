const {arithmetics} = require('../src/lib/helpers/arithmetics')

const result = arithmetics
  .startBundle('coolbundle')
  .ignoreDeps()
  .and('>ooo.js')
  .add('ahhhh.js')
  .add('fuse.magic.ts')
  .add('*/**.js')
  .include('path')
  .include('fs')
  .exclude('magic-in-me')
  .finishBundle()

const singleBundle = result.finish()

const multipleBundles = result
  .startBundle('webworker')
  .includeDeps()
  .execute('/src/eh.js')
  .add('webworkerfile.js')
  .exclude('fs')
  .finishBundle()
  .finish()

// console.log(result, singleBundle, multipleBundles)
console.assert(typeof singleBundle === 'string', 'result with single is string')
console.assert(typeof multipleBundles === 'object', 'result with multi isobj')
