const execa = require('execa')

execa('rimraf', ['eh/*.js'])

// flip.lerna.execWith({
//   scope: name || scope,
//   bin: 'tsc',
//   log: log || 'info',
// })

// will add lerna glob scope, different than env scope
scripty
  // this would return lerna
  .lerna()

  // doubleDash()
  .group(1)
  .envs('prod,dev,')
  .scope('name', 'value', '*')
  .log('info')
  .concurrency(1)

  // .binPath('../../')
  // .nodeBinPath('../../node_modules/.bin/') // not needed
  .group(2)
  .bin('tsc,rollup')
  .exec()

scripty
  .bin('karma')
  .scope('name', 'value', '*')
  .flag()
  .sync()

scripty
  .npm('script')
  .flag()
  .flag()
  .run('name')


// const globScoped = flip.globScope(packages) || '*'
// const envScope = flip.envScope('PKG_FILTER', packages)
// let flagged = flaggedWithEnv + globScoped
// if (browsers) {
//   browsers.split(',').forEach(browser => {
//     // also could do flip.execSync(flagged + 'npm run karma:' + browser.toLowerCase())
//     flip.runScriptForBin('karma', 'start test/karma/karma.unit.conf.js --browsers=' + browsers + ' ' + flagged)
//   })
// }
//
// flip.execSync(' npm run karma:chrome ' + flagged)
//
// flip.lerna.execFrom({
//   bin: 'rollup',
//   envs: ['production', 'browser', 'development'],
//   log: log || 'info',
//   options,
// })
