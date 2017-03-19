const {spawnSync} = require('child_process')

// @TODO:
// - [ ] only install ones that are missing
// - [ ] build this script using commander
// - [ ]
module.exports = function(deps) {
  if (!Array.isArray(deps)) deps = [deps]
  const depsToInstall = []
  let logged = false
  deps.forEach(dep => {
    try {
      require(dep)
    } catch (e) {
      // console.log(e)
      console.log('installing missing: ', dep)
      logged = true
      depsToInstall.push(dep)
    }
  })
  if (logged === false) console.log('deps up to date :-)')

  if (depsToInstall.length) {
    spawnSync('npm', ['install'].concat(depsToInstall), {
      stdio: 'inherit',
    })
  }
}
