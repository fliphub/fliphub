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
const vorpal = new Vorpal()

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
    }, function(result) {
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
  .action(function(args, cb) {
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
   .show()
   .parse(process.argv)
