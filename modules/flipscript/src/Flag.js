const real = require('izz/realNotEmpty')
const {Context} = require('fliphub-core')

// https://github.com/adamjeffries/cmdx
module.exports = class Flag extends Context {

  /**
   * @since 0.0.6
   * @see FlipChain
   * @param {any} parent
   * @return {Flag}
   */
  static init(parent) {
    return new Flag(parent)
  }

  constructor(parent) {
    super(parent)
    // delete this.parent

    /**
     * @since 0.0.6
     */
    this
      .extend([
        'dash', 'stringify', 'name', 'value',
      ])
      .dash(false)
      .stringify(false)
      .name(String)
      .value(undefined)

    // so we can have groups by `--`
    // and index of flags
    // this.index = 0
    // this.group = 0
  }

  /**
   * @since 0.0.3
   * @return {boolean}
   */
  shouldStringify() {
    const {value, stringify} = this.entries()
    if (stringify) return true
    if (typeof value !== 'string') return false

    // any letter or number, or -_, but not double dash
    // or has any special character
    return (
      (!(/[a-zA-Z0-9-_]/.test(value)) && !value.includes('--')) ||
      (/[+=~`@#$%^&*().,\/\\:;'"{}|]/).test(value)
    )
  }

  /**
   * @since 0.0.3
   * @return {string}
   */
  toString() {
    let string = ''
    let {dash, name, value} = this.entries()

    // if dash: --
    // if prefix: (monorepo) e.g. (inferno-compat, lodash.forown)
    if (dash) string = '--'
    string += name

    // if value & stringify: --name='val', name='val'
    // else if value:        name=val,
    // else:                 --name, name
    if (real(value)) {
      if (this.shouldStringify()) string += `="${value}"`
      else string += `=${value}`
    }

    return string
  }
}
