const flags = require('flipflag')
const log = require('fliplog')
const Hub = require('./Hub')

// if this filters auto and it is before apps are decorated
// then it will only do `defaultApps`, `--apps`, and passed in filters
module.exports = class FilterHub extends Hub {

  /**
   * @param {Workflow} workflow
   * @see this.reset
   */
  constructor(workflow) {
    super(workflow)

    this.reset()
    this.debugForMsg = (msg) => log
      .tags('filter').text('☕  🏳️  ' + msg).xterm(223).echo()
    this.debugFor = ({data, msg}) => log
      .tags('filter').text(msg).color('white').data(data).echo()
  }

  /**
   * @param {Workflow} workflow
   * @return {FilterHub}
   */
  coreInit(workflow) {
    this.filter()
    workflow.filterContexts(this.list)
    workflow.core.filter = this.filter.bind(this)
    // log.data(workflow).color(1'bold').verbose(5).text('filtered...').echo()
    return this
  }

  /**
   * @param {Array} filters
   * @return {FilterHub}
   */
  setFilters(filters) {
    this.debugFor({setFilters: 'setting filters', filters})
    if (typeof filters === 'string') filters = [filters]
    this.filters = filters
    return this
  }

  /**
   * default app names used for filtering
   * @param {Array<String>} defaultAppNames
   * @return {FilterHub}
   */
  setDefaultAppNames(defaultAppNames) {
    this.defaultAppNames = defaultAppNames
    return this
  }

  /**
   * @return {FilterHub}
   */
  reset() {
    this.filters = null
    this.list = []
    return this
  }

  /**
   * @param {Function} fn
   * @return {FilterHub}
   */
  filterWith(fn) {
    this.debugForMsg('using defaultApps for contexts')
    const names = this.workflow.contextNames()
    const contexts = this.workflow.contexts
    for (let i = 0; names.length > i; i++) {
      const name = names[i]
      const context = contexts[name]
      if (fn(name, context)) {
        this.list.push(name)
      }
    }
    return this
  }

  /**
   * @param {Array<String>} whitelist
   * @return {FilterHub}
   */
  filterFor(whitelist) {
    this.debugFor({msg: ' with whitelist ', data: whitelist})
    const names = this.workflow.contextNames()
    for (let i = 0; names.length > i; i++) {
      const name = names[i]
      if (whitelist.includes(name)) {
        this.list.push(name)
      }
    }
    return this
  }

  /**
   * @return {FilterHub}
   */
  filterDefault() {
    this.debugFor('using defaultApps')
    this.filterFor(this.defaultAppNames)
    return this
  }

  /**
   * @return {FilterHub}
   */
  filterAuto() {
    const apps = flags('apps', {type: 'arr', default: false})
    if (apps) {
      this.debugForMsg(`had no filtering, but had '--apps=${apps}' flag`)
      this.filterFor(apps)
    } else {
      this.filterNoFilter()
    }
    return this
  }

  /**
   * @return {FilterHub}
   */
  filterNoFilter() {
    this.debugForMsg('had no filtering, all apps enabled')
    this.list = [].concat(this.workflow.contextNames())
    return this
  }

  /**
   * @param {Array<String> | Function} [filters]
   * @return {FilterHub}
   */
  filter(filters) {
    if (typeof filters === 'function') this.filterWith(filters)
    else if (Array.isArray(filters)) this.filterFor(filters)
    else if (this.defaultAppNames) this.filterDefault()
    else this.filterAuto()
    return this
  }
}
