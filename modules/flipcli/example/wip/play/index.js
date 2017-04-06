const vorpal = require('vorpal')

const program = vorpal()

program
  .command('foo', 'Outputs "bar"')
  .action((args, callback) => {
    this.log('bar')
    callback()
  })

program
  .delimiter('app $')
  .show()
