const test = require('ava')
const fosho = require('fosho')
const {ScriptFlip} = require('../src')

test(`running a built script
  will log the correct stdout
  and will find the correct flag values`, async (t) => {
  t.plan(4)
  const scripts = new ScriptFlip().debug(false)
  scripts
    .add()
    .npm('diggy')
    .env('magic')
    .flag('env.zoolala', 'aoao')
    .arg('-e')

  const results = await scripts.run()
  fosho(results.pop().stdout, t)
    .findStr('bumbididodidangadangdiggigiggi')
    .findStr('--env.zoolala=aoao')
    .findStr('-e')
  return t.pass()
})


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
