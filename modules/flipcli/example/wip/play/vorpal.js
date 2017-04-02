// https://www.npmjs.com/package/inquirer
// https://github.com/dthree/vorpal
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Shells
// https://nodejs.org/api/repl.html
// https://www.npmjs.com/package/meow
// http://developer.telerik.com/featured/creating-node-js-command-line-utilities-improve-workflow/
//
// @TODO: build out release scripts
// https://github.com/lerna/lerna/blob/master/bin/lerna.js
const Vorpal = require('vorpal')
const log = require('fliplog')

const vorpal = new Vorpal()
log.quick(vorpal)

// @TODO: continue to get version name,
// increment version name semantically
// console.log(vorpal)
vorpal
  .command('release')
  .action(function(args, cb) {
    const self = this
    return this.prompt({
      type: 'confirm',
      name: 'continue',
      default: false,
      message: 'Are you sure you want to release APPNAME. Continue?',
    }, (result) => {
      if (!result.continue) {
        self.log('Good move.')
        process.exit(0)
        // cb()
      } else {
        self.log('Off we go!.')
      }
    })
  })

vorpal
  .command('skeleton')
  .alias('seed')
  .alias('scaffold')
  .action((args, cb) => {
    // path
    //  -> root (autosuggest)
    //  -> homedir
    //
    //  -> multiple files?
    //  -> entry file
    //
    //
    // builder
    //
    // bundle:
    // include
    // exclude
    //
    // babel setup
    // -> target (does webpack target and )
    //
    // re-alias name path
    // --presets
  })

vorpal
  .command('setup-aliases')
  .action((args, cb) => {
  })

vorpal
 .delimiter('🏗  fliphub ➜')
 .show()
 .parse(process.argv)
