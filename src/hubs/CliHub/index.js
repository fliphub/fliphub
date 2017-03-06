const cli = {
  flip: (args) => require('./CliFlip'),
  flipHandler: (flipHandler) => require('./CliFlipHandler')(flipHandler),
  commander: {
    extend: (args) => require('./Commander'),
    run: (args) => {
      const program = require('./Commander')
      program.parse(process.argv)
    },
  },
  interactive: (args) => require('./Interactive'),
}

module.exports = cli
