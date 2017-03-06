prioritized:

- [ ] allow app configs without app keyword (just flat)
- [ ] decorate box with the ops for apps o.o?

- [ ] fluent added back
- [ ] map to rules to use env?
  - [ ] especially need to use the babel-loader for inferno sake
- [ ] need to have it not set up the decorators entirely with the `.build`
  - [ ] which means exposing `.setup`, and calling it if it has not been called in `.build` etc

# magic / features
## detection
- [ ] regex the code, check for import
- [ ] regex the code, check for importing nodes
- [ ] if target is nodejs, and running watch, anD BUILT IN fuse server, then use require, add safety flag
## root
- [ ] need to allow root in each project...
- [ ] SHOULD GET ROOT FROM THE FILE THAT CALLED IT

# fixing
- [ ] allow passing in instructions/arithmetics to build
- [ ] ENSURE DEFINE PRODUCTION IS THE FIRST PLUGIN!!!
- [ ] node preset should set babel env...

# hubs
- [ ] caching hub, auto build configs for manifest and such based on rest of config
- [ ] combining multiple files (like gulp merge maybe?)
- [ ] test hub

# ops
## run
- [ ] add extendable devserver,
- [ ] add easy devserver hooks
- [ ] add extendable ops to use your own callbacks for all
## fusebox
- [ ] add fusebox testing
- [ ] add fusebox watch op

# scripting
## releasing
- [ ] allow passing in npm commands to run on lifecycle events or presets such as testing
- [ ] releasing the same app with different names when you have multi package names

# debugging
- [ ] preset not found? log warning, show syntax how to create
- [ ] add a "slow" debug mode that sleeps on each lifecycle - easiest on each evt

# improving
- [ ] use some internal webpack + fusebox internals to do the adapting and get back standardized combinations

# easy
- [ ] instead of `.init`, have `.easy` and `.advanced` and `.init` to deal with defaults!
- [ ] use webpack-chain and discuss with Eli
