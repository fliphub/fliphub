const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')
const log = require('fliplog')
const File = require('./File')

// interface DetachedParentArgs {
//   from: ?AbsPath,
//   to: ?AbsPath,
//   start: Timestamp,
//   end: boolean || Timestamp,
//   timeout: number,
//   type: string,
//   key: string, // @example: 'from:AbsPath,to:AbsPath'
// }

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
   * @param {boolean} meta - if using itself to cache
   */
  constructor(parent, meta = false) {
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

    if (meta === false) this.setupMeta()
  }

  /**
   * sets up a flipcache file to store the backups to
   * ensure subsequent autoRestore requests do not overwrite original
   *
   * @since 0.0.6
   * @return {Files}
   */
  setupMeta() {
    this.meta = new Files(this, true)
      .to('.fliphub/flipcaches.json')
      .json()
      .load()
      .setIfNotEmpty('autoRestore', {})
      .setIfNotEmpty('autoRemove', {})
      .setIfNotEmpty('backups', {})

    return this
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

    let key = ''

    if (from) {
      fromAbs = from.absPath
      key += 'from:' + fromAbs
    }
    if (to) {
      toAbs = to.absPath
      key += 'to:' + toAbs
    }

    const args = {
      from: fromAbs,
      to: toAbs,
      start: Date.now(),
      end: false,
      timeout,
      type,
      key,
    }

    if (this.meta) {
      const cacheForType = this.meta.get(type)
      if (!cacheForType[key]) cacheForType[key] = []

      const index = cacheForType[key].length - 1
      const last = cacheForType[key][index]

      // if it has been longer than the original timeout
      // something may have gone wrong
      // so only ignore it if the time is less
      if (last && last.end === false)
        if (Date.now() - last.start <= last.timeout)
          return this

      cacheForType[key].push(args)

      this.meta.write()
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
   *
   * force:
   * - whether to backup
   *   if it has already been backed up
   *   within the operation timeout of restore or remove...
   * - or string for binding to `pre` other operations?
   *
   * @param {number} force how much time between backups
   * @return {Files}
   */
  backup(force = 2000) {
    const from = this.get('from')
    const to = this.get('to')
    const fromContent = from.load().contents


    // could go in a fn `getKey?` if I use it again
    let key = ''
    if (from) key += 'from:' + from.absPath
    if (to) key += 'to:' + to.absPath

    const backup = this.meta.get('backups')[key]
    // if (backup) log.quick(Date.now(), backup.start, (Date.now() - backup.start), force)
    if (backup && (Date.now() - backup.start) <= force) {
      // console.log('did not backup, was not forced ---------')
      return this
    } else {
      this.meta.get('backups')[key] = {start: Date.now()}
      // this.meta.set('backups.' + key, {start: Date.now()})
      this.meta.write()
    }

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
