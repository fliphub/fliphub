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
}

module.exports = Commanderer
