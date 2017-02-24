var path = require('path')

// type AliasType = {
//   // fs path
//   string: string,
//   ...
// }

class Aliaser {
  // string
  constructor(dirname, prefix = '') {
    this.__dirname = dirname
    this.prefix = prefix
  }

  // string => mixed
  resolve(relativePath) {
    return path.resolve(this.__dirname, relativePath)
  }

  // AliasType => AliasType
  reAlias(aliases) {
    var keys = Object.keys(aliases)
    keys.forEach(key => {
      var val = aliases[key]
      aliases[key] = this.resolve(val)
    })
    return aliases
  }

  // alias all of these
  // so we can use relative paths
  //
  // and also include them in the babel loader
  // (which we ought to be more explicit about)
  //
  // Array<AliasType> => AliasType
  mergeAliases(aliases) {
    var magicAliases = {}
    // [{aliasEh: 'eh'}, {aliasCanada: 'canada'}]
    // -> {aliasEh}
    // ->> 'aliasEh'
    aliases.forEach(aliasGroup => Object.keys(this.reAlias(aliasGroup)).forEach(key => {
      var alias = aliasGroup[key]
      magicAliases[key] = alias
    }))

    return magicAliases
  }

  // AliasType => ?AliasType
  requireAlias(alias) {
    if (typeof alias !== 'string' && typeof alias == 'object') {
      return alias
    }
    var resolved = this.resolve(this.prefix + alias)
    var required = require(resolved)
    return required
  }

  // @TODO: flush out
  // Array<AliasType> | AliasType => AliasType
  requireAndHandle(aliases, config) {
    if (Array.isArray(aliases))
      return this.handle(aliases.map(alias => this.requireAlias(alias)))
    return this.handle(this.requireAlias(aliases))
  }

  // Array<AliasType> | AliasType => AliasType
  handle(aliases) {
    if (Array.isArray(aliases)) return this.mergeAliases(aliases)
    return this.reAlias(aliases)
  }
}

module.exports = Aliaser
