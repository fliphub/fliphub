const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')
const File = require('./File')

/**
 * @TODO:
 * - [ ] needs to have a lib to spawn those children...
 *      (timeout...) on sigkill, then restore
 * - [ ] use env to pass configs (use flipscript ^w^)
 *
 * @config
 * @context
 * collection of 2 files
 */
module.exports = class Files extends ChainedMapExtendable {

  /**
   * @param {any} parent
   */
  constructor(parent) {
    super(parent)
    this.extend([
      'autoRestore',
      'autoRemove',
      'autoSave',
      'data',
      'dir', // is used by File not Files
      'onChanged',
      '_to',
      '_from',
    ])

    this
      // false | number - puts file contents back
      .autoRestore(false)
      // false | number - for temporary files
      .autoRemove(false)
      // false | true - to change things and make sure they get saved
      .autoSave(false)
      // todo
      .data({})
      // null | function | Enum[FlipCache.methods]
      // callback if original file has changed
      .onChanged(null)

    // go back to adding
    this.add = this.parent.add.bind(this.parent)

    // alias
    this.src = this.to.bind(this)
  }

  /**
   * @TODO: needs to re-resolve relative with .flip/
   *
   * takes a `from`, adds a `to`, writes
   * @return {Files}
   */
  backup() {
    const {_to, _from} = this.entries()
    if (_to) return this

    const file = new File(_from.absPath, this)
    this._to(file).setContent(_from.contents).write()
    return this
  }

  /**
   * this is the backup, or output config file
   *
   * if already set, returns the from
   *
   * @param {string} [path] defaults to this.from
   * @return {File}
   */
  to(path) {
    if (this.get('_to')) return this.get('_to')
    if (!path) path = this.get('_from')

    const file = new File(path, this)
    this._to(file)
    return file
  }

  /**
   * this is the original file
   * if it is not set, no restoring
   *
   * if already set, returns the from
   *
   * @param {string} path
   * @return {File}
   */
  from(path) {
    if (this.get('_from')) return this.get('_from')
    const file = new File(path, this)
    this._from(file)
    return file
  }

  /**
   * @TODO: has changed (fusebox)
   *
   * @see Files.from, Files.to
   * @return {boolean}
   */
  hasChanged() {
    return this.get('_from').read() !== this.get('_to').read()
  }

  /**
   * takes the `_from` (original),
   * writesthe contents of `_to` (the backup)
   *
   * @return {Files}
   */
  restore() {
    this.get('_from').write(this.get('_to'))
    return this
  }
}
