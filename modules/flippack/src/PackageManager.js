const flipcache = require('flipcache')
const {read, write} = require('flipfile')

class PackageManager {
  constructor() {
    this.pkg = flipcache.from('package.json').json().load().parent
  }
  backup(pkg) {
    this.pkg.backup()
    return this
  }
  restore() {
    this.pkg.restore()
    return this
  }
  update(updated) {
    this.pkg.from().setContent(updated).write()
    return this
  }
  addToGitIgnore(line) {
    const gitignore = flipcache.to('./.gitignore').load()
    if (gitignore.contents.includes(line)) return
    gitignore.appendContent('\n' + line).write()
  }
}

module.exports = PackageManager
