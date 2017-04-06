const {execSyncStd} = require('flipscript')
const Chainable = require('flipchain/Chainable')

// @TODO: should not need subprocesses for running helps
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
    return this
      .optionsFor(name)
      .map(opts => Array.isArray(opts) ? opts[0] : opts)
      .map(opt => opt.flags)
      .filter(flag => flag && flag.includes(option))
      .length
  }

  optionsFor(name) {
    return this
      .parent
      .program
      .commands
      .map(cmd => {
        if (cmd._name === name || !name) return cmd.options
        return null
      })
      .filter(cmd => cmd)
  }
}

module.exports = Commanderer
