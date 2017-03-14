const Chainable = require('./chain/Chainable')

class Filterer extends Chainable {
  flagFor(name, val) {
    return `--${name}="${val}"`
  }
  prefixer(prefix, apps) {
    return apps.map(name => {
      if (!name.includes(prefix))name = prefix + '-' + name
      return name
    })
  }
  toGlob(apps) {
    return '+(' + apps.join('|') + ')'
  }
  globFlag(prefix, apps) {
    if (!apps) return ''
    apps = apps.split(',')
    apps = this.prefixer(prefix, apps)
    apps = this.toGlob(apps)
    return apps
  }
  defineEnv(envName, val) {
    process.env[envName] = val
    if (val === '' || !val) return ' '
    return `${envName}=` + val + ' '
  }
  envScope(envName, apps, prefix = 'inferno') {
    const flagVal = this.globFlag(prefix, apps)
    process.env[envName] = flagVal
    if (flagVal === '' || !flagVal) return ''
    return `${envName}="` + flagVal + '"'
  }
  scope(apps, prefix = 'inferno') {
    if (apps) {
      apps = this.globFlag(prefix, apps)
      const flag = this.flagFor('scope', apps)
      return flag
    }
    return ''
  }
}

module.exports = Filterer
