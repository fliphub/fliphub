// @TODO:
// - [ ] add debugFor filters here
// - [ ] more formatting such as easy table
// - [ ] storyline
// - [ ] docs

// https://developer.mozilla.org/en-US/docs/Web/API/Console/table
// https://github.com/Automattic/cli-table
// const table = require('cli-table')
// const ansi = require('ansi')
// const cursor = ansi(process.stdout)
const chalk = require('chalk')
const clc = require('cli-color')
const {inspector} = require('inspector-gadget')
const ChainedMapExtendable = require('flipchain/ChainedMapExtendable.js')

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
const OFF = (~315 >>> 3) + '@@'

class LogChain extends ChainedMapExtendable {
  constructor(parent) {
    super(parent)
    this.extend([
      'text',
      'color',
      'data',
      '_xterm',
    ])
    this.extendTrue([
      'space',
      'tosource',
      'time',
      'table',
      'verbose',
      'exit',
      'silent',
    ])

    this.presets = {}
    this.echo = this.log
    this.reset()
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

  // just output
  just(data) {
    if (typeof data === 'string') this.text(data)
    else this.data(data)
    this.verbose(true)
    return this.log()
  }

  log(data) {
    if (!data) data = this.get('data')

    if (this.get('silent')) return

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

  exit() {
    for (let arg of arguments) this.verbose().data(arg).echo()
    console.warn('log.exit')
    setTimeout(() => process.exit(1), 1)
    throw new Error('log.exit.trace')
  }

  reset() {
    // persist the time logging
    if (this.get('time')) this.time(true)

    this.color('magenta')
    this.text('debug')
    this.data(null)
    this.table(false)
    this.tosource(false)
    this.verbose(false)
    this.space(false)
    this.exit(false)
    return this
  }
  clear() {
    process.stdout.write(clc.reset)
    return this
  }
  logText() {
    let text = this.get('text')
    if (this.get('text')) text = this.get('text')
    text = this.getColored(text)
    text = this.getTime(text)

    if (!text) return OFF
    return text
  }
  logData() {
    let data = this.get('data')
    if (!data) return OFF

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
    if (this.get('text')) return `${logWrapFn(msg)}`
    return `${logWrapFn(this.get('text'))}:`
  }
  getLogWrapFn() {
    let logWrapFn = chalk
    let color = this.get('color')

    // maybe we colored with something not in chalk, like xterm
    if (typeof color === 'function') logWrapFn = color
    else if (color === false) logWrapFn = msg => msg
    else if (color.includes('.'))
      color.split('.').forEach(clr => logWrapFn = logWrapFn[clr])
    else if (combinations.includes(color))
      logWrapFn = logWrapFn[color]
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
    }
    else if (color && bgColor)
      color = clc.xterm(color).bgXterm(bgColor)
    else if (Number.isInteger(color))
      color = clc.xterm(color)
    else
      color = clc.xterm(202).bgXterm(236)

    return this.color(color)
  }

  getTime(msg) {
    if (this.get('time')) {
      let data = new Date()
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
    if (typeof msg != 'string' && this.get('verbose')) {
      const PrettyError = require('pretty-error')
      let err = false
      if (msg && msg.stack) {
        const pe = new PrettyError()
        err = console.log(pe.render(msg))
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
const log = new LogChain()

// presets
function presetError(chain) {
  return chain.text('error').color('bgRed.black').verbose()
}
function presetWarning(chain) {
  return chain.text('⚠ warning').color('bgYellow.black').verbose()
}
log.addPreset('error', presetError)
log.addPreset('warning', presetWarning)

// statics
function underline(str) {return '\x1B[4m' + str + '\x1B[24m'}
function bold(str) {return '\x1B[1m' + str + '\x1B[22m'}
log.underline = underline
log.bold = bold

module.exports = log
