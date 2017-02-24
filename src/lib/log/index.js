var tosource = require('tosource')

// @TODO: more args, but this kind of forces a nice terseness
function log(message, options) {
  const chalk = require('chalk')
  const util = require('util')

  if (typeof options === 'string') options = {level: options}
  var defaults = {
    level: 'debug',
    space: false,
    color: 'purple',
    verbose: false,
    source: false,
    text: false,
  }
  options = Object.assign(defaults, options)
  if (options.name) options.level = options.name

  try {
    if (!options.color || (!chalk[options.color] && !options.color.includes('.')))
      options.color = 'magenta'

    // var {level, color} = options
    var level = options.level
    var color = options.color
    var text = options.text
    if (color === 'purple') color = 'magenta'

    if (typeof message !== 'string' && options.verbose) {
      message = util.inspect(message, {
        showHidden: true,
        depth: null,
        showProxy: true,
        maxArrayLength: null,
        colors: true,
        // colors: {}
      })
    }
    if (typeof message === 'object' && options.source) message = tosource(message)

    var logger = chalk
    if (color.includes('.'))
      color.split('.').forEach(clr => logger = logger[clr])
    else
      logger = logger[color]

    if (text)
      console.log(`${logger(message)}`)
    else
      console.log(`${logger(level)}:`, message)
    if (Number.isInteger(options.space)) console.log('\n')
    if (options.space === true) console.log('\n\n\n')
  } catch (e) {
    console.log(`${color}${(level)}:`, message)
  }
}

function underline(str) {
  return '\x1B[4m' + str + '\x1B[24m'
}
function bold(str) {
  return '\x1B[1m' + str + '\x1B[22m'
}

log.underline = underline
log.bold = bold
log.verbose = function(msg, options) {
  var defaults = {
    verbose: true,
  }
  options = Object.assign(defaults, options)
  log(msg, options)
}
log.text = function(msg, options) {
  var defaults = {
    text: true,
  }
  options = Object.assign(defaults, options)
  log(msg, options)
}
log.text.color = function(msg, color, options) {
  var defaults = {
    text: true,
    color,
  }
  options = Object.assign(defaults, options)
  log(msg, options)
}

log.error = function(msg, options) {
  var defaults = {
    level: 'error',
    verbose: true,
    color: 'bgRed.black',
  }
  options = Object.assign(defaults, options)
  log(msg, options)
}

module.exports = log
