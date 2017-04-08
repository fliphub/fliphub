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
      'data',
      'onChanged',
    ])

    this
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
   * @TODO:
   *  write the configs to a file,
   *  then when writing and checking `lastWritten`
   *  should have a `flipcache` `nodeconfig` which contains those
   *  so it can save when the `autoRestore` was slated
   *  then check against when it was last written
   *
   * @param  {number | boolean} timeout
   * @param  {string} type
   * @return {Files}
   */
  autoFactory(timeout, type) {
    this.set(type, timeout)

    const {from, to} = this.entries()
    let fromAbs
    let toAbs

    if (from) fromAbs = from.absPath
    if (to) toAbs = to.absPath

    const args = {
      from: fromAbs,
      to: toAbs,
      timeout,
      type,
    }

    this.parent.autoFactory(args)
    return this
  }

  // false | number - puts file contents back
  autoRestore(timeout = 2000) {
    return this.autoFactory(timeout, 'autoRestore')
  }
  // false | number - for temporary files
  autoRemove(timeout = 2000) {
    return this.autoFactory(timeout, 'autoRemove')
  }
  // false | true - to change things and make sure they get saved
  // autoSave(val) {}

  dir(dir) {
    if (this.get('to')) this.get('to').dir(dir)
    if (this.get('from')) this.get('from').dir(dir)
    return this
  }

  /**
   * @TODO: needs to re-resolve relative with .flip/
   *
   * takes a `from`, adds a `to`, writes
   * @return {Files}
   */
  backup() {
    const from = this.get('from')
    const to = this.get('to')
    const fromContent = from.load().contents

    // console.log('backup...', fromContent)
    if (to) {
      to.setContent(fromContent).write()
    }
    else {
      const file = new File(from.absPath + '-backup', this)
        .setContent(fromContent)
        .write()

      this.set('to', file)
    }
    // console.log('backup complete...')

    return this
  }

  /**
   * could just have a FileFactory here too
   * adds methods from Files to File for chaining
   * @private
   * @param  {File} file
   * @return {Files}
   */
  decorateFile(file) {
    file.autoRemove = (timeout) => {
      this.autoRemove(timeout)
      return file
    }
    file.autoRestore = (timeout) => {
      this.autoRestore(timeout)
      return file
    }
    file.from = (args) => {
      this.from(args)
      return file
    }
    file.to = (args) => {
      this.to(args)
      return file
    }
    // file.autoSave = this.autoSave.bind(this)
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
    if (this.get('to')) return this.get('to')
    if (!path) path = this.get('from')

    const file = new File(path, this)
    this.decorateFile(file)
    this.set('to', file)
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
    if (this.get('from')) return this.get('from')
    const file = new File(path, this)
    this.decorateFile(file)
    this.set('from', file)
    return file
  }

  /**
   * @TODO: has changed (fusebox)
   *
   * @see Files.from, Files.to
   * @return {boolean}
   */
  hasChanged() {
    return this.get('from').read() !== this.get('to').read()
  }

  /**
   * takes the `from` (original),
   * writesthe contents of `to` (the backup)
   *
   * @return {Files}
   */
  restore() {
    this.get('from').write(this.get('to'))
    return this
  }
}
