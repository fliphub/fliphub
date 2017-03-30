// @TODO: dry
// if (AppsBuilder.isWebpackCli) {
//   this.helpers.log.text('🕸  🛅  🖥  was webpack cli: fullAuto()')
//   if (!options.force) return this.mediator()
// }

const AbstractHub = require('./AbstractHub')

// @TODO:
// could filter and set a filtered property
// or emit handlers based on it
//
// ...need to filter before building...
// ...and after setting up translations...
//
//
// @TODO: should return box here and decorate like other hubs
class Filter extends AbstractHub {
  constructor(box) {
    super(box)
    this.box = box
    this.inspect = inspectorGadget(this, ['box'])

    this.reset()
    const helpers = box.helpers
    const level = '☕  🏳️  '
    const color = 'blue'
    this.debugForMsg = (msg) => box.debugFor('filter', level + msg, 223)
    this.debugFor = ({data, msg}) => box.debugFor('filter', msg, 'white', data)
  }

  onBoxSetup({box, apps}) {
    // this.contexts = box.apps.contexts
    // this.contextNames = this.apps.contextNames
    this.contextNames = apps.contextNames
    return this
  }

  // @TODO:
  // if it does not match the filters,
  // prevent it from building?
  appInit() {

  }

  // @param Array
  // @chainable
  setFilters(filters) {
    this.debugFor({setFilters: 'setting filters', filters})
    if (typeof filters === 'string') filters = [filters]
    this.filters = filters
    return this
  }

  // default app names used for filtering
  // @param Array
  // @chainable
  setDefaultAppNames(defaultAppNames) {
    this.defaultAppNames = defaultAppNames
    return this
  }

  reset() {
    // this.filtered = {}
    this.filteredNames = []
    return this
  }

  filterWith(fn) {
    this.debugForMsg('using defaultApps for contexts')
    for (let i = 0; this.contextNames.length > i; i++) {
      const name = this.contextNames[i]
      const context = this.contexts[name]
      if (fn(name, context)) {
        this.filteredNames.push(name)
        // this.filtered[name] = context
      }
    }
    return this
  }

  filterFor(whitelist) {
    this.debugFor({msg: ' with whitelist ', data: whitelist})
    for (let i = 0; this.contextNames.length > i; i++) {
      const name = this.contextNames[i]
      // const context = this.contexts[name]
      if (whitelist.includes(name)) {
        this.filteredNames.push(name)
        // this.filtered[name] = context
      }
    }
    return this
  }

  filterDefault() {
    this.debugFor('using defaultApps')
    this.filterFor(this.defaultAppNames)
    return this
  }

  filterAuto() {
    const flags = this.box.helpers.flags
    const apps = flags.searchAll('apps', {type: 'arr', default: false})
    if (apps) {
      this.debugForMsg(`had no filtering, but had '--apps=${apps}' flag`)
      this.filterFor(apps)
    } else this.filterNoFilter()
    return this
  }

  filterNoFilter() {
    this.debugForMsg('had no filtering, all apps enabled')
    this.filteredNames = [].concat(this.contextNames)
    // this.filtered = this.contexts
    return this
  }

  // this should filter for all apps right
  // then pass down to trigger ops for each app?
  filter(filters) {
    if (typeof filters === 'function') this.filterWith(filters)
    else if (Array.isArray(filters)) this.filterFor(filters)
    else if (this.defaultAppNames) this.filterDefault()
    else this.filterAuto()
    return this
  }
}

module.exports = Filter
