const {read, write} = require('./helpers')

// PkgMnger
class PackageManager {
  saveOgPkg(pkg) {
    const ogPkg = JSON.stringify(pkg, null, 2)
    write('./.fliphub/package.json', ogPkg)
  }
  restoreOgPkg() {

  }
  updatePkg(updated) {
    write('./package.json', JSON.stringify(updated, null, 2))
  }

  addToGitIgnore(line) {
    const file = './.gitignore'

    let gitignore = read(file)
    if (gitignore.includes(line)) return
    gitignore += '\n' + line

    write(file, gitignore)
  }
}

module.exports = PackageManager
