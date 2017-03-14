const cli = {
  flip: (config, dir) => require('./CliFlip')(config, dir),
  flipHandler: (flipHandler) => require('./CliFlipHandler')(flipHandler),
  commander: {
    extend: (args) => require('./Commander'),
    run: (args) => {
      const program = require('./Commander')
      program.parse(args || process.argv)
    },
  },
  interactive: (args) => require('./Interactive'),
}

module.exports = cli
