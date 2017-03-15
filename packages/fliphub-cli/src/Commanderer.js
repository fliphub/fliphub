const {execSyncStd} = require('./scripty')
const Chainable = require('./chain/Chainable')

class Commanderer extends Chainable {
  allHelp() {
    const {program, flipper} = this.parent

    // https:// github.com/tj/commander.js/#custom-help
    program.on('--help', () => program.commands.forEach(cmd => {
      execSyncStd(`node ${flipper} ${cmd._name} --help`)
    }))
  }

  has(name) {
    return Object.keys(this.parent.program._events).includes(name)
  }

  hasOption(name, option) {
    const options = this.optionsFor(name)
    return options
      .map(opts => Array.isArray(opts) ? opts[0] : opts)
      .map(opt => opt.flags)
      .filter(flag => flag && flag.includes(option))
      .length
  }

  optionsFor(name) {
    const program = this.parent.program
    let options = []
    program.commands.filter(cmd => {
      if (cmd._name == name || !name) {
        options.push(cmd.options)
      }
    })

    return options
  }
}

module.exports = Commanderer
