// can do bundle hub here
// @TODO:
// - [ ] should move fusebox and webpack inside of here later
const AbstractHub = require('../AbstractHub')
const FuseBoxHub = require('./fusebox/FuseBoxHub')
const WebPackHub = require('./webpack/WebPackHub')
const RollupHub = require('./rollup/RollupHub')
const {BundleContext, BundlesContext} = require('./BundleContext')

class BundlerHub extends AbstractHub {
  boxInit() {
    this.box.arithmetics = FuseBoxHub.Arithmetics
  }

  appInit(args) {
    const {context} = args

    context.bundles = new BundlesContext(args)

    context.on('bundles.addPackage', (bundle) => context.bundles.full = bundle)
    context.on('bundles.add', (bundle) => {
      context.debugFor('addBundle', '📦  added bundle', 'cyan', bundle)
      const Bundle = new BundleContext(args)
      Bundle.handle(bundle)
      context.bundles.add(Bundle)
      return Bundle
    })

    // @TODO: other ones here
    context.once('builder.fusebox', (builderArgs) => {
      context.bundler = new FuseBoxHub(args)
    })
    context.once('builder.webpack', (builderArgs) => {
      context.bundler = new WebPackHub(args)
    })
    context.once('builder.rollup', (builderArgs) => {
      context.bundler = new RollupHub(args)
    })

    // context.evts.once('appBuilt', () => context.bundler.ops(args))

    // context.evts.once('builder.*', () => {
    //   bundler = new WebPackHub(args)
    //   console.exit(bundler)
    // })
    //
    context.once('appBuilt', (builtArgs) => {
      // console.debug('appBuilt')
      console.log('appBuilt', builtArgs.context.name)
      // console.verbose(builtArgs)

      // console.exit(context)
      // console.exit(bundler)
      context.bundler.ops(builtArgs)
    })

    // const {name} = app
    // const {on} = box.evts
    // on('ops.compile.' + name, (args) => context.compile(args))
    // on('ops.run.' + name, (args) => context.run(args))
    // on('ops.exec.' + name, (args) => context.exec(args))
    // on('ops.release.' + name, (args) => context.release(args))
    // on('ops.clean.' + name, (args) => context.clean(args))
    // on('ops.test.' + name, (args) => context.test(args))
    // on('ops.dry.' + name, (args) => context.dry(args))
    // on('ops.watch.' + name, (args) => context.watch(args))
  }

  decorate() {

  }
}

module.exports = BundlerHub
