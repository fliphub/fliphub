prioritized:
- [ ] test with each example project
  - [x] fuse-canada
  - [ ] node
  - [ ] basic
  - [ ] basic build
  - [ ] verbose
  - [ ] intermediate
  - [ ] ~ intermediate-tests
  - [ ] should have switch between apps before build without filter?

- [ ] cli + scripts
  - [x] commander pt2
  - [ ] interactive pt2
  - [ ] package builder release scripts finished

- [ ] allow app configs without app keyword (just flat)
- [ ] test with webpack configs for compat
- [ ] decorate box with the ops for apps o.o?
- [ ] need to add provide plugin and map with fusebox
- [ ] need to finish other ops such as `exec` and `watch` (see fuse-canadas)
- [ ] fluent added back
- [x] putting node preset back in built in
- [ ] map to rules to use env?
  - [ ] especially need to use the babel-loader for inferno sake
- [ ] need to have it not set up the decorators entirely with the `.build`
  - [ ] which means exposing `.setup`, and calling it if it has not been called in `.build` etc


# next stage
- [ ] put all todos as github issues with a board
- [x] could use es6 configs
- [ ] should find out how best to do things like exteralizing pieces so they could be dynamically attached with their deps, such as webpack, fusebox, testing, helpers, babel adapter... -> monorepo :3 ?
- [ ] run configs with fusebox, webpack, etc right from cli which means transform the config file by building it which would be huge
- [ ] add `useDefaults` to not decorate...
- [ ] node preset should set babel env...

HUGE PROBLEM
- [x]~ concurrency
- how can HUBS decorate fusebox if they init each app first...

- [ ]  need to allow root in each project...
- [ ] ENSURE DEFINE PRODUCTION IS THE FIRST PLUGIN!!!


- [ ] loaders and loader adapters
- [ ] https://webpack.js.org/configuration/stats/ stats for debugging
- [ ] SHOULD GET ROOT FROM THE FILE THAT CALLED IT

https://www.npmjs.com/package/subarg

loaders -> rules
    - test -> test
    - loader -> `use`
    - exclude -> `exclude`
    - include -> include
    - query -> options
  - chaining cannot be converted?
    - both webpack and fusebox have chains...
    - could have fluent syntax for doing it too...

module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                sourceMap: true,
                localIdentName: '[path]--[name]-[local]--[hash:base64:5]',
              },
            }],
        }),
      },
    ]
  },






















- [x] set up extensible first
- [x] register handlers
- [x] builder should be extensible
  - [x] then decorate for flags

!!!!!!!!!!!!!!!
  - [ ] allow passing in npm commands to run on lifecycle events or presets such as testing

- [ ] if target is nodejs, and running watch, anD BUILT IN fuse server, then use require, add safety flag
- https://www.npmjs.com/package/prettier

- [ ] detection
  - [ ] regex the code, check for import
  - [ ] regex the code, check for importing nodes

- [ ] releasing the same app with different names when you have multi package names

https://david-dm.org/

https://www.ansible.com/tower

https://github.com/infernojs/inferno/commit/8abb17e42485943ce6bdae13675d3b7e878a07a1#diff-11c2a004fe946d591ec07aff464b7573L1
https://github.com/infernojs/inferno/commit/8abb17e42485943ce6bdae13675d3b7e878a07a1#diff-d8bc855bb529ca992b0f2b24ac4e647bR110

```
- [ ] need to fix
  - [ ] pm context per app
  - [ ] translator context per app

- [ ] need loader configs like babel to be setup elsewhere
  - [ ] setup in translation,
  - [ ] listen for loaders first,
  - [ ] then it goes to builder

- [ ] allow passing in instructions to build
- [ ] add a "slow" debug mode that sleeps on each lifecycle - easiest on each evt
```

- [ ] eventually could use some internal webpack + fusebox internals to do the adapting and get back standardized combinations
- [ ] can put things from core into the hubs?
  - [ ] especially since the hubs decorate bottom up which makes it easier (Composite)

- [ ] try browserify after, should be easy


init (all-apps/box-context) setup to decorate the core to expose methods
init (app-context) setup to setup per app
default decorating
translating
setting up package contexts
setting up paths and instructions
setting up bundler (fusebox, web pack)
operations for each app invoking the apps bundler context


- [ ] should use presets like as not extensions, but `decorate` folder which is called somewhere along the chain of translate? OR decorate is called, and decorate calls translate... or it is really a factory eh

- [ ] preset not found? log warning, show syntax how to create
- [ ] add fusebox testing
- [ ] add fusebox watch op
- [ ] add extendable devserver,
- [ ] add extendable ops to use your own callbacks for all

LATER --- EMPHASIS ON LATER
- defaults and presets per app, dealing with it per app and per all apps is more complexity
- add skeleton generator
- add `flipto` method for triggering presets such as inferno
- allow data to be passed on the flags to extend presets when using node api
- pretty print errors in verbose mode automatically

flipbox created
  flipbox apps created
    * flipbox app created


merge env and flags?
add easy devserver hooks

basic easy starter:
- just an app with aliasing
- ignore the rest
- log
- add incrementally
- autodecorate commander for presets!

instead of `.init`, have `.easy` and `.advanced` and `.init` to deal with defaults!
