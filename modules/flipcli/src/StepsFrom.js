const {ChainedMap, log} = require('./deps')
const CLI = require('./Core')

class Command extends ChainedMap {}

// interactive hydratable persistable config presets for existing clis
module.exports = class StepsFrom extends ChainedMap {
  static init() {
    return new StepsFrom()
  }

  toProgram() {
    // .program()
    // .command('flip-presets')
    // .actionPrompt('flip-presets')
  }

  // https://github.com/SBoudrias/Inquirer.js#reactive-interface
  handle(program) {
    // const program = this.parent.program
    const cli = new CLI()
    let steps = cli

    const cmds = program
      .commands
      .filter((cmd, i) => {
        if (['help', 'exit'].includes(cmd._name)) return false
        return cmd
      })


    // @TODO: only list if more than 1, and probably checkbox...
    if (cmds.length > 1) {
      steps = steps.step('cmdname', 'list')
      cmds.map(cmd =>
        steps = steps.choice(cmd._name, cmd._description))
    }

    cmds.forEach((CMD, i) => {
      let cmd = {
        cmdname: CMD._name,
        msg: CMD._description,
        args: CMD._args || [],
        options: CMD.options || [],
        checkboxs: CMD.options.filter(opt => opt.bool === true),
        inputs: CMD.options.filter(opt => opt.bool !== true),
      }


      const {cmdname, msg} = cmd

      // steps = steps.separator('=== args ===')

      log
        .data(steps)
        .bold(i + ' ' + cmdname + ' ' + msg)
        .echo(false)

      // [packages]
      cmd.args.forEach(arg => {
        const {variadic, name, required} = arg
        let input = steps.step(name, 'input')
        // if (required) steps.validate((inputs, two) => )
        steps = input.toSteps()
      })

      // log.quick(steps)
      if (cmd.checkboxs.length) {
        steps = steps.step(cmdname + '-args', 'checkbox', msg)
        cmd.checkboxs.forEach(cbx => {
          const {
            required,
            optional,
            bool,
            autocomplete,
            description,
            long,
            short,
          } = cbx

          const chkbx = cbx.long.replace('--', '')
          steps = steps
            .checkbox(chkbx)
            .default(false)
            .message(cbx.description)
          if (required && !optional) steps.disabled(true).default(true)

          // scopes it to just this command
          // but then presets are useless to just do 1 command...
          // steps.when(answers => answers.cmdname === `cmdname.${cmdname}`)
        })

        // steps = steps.end()
      }
    })

    // log.quick(steps.toSteps().toConfig())
    this.cli = steps.toSteps()
    cli.run()

    return this
  }
}
