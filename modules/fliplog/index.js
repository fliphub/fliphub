// @TODO:
// - [x] add debugFor filters here
// - [ ] more formatting
//  - [ ] easy table
//  - [ ] json
// - [ ] storyline
// - [ ] docs
// - [ ] emoji by name - checkout existing ones
// - [ ] integrate an existing validator
// - [ ] https://github.com/sindresorhus/boxen

// https://developer.mozilla.org/en-US/docs/Web/API/Console/table
// https://github.com/Automattic/cli-table
// const ansi = require('ansi')
// const cursor = ansi(process.stdout)
const chalk = require('chalk')
const clc = require('cli-color')
const {inspector} = require('inspector-gadget')
const ChainedMapExtendable = require('flipchain/ChainedMapExtendable.js')
const Chainable = require('flipchain/Chainable.js')
const toarr = require('to-arr')
const emojiByName = require('./emoji-by-name')

// https://github.com/npm/npmlog
// http://tostring.it/2014/06/23/advanced-logging-with-nodejs/
// http://www.100percentjs.com/best-way-debug-node-js/
// https://www.loggly.com/ultimate-guide/node-logging-basics/
// https://www.npmjs.com/package/cli-color
const clrs = [
  'black', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray',
]
const bgColors = [
  'bgBlack', 'bgRed', 'bgGreen', 'bgYellow', 'bgBlue', 'bgMagenta', 'bgCyan', 'bgWhite',
]
const em = [
  'italic', 'bold', 'underline',
]
const xtermByName = {
  colors: {
    'orange': 202,
  },
  bg: {
    'orange': 236,
  },
}
const combinations = clrs.concat(bgColors).concat(em)

// https://www.youtube.com/watch?v=SwSle66O5sU
const OFF = `${~315 >>> 3}@@`

// presets
function presetError(chain) {
  return chain.text('error').color('bgRed.black').verbose()
}
function presetWarning(chain) {
  return chain.text('⚠  warning:').color('bgYellow.black').verbose()
}
function presetInfo(chain) {
  return chain.text('ℹ️️  info:').color('blue')
}
function presetNote(chain) {
  return chain.text('📋️  note:').color('dim')
}
function presetImportant(chain) {
  return chain.text('❗  important:').color('red.bold')
}

class LogChain extends ChainedMapExtendable {
  // @TODO:
  // here, object.assign to a function,
  // then allow passing in an object which could chain the calls
  new() {
    const logChain = new LogChain(this)
    return logChain


    function logfn(arg) {
      if (arg === OFF) return logChain
      console.log('calling as fn?', arg)
      return logChain.data(arg).verbose().echo()
    }

    logfn.__proto__ = LogChain.prototype

    // console.log(Object.keys(logChain))
    const newed = new logfn(OFF)
    newed.handleParent(this)
    // const newed = Object.assign(logfn, logChain)
    // const newed = create(logfn, logChain)
    // console.log(newed)
    // process.exit()
    return newed
  }
  constructor(parent) {
    super(parent)
    this.extend([
      'color',
      '_tags',
      '_data',
      '_xterm',
      '_text',
      'title',
      'diffs',
      'filters',
      // 'presets',
    ])
    this.extendTrue([
      'space',
      'tosource',
      'time',
      'table',
      'verbose',
      'silent',
    ])

    this.presets = {}
    this.echo = this.log
    this.reset()

    // so it can be called with
    // `.catch(log.catch)`
    this.catch = this.catch.bind(this)
    this.handleParent(parent)
  }

  handleParent(parent) {
    if (!parent || !(parent instanceof Chainable)) return
    const {filters} = parent.entries()
    const {presets} = parent
    if (presets) this.presets = presets
    if (filters) this.filters(filters)
  }

  // table() {
  //   var table = new Table()
  //   table.push(
  //     {'Some key': 'Some value'},
  //     {'Another key': 'Another value'}
  //   )
  //   console.log(chalk.cyan(table.toString()))
  //   process.exit()
  // }

  // credit to https://github.com/challenger532 for this
  // take in 2 things to diff
  // can pass in a diff1 and then call diff again to diff again
  diff() {
    const clone = require('lodash.clonedeep')
    const diffs = this.get('diffs')
    const args = Array.from(arguments).map((arg) => clone(arg))

    this.diffs(diffs.concat(args))
    return this
  }
  doDiff() {
    const Table = require('cli-table2')
    const deepDiff = require('deep-diff')
    const tosource = require('tosource')
    const colWidths = [200, 200, 200]

    const diffs = this.get('diffs')
    const diff = deepDiff(diffs.pop(), diffs.pop())
    // console.log(diff)

    const heads = diff.map(Object.keys)
    const datas = diff.map(Object.values)
    // console.log({heads, datas})
    for (const i in heads) {
      const head = heads[i]
      const data = datas[i].map((d) => tosource(d))
      // console.log({head, data})

      const table = new Table({
        head,
        // colWidths,
      })
      table.push(data)
      console.log(table.toString())
    }
    return this
  }


  returnVals() {
    const text = this.logText()
    const datas = this.logData()
    if (datas !== OFF && text !== OFF) return {text, datas}
    else if (datas !== OFF) return {datas}
    else if (text !== OFF) return {text}
    else return {text, datas}
  }
  return() {
    this._filterByTag()
    const returnVals = this.returnVals()
    const entries = this.entries()
    this.reset()
    return Object.assign(entries, returnVals)
  }

  data(arg) {
    const args = Array.from(arguments)
    if (args.length === 1) {
      return this._data(arg)
    }
    return this._data(arguments)
  }
  text(text) {
    const title = this.get('title') ? `${this.get('title')} ` : ''
    this._text(title + text)
    return this
  }
  emoji(name) {
    return this.title(`${emojiByName(name)}  `)
  }
  addText(msg) {
    this.text(`${this.get('_text')} ${msg}`)
    return this
  }
  addPreset(name, preset) {
    this.presets[name] = preset
    return this
  }
  preset(names) {
    if (!Array.isArray(names)) names = [names]
    for (const index in names) {
      const name = names[index]
      this.presets[name](this)
    }
    return this
  }

  // @TODO:
  // wildcard, best using [] instead
  // use debugFor.js
  // enableTags, disableTags
  // handle keys here...
  filter(filters) {
    const filter = toarr(filters).concat(this.get('filters') || [])
    this.filters(filter)
    return this
  }
  tags(names) {
    const tags = this.get('_tags') || []
    const updated = tags.concat(toarr(names))
    this.set('_tags', updated)
    return this
  }

  // @TODO: filter with `&` so only filter if it has all tags
  // maybe flipfilter?
  _filterTagsByFilter(filter, not) {
    const tags = this.get('_tags') || []

    if (tags.length === 0) return true

    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i]
      // console.log({tag, i, not}, filter.includes(tag))
      if (not && filter.includes(tag)) return false

      // @TODO: later if only whitelisting...
      if (filter.includes(tag)) return true
    }

    return true
  }

  // check if the filters allow the tags
  _filterByTag() {
    const filters = this.get('filters') || []
    // console.log({filters})
    if (filters.includes('*')) return this

    // silence all
    if (filters.includes('silent')) return this.silent()

    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i]
      let not = false
      if (filter.includes('!')) not = true
      // console.log({filter, i, not})

      const result = this._filterTagsByFilter(filter, not)
      if (result === false) {
        // console.log({not, filter})
        return this.silent(true)
      }
    }

    return this
  }


  // just output
  just(data) {
    if (typeof data === 'string') this.text(data)
    else this.data(data)
    this.verbose(true)
    return this.log()
  }

  log(data) {
    this._filterByTag()
    if (!data) data = this.get('_data')
    if (data === false) {
      this.reset()
      return this
    }

    if (this.get('silent')) {
      this.reset()
      return this
    }

    // so we can have them on 1 line
    const text = this.logText()
    const datas = this.logData()

    if (datas !== OFF && text !== OFF) console.log(text, datas)
    else if (datas !== OFF) console.log(datas)
    else if (text !== OFF) console.log(text)
    else console.log(text, datas)

    this.logSpaces()
    this.reset()
    return this
  }

  trace() {
    this.new().preset('error').verbose().data(new Error('log.trace')).echo()
    return this
  }
  error() {
    for (const arg of arguments) this.new().preset('error').verbose().data(arg).echo()
    return this
  }
  quick() {
    this.data(arguments).verbose().exit()
  }
  exit(log = false) {
    this.echo()
    this.reset()
    if (log) console.log('🛑  exit')
    process.exit()
  }
  catch() {
    this.error(arguments).exit(1)
  }

  reset() {
    // persist the time logging
    if (this.get('time')) this.time(true)

    this.diffs([])
    this.color('magenta')
    this.text('debug')
    this.title('')
    this.data(null)
    this.table(false)
    this.tosource(false)
    this.verbose(false)
    this.space(false)
    this.silent(false)
    this._data(OFF)
    this._tags([])
    return this
  }
  clear() {
    process.stdout.write(clc.reset)
    return this
  }
  logText() {
    let text = this.get('_text')
    text = this.getColored(text)
    text = this.getTime(text)

    if (!text) return OFF
    return text
  }
  logData() {
    let data = this.get('_data')
    if (data === OFF) return OFF

    data = this.getToSource(data)
    data = this.getVerbose(data)

    return data
  }
  logSpaces(msg) {
    const space = this.get('space')
    if (Number.isInteger(space)) console.log('\n'.repeat(space))
    if (space === true) console.log('\n\n\n')
    return msg
  }

  getColored(msg) {
    const logWrapFn = this.getLogWrapFn()
    if (this.get('_text')) return `${logWrapFn(msg)}`
    return `${logWrapFn(this.get('_text'))}:`
  }
  getLogWrapFn() {
    let logWrapFn = chalk
    const color = this.get('color')

    // maybe we colored with something not in chalk, like xterm
    if (typeof color === 'function') logWrapFn = color
    else if (color === false) logWrapFn = (msg) => msg
    else if (color.includes('.')) color.split('.').forEach((clr) => logWrapFn = logWrapFn[clr])
    else if (combinations.includes(color)) logWrapFn = logWrapFn[color]
    else if (logWrapFn[color]) logWrapFn = logWrapFn[color]
    return logWrapFn
  }
  getChalked(msg) {}

  xterm(color, bgColor) {
    if (typeof color === 'string' && color.includes('.')) {
      const colorArr = color.split('.')
      const txt = colorArr.shift()
      const bg = colorArr.pop()
      color = clc.xterm(txt).bgXterm(bg)
    }    else if (color && bgColor) color = clc.xterm(color).bgXterm(bgColor)
    else if (Number.isInteger(color)) color = clc.xterm(color)
    else color = clc.xterm(202).bgXterm(236)

    return this.color(color)
  }

  getTime(msg) {
    if (this.get('time')) {
      const data = new Date()
      let hour = data.getHours()
      let min = data.getMinutes()
      let sec = data.getSeconds()
      let ms = data.getMilliseconds()
      hour = hour < 10 ? `0${hour}` : hour
      min = min < 10 ? `0${min}` : min
      sec = sec < 10 ? `0${sec}` : sec
      ms = ms < 10 ? `0${sec}` : ms
      return chalk.yellow(`${min}:${sec}:${ms}: `) + msg
    }
    return msg
  }

  getToSource(msg) {
    // typeof msg === 'object' &&
    if (this.get('tosource')) {
      const tosource = require('tosource')
      return tosource(msg)
    }
    return msg
  }

  getVerbose(msg) {
    if (typeof msg !== 'string' && this.get('verbose')) {
      const PrettyError = require('pretty-error')
      let error = false
      if (msg && msg.stack) {
        const pe = new PrettyError()
        error = console.log(pe.render(msg))
        delete msg.stack
        msg.message = msg.message.split('\n')
      }

      msg = inspector(msg)
    }
    return msg
  }

  // @TODO:
  story() {
    if (!this.mainStory) {
      const {mainStory} = require('storyboard')
      this.mainStory = mainStory
    }
    return this
  }
  child(title) {
    const story = this.mainStory.child({title})
    story.parent = this
    return story
  }
}

// instantiate
const log = new LogChain().new()
log.addPreset('error', presetError)
log.addPreset('warning', presetWarning)
log.addPreset('info', presetInfo)
log.addPreset('note', presetNote)
log.addPreset('important', presetImportant)


// statics
function underline(str) { return `\x1B[4m${str}\x1B[24m` }
function bold(str) { return `\x1B[1m${str}\x1B[22m` }
log.underline = underline
log.bold = bold

module.exports = log
