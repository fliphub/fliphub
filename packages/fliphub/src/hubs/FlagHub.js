const {Hub} = require('fliphub-core')
const flipflag = require('flipflag')
const log = require('fliplog')

module.exports = class FlagHub  extends Hub {

  /**
   * @event core.init
   * @param {Workflow} workflow
   */
  coreInit(workflow) {
    const names = [
      'opts',
      'cache',

      // @TODO: for safety, `-o,--operations,--ops`
      // 'o,operations,ops',
      'o,operations,ops',
      'dry', 'compile', 'exec', 'run', 'test',

      'to', 'from',
      'NODE_ENV', 'env',
    ]

    const flags = [{
      names,
      cb: ({
        opts,
        cache,

        ops,
        dry, compile, exec, run, test,

        to, from,
        NODE_ENV, env,
      }) => {
        log.data({
          opts,
          cache,

          ops,
          dry,
          compile,
          exec,
          run,
          test,

          to,
          from,
          NODE_ENV,
          env,
        })
        .emoji('flag')
        .tags('flags,flag')
        .text('flags:')
        .color('blue')
        .verbose()
        .echo()

        const flips = {}
        if (to) flips.to = to
        if (from) flips.from = from
        if (to || from) workflow.core.config.merge({flips})

        if (dry === true) {
          workflow.core.ops
            .cache(false)
            .exec(false)
            .run(false)
            .test(false)
            .compile(false)
            .dry(true)
        }

        // @TODO: this does not work this way with rollup...
        // if (cache != undefined) app.config.merge({cache})
      },
    }]

    flipflag.findAll(flags)
  }
}
