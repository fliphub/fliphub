let vorpal = require('vorpal')()

vorpal
  .command('why [items...]', 'Shows args.')
  .description('tell me whyyyaiiii')
  .option('-v, --verbose', '#allthethings')
  .option('--save')
  .action((args, cb) => {
    console.log(args)
    // cb()
  })

vorpal
  .delimiter('🏗  💠  ➜')
  // .show()
  .parse(process.argv)
