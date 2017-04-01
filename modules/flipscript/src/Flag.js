const real = require('izz/realNotEmpty')
const {Context} = require('fliphub-core')

// https://github.com/adamjeffries/cmdx
module.exports = class Flag extends Context {
  constructor(parent) {
    super(parent)
    delete this.parent
    this.dash = false
    this.stringify = false
    this.name = String
    this.value = undefined

    // so we can have groups by `--`
    // and index of flags
    // this.index = 0
    // this.group = 0
  }

  shouldStringify() {
    if (this.stringify) return true
    if (typeof this.value !== 'string') return false

    // any letter or number, or -_, but not double dash
    return !(/[a-zA-Z0-9-_]/.test(this.value) && !this.value.includes('--'))
  }

  toString() {
    let string = ''

    // if dash: --
    // if prefix: (monorepo) e.g. (inferno-compat, lodash.forown)
    if (this.dash) string = '--'
    string += this.name

    // if value & stringify: --name='val', name='val'
    // else if value:        name=val,
    // else:                 --name, name
    if (real(this.value)) {
      if (this.shouldStringify()) string += `="${this.value}"`
      else string += `=${this.value}`
    }

    return string
  }
}
