const pkg = require('./package.json')
const {
  CLI,
  log,
  flipscript,
  flipcache,
  StepsFrom,
} = require('../fliphub/packages/fliphub-cli-inferno')

const {ScriptFlip} = flipscript
const cli = new CLI()
const program = cli.program()
const scripts = new ScriptFlip().debug(true)

// extract commands and interactive from this
program
  .command('lint [packages]')
  .option('-j, --js', 'lint js')
  .option('-t, --ts', 'lint ts')
  .option('-p, --production', 'use production env (should not need to be here)')
  .option('-d, --development', 'use development env (should not need to be here)')
  .action(({packages, options}) => {
  })

StepsFrom.init().handle(program)
// log.quick();
