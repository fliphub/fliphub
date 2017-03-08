const {spawnSync} = require('child_process')

// @TODO:
// - [ ] only install ones that are missing
// - [ ] build this script using commander
// - [ ]
module.exports = function(deps) {
  if (!Array.isArray(deps)) deps = [deps]
  const depsToInstall = []
  deps.forEach(dep => {
    try {
      require(dep)
    } catch (e) {
      // console.log(e)
      console.log('installing missing: ', dep)
      depsToInstall.push(dep)
    }
  })

  if (depsToInstall.length) {
    spawnSync('npm', ['install'].concat(depsToInstall), {
      stdio: 'inherit',
    })
  }
}
