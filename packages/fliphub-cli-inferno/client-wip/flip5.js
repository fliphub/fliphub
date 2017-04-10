const pkg = require('./package.json')
const {
  CLI,
  log,
  flipscript,
  flipcache,
} = require('../src')

const {ScriptFlip} = flipscript
const cli = new CLI()
const program = cli.program()
const scripts = new ScriptFlip().debug(true)

program
  .command('lint [packages]')
  .option('-j, --js', 'lint js')
  .option('-t, --ts', 'lint ts')
  .option('-p, --production', 'use production env (should not need to be here)')
  .option('-d, --development', 'use development env (should not need to be here)')
  .action(({packages, options}) => {
  })

log.quick(program.commands)
