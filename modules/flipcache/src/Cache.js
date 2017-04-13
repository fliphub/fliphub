const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')
const read = require('flipfile/read')
const fliphash = require('fliphash')
const log = require('fliplog')

/**
 * @TODO:
 *  - [ ] multiple files manager
 *  - [ ] option to use fliphash or not
 *  - [ ] support pkgjson configs
 *  - [ ] deal with ava changing cwd...
 *  - [x] debugging
 */
module.exports = class Cache extends ChainedMapExtendable {

  // --- setup ---

  /**
   * @inheritDoc flipchain/ChainedMapExtendable
   * @param {any} parent
   * @param {File} file
   */
  constructor(parent, file) {
    super(parent)

    this.file = file
      .json()
      .load()

    this.set('debug', false)
  }

  /**
   * @since 0.0.11
   * @param  {string | Array<string>} hashkey
   * @return {Files}
   */
  hash(hashkey) {
    if (Array.isArray(hashkey)) hashkey = hashkey.join('')

    return this.set('hashkey', fliphash(hashkey)).bustOnChange()
  }

  /**
   * @private
   * @param {string} [mapKey] if not key, used cacheBustingFiles
   * @return {string}
   */
  key(mapKey = null) {
    let key = ''
    key += this.get('hashkey')

    if (mapKey !== null) {
      if (mapKey[0] !== '.') mapKey = '.' + mapKey
      key += mapKey
    }

    return key
  }

  /**
   * @since 0.0.11
   * @param  {string} [timeout='1 day']
   * @return {Cache}
   */
  staleTimeout(timeout = '1 day') {
    const key = this.key('staleTimeout')
    this.set('staleTimeout').file.set(key, timeout)
    return this
  }

  /**
   * @since 0.0.11
   * @param {boolean} [should=true]
   * @return {Cache}
   */
  debug(should = true) {
    return this.set('debug', should)
  }

  // --- checks ---

  /**
   * @since 0.0.11
   * @param  {string} contents
   * @return {boolean}
   */
  hashChanged(contents) {
    return this.file.read(true) !== fliphash(contents)
  }

  /**
   * @see Cache.key
   * @since 0.0.11
   * @return {boolean}
   */
  isStale() {
    const staleKey = this.key('staleTimeout')
    const time = this.key('time')
    if (this.file.has(staleKey)) {
      const diff = Date.now() - this.file.get(time)
      return diff > this.file.get(staleKey)
    }
    return false
  }

  /**
   * 1. has contents
   * 2. files have not changed
   * 3. optional - contents have not changed
   * 4. optional - stale has been set, this.isStale
   *
   * @see Cache.key, Cache.bustIfNeeded, Cache.isStale, Cache.file
   *
   * @since 0.0.11
   * @param {string} [contents]
   * @return {boolean}
   */
  canBeUsed(contents = null) {
    if (this.file.has(this.key('contents')) === false) {
      log.yellow('has no content').echo(this.get('debug'))
      return false
    }

    if (this.has('busted') === true) {
      log.yellow('is busted!').echo(this.get('debug'))
      return false
    }

    if (this.isStale() === true) {
      log.yellow('is stale').echo(this.get('debug'))
      return false
    }

    if (contents !== null && this.hashChanged(contents) === true) {
      log
        .yellow('is busted?')
        .data(this.get('busted'))
        .echo(this.get('debug'))

      return false
    }

    if (this.has('busted') === false) {
      log.yellow('about to bust').echo(this.get('debug'))
      this.bustIfNeeded()

      log
        .yellow('is busted?')
        .data(this.get('busted'))
        .echo(this.get('debug'))

      return this.get('busted') === false
    }

    // log.quick({
    //   contents,
    //   key: this.key(),
    //   contentKey: this.key('contents'),
    //   content: this.file.get(this.key('contents')),
    //   file: this.file.contents,
    //   busted: this.get('busted'),
    //   isStale: this.isStale(),
    // })

    return true
  }

  // --- mutators ---

  /**
   * @since 0.0.11
   * @return {Cache}
   */
  bustIfNeeded() {
    const cacheBustingFiles = this.get('cacheBustingFiles')
    const key = this.key('cacheBustingFiles.files')
    const filesHash = this.key('cacheBustingFiles.hash')

    // could load and cache these to ensure they are only loaded once...
    const fileContents = cacheBustingFiles
      .split(',')
      .map(read)
      .map(fliphash)
      .join(',')

    // does not have it? set it
    if (this.file.has(filesHash) === false || this.file.has(key) === false) {
      this
        .set('busted', false)
        .file
        .set(key, cacheBustingFiles)
        .set(filesHash, fileContents)
        .write()

      return this
    }

    // the same, ignore
    if (fileContents === this.file.get(key)) {
      return this.set('busted', false).file.set(key, fileContents).write()
    }

    // not the same, set it, then bust it
    this.set('busted', true).file.set(key, fileContents).write()

    return this.bust()
  }

  // --- content ---

  /**
   * @since 0.0.11
   * @param {string} contents
   * @param {boolean} [hash=false]
   * @return {Cache}
   */
  setContent(contents, hash = false) {
    const contentKey = this.key('contents')
    const timeKey = this.key('time')

    if (hash) contents = fliphash(contents)

    this
      .file
      .set(contentKey, contents)
      .set(timeKey, Date.now())
      .write()

    return this
  }

  /**
   * @since 0.0.11
   * @return {any}
   */
  getContent() {
    return this
      .file
      .read(true)
      .get(this.key('contents'))
  }

  // --- bust ---

  /**
   * @since 0.0.11
   * @param {Array<string>} [files=[require.main.filename]]
   * @return {Cache}
   */
  bustOnChange(files = [require.main.filename]) {
    this.set('cacheBustingFiles', files.join(','))
    return this
  }

  /**
   * @see Cache.onBusted,
   * @return {Cache}
   */
  bust() {
    const cb = this.get('onBusted')
    if (cb) cb(this)
    return this
  }

  /**
   * set files to check,
   * if they change,
   * perform the callback
   *
   * @since 0.0.11
   * @see Files.setupMeta
   * @param {Function} [cb=[Function.prototype]]
   * @return {Cache}
   */
  onBusted(cb = Function.prototype) {
    this.set('onBusted', cb)
    return this
  }
}
