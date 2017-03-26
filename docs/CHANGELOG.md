# 🔈 changelog 🔈

# part 54 - mar 26 17
- going to add tests for bundling, make sure it all works, then good to go :-)

---

# part 53 - mar 26 17
- add .properties/hasProps to fosho
- add exports property test to ensure fliphub exports everything it should
- add to-arr dep to fosho
- add flipfile to fosho for the izzes there
- fix delete on obj.pluginIndex if merging undefined
- start validator hub
- a little docs on flipfile
- make spinner stop when building resolves
- add opt to to-arr to allow returning keys
- make fliphub-resolve auto resolve objects and arrays in the fn
- add fosho.aintHasString
- added scoping to resolver for multi resolve
- add isAbs to flipfile...
- fix resolving when trying to go closer if it fails when it is as a monorepo package
- add shush to fliplog
- more eslint
- pushing to github

# part 52 - mar 25 17
- https://github.com/fuse-box/fuse-box/pull/434 to move fuse-box OptimizeJsPlugin out of FlipHub
- add html and json as defaults for fuse-box
- add keywords and better description to fliplog
- filter out some deps on depflip
- ⛓ add chainedchain to flipchain for later, abstract of what is used in workflow
- 🚮 clean out presets/todo/Config used in ^
- more emoji to emoji-commits
- more test todos
- preset html part 2 - fair bit to go
- pt 2 on PresetTarget
- pt 2 on PresetLibrary
- add schema md to docs
- move resource docs into docs/resources
- made fosho module
  - extend chai
    - extend assert
      - bind first arg to have nice shorthands
    - extend should
    - extend izz
      - make non-fns -> fns
      - bind first arg to have nice shorthands
- add izz.all
  - apply first arg as .call if it is array, if fn supports!
- ava test hub
- add fusebox should to fosho
- improve fosho, do cloning, add aint, more tests
- add getOwn to fliphub helpers
- cleaning fosho
- add log mode to fosho
- more tests, working nicely
- export log and fosho and assert and should in fosho
- add passing in ava.t to fosho for assertion planning
- add test using it
- exposing on on core from workflow
- basic docs to fosho
- basic docs to izz
- testing events on fliphub
- adding lodash.isplainobject to izz
- better api for registering presets
- making events default to * if there is no current context
- fix useAll and addAll typo
- was returning too early when merging children presets!!!
- test working for event and adding presets and passing down args
- starting to configure logger for only on workflow
- simplify ops by removing built fn as now workflow has all contexts
- moving hubs to be registered internally now that there are tests to register client-side
- add some docs
- export fliphub-core with fliphub
- add test fixtures
- add deep-replace/del
- use deep-replace/del in added workflow reset
- add reset test
- add fosho eq equals preMuch deepEquals
- add back temp moved tests
- adding lifecycle method tests for hub
- add .each to fosho
- test for core lifecycle methods calling previous

# part 51 - mar 24 17
- start arithmetic filtering for fliplog for better debugging
- get event emitting lifecycle up for hubs
- add is.ci
- setup is running, preset hubs connect properly, such a major clean
- updating eslint rules - no-undef
- fix silly typos
- change flipchain from calling init on construct
- fix another typo with the config and contexts
- make hub extend chainable
- adding depth to fliplog for less verbose debugging
- adding .lines in fliplog to find where you logged
- add validation to chainable when merging another chain without calling toConfig
- running fliphub works without using .toConfig
- move config to rollup config so the parent BundlerConfig is no longer used for anything more than its original values...
- trying sparky
- adding simple babel compile - wondering why everyone doesn't build with babel and then bundle with webpack...
- commenting out invalid syntax in preset todos
- pt2 optimizejs preset
- updating todos
- make optimizejs plugin for fusebox
- add a bunch of emoji to fliplog
- adding spinner to fliplog
- start tests
- add validation error throwing for izz
- start flipglobs - fluent-globs
- add capturing to fliplog
- fliplog progress bar
- adding more to spiner in fliplog
- start from for fromObj in fliplog
- adding from to flipchain
- conver spinner to ts for fusebox

# part 50 - mar 23 17
- make insert-at-index module
- start fliphub-core for the api for hubs
- make remap-by module
- make fliphub-core into a module
- start making filterhub compatible
- getFlips into context
- big refactor of simplicity...
- adding name from constructor name to hubs
- it is running
- using lodash.own

---

# part 49 - mar 23 17
- adding neutrino-preset-copy
- adding neutrino-preset-clean
- adding PresetEslint to built ins out of `next`
- adding eslint example
- start emoji-by-name module
- add .catch to fliplog
- making fliplog a callable function with fn prototype
- adding PresetResolveAll
- fixing deep-replace which used console.verbose
- missing return typo in resolver -.-
- configuring preseteslint example with fliphub, working
- fixing flags with flipto needs to merge not replace
- update more eslint rules
- add eol resource links in docs
- starting to fix filtering for logs - issue was not resetting if silent
- added silent option to silent all
- add basic assert tests for filtering
- reduce complexity in presetter
- move `ops` out of box
- start workflow
- going to refactor, committing

# part 48 - mar 22 17
- starting /examples folder
- used faker to generate out the data set
- add fusebox chain to next - extracted from fliphub-chain early iteration
- move fliphub-chain and fliphub-bundles to `modules/next`
- setup lerna for the examples
- fix missing alias dep
- start preset-eslint
- move `deps` from next into `depflip` module
- add babel-loader-builder to modules-sub
- update env in babel-loader-builder
- add z.js to build fliphub with a clean minimal config
- update todos
- fix exit on node preset
- add missing deps when bundling (webpack analyze and rollup file size)
- start PresetInferno
- fixing `fliplog` bug where it checks if it has data, but undefined means it falsely thinks it does not
- fix typo in presetter for passing in args
- alias require preset example working
- issues with the monorepo requiring, researching, adding to docs
- made an awesome solution, monono, to use monorepos without require issues, and without monorepo issues
- make example for monono
- rename it mahna
- update the resolving for require.main
- fix typo on aliases -> alias
- add modulesDirectories to examples and modulesDirectories to env from mahna
- fix horrible typo on alias requiring -.-
- added boxInit to presets, used with flags, fixed flipto from flags
- minor logging tidy
- adding support to aliasResolve for fusebox
- add read.json to flipfile
- updating todos
- play with alpha publishing...
- update eslint rules
- some cleanup
- expanding eas-npm-files
- part 2 PresetEslint with toRollup, toWebpack, toFuseBox
- simple bash file to publish
- adding inserting file ls to pkg files in PkgExposer
- resolving dependency installation issues across all modules
- adding neutrino-middleware-progress
- publishing in beta

# part 47 - mar 22 17
- clean artifact of eslint
- clean artifact in presetflags
- adding flips using flags
- find `clean-obj` lib, use it to simplify
- part 3 on PresetAliasResolve
- part 3 on PresetAliasRequire
- move alias out of helpers into fliphub-alias module
- update todos
- update fliplog's readme

# part 46 - mar 21 17
- renaming modules2 into modules-sub, reordering some into `_next`
- adding aretecode-eslint-config to modules-sub
- updating aretecode-eslint-config deps
- fixing name in inspector-gadget
- better merging with shorthands in flipchain
- adding CONTRIBUTING in docs for later
- adding http://makeapullrequest.com badge
- add emoji-commits as submodule
- add how to use as a url in emoji-commits
- abstract out `mergeFor` from flipConfig into `Presets`
- reducing dependencies
- sleepfor module
- clean up fliphub helpers duplication with modules
- add hasUsed to presets as happypack was not registering
- use node_env in defaultsenv
- fix happypack-preset naming
- play with threads, pools, child processes, vm, tosourcing
- make super simple tiny-promise-map for sync promise execing - almost 2x as fast
- added buildSync and buildFast
- use output path for webpack and rollup in y config
- push to github

# part 45 - mar 20 17
- update pkg jsons to remove strict engine and do >=
- add arrOf to izz
- setup slack team
- add slackin
- add badge
- updating travis integration for org
- pt 3 of PresetFlags
  - supporting arrOf strings,
  - decorating obj,
  - added aliasing
- updated todos
- resources to cache preset for later

# part 44 - mar 20 17
- add `boxen` todo for fliplog
- fix array order in config for plugins - needs to keep a `holey` array until the end to retain position unless an object is used
- adding https://github.com/nolanlawson/optimize-js
- start adding support for preset args
- start on monorepo `yuge` example to do a real test
- add `to-arr` module
- start enableTags, disableTags, tags for logs
- swap cli-table for cli-table2 in fliplog
- add deep-diff dep for fliplog
- fix having Object.assign backwards in arr-to-obj defaults...
- added schema validation
- fixing preset initting
- supporting preset args pt 2
- add splitting to to-arr
- add nodesecurity
- more finicking with tags for logs, disabled for now, updated todos
- added PresetMinify for babeli
- move the preset registering out of the defaults env since I know the functionality works and there are getting to be a lot of presets, just keep the defaults as `using` the presets for now, and keeping just registering `minify` & `uglify` in defaults to make sure it stays working
- clean neutrino-preset-happypack a little
- test fusebox, webpack, and rollup with babili on the yuge project
- add PresetBabel
- start on PresetTypeScript part 2... not so nice with rollup
- run two apps at the same time
- gitignore yuge until I move it to an examples only pr
- push to github
- prettier to eslint

# part 43 - mar 19 17
- update webpack-chain so it will allow merging plugins
- submit pr
- izz-class just for the webpack-chain pr
- updating todos
- [x] built in presets get registered by config defaulter
- atom theme https://github.com/aretecode/one-dark-syntax-colors-of-the-year-pantone
- setup nuclide for atom for types in refactor 3

# part 42 - mar 19 17
- update github issues
- rename array-to-object folder -> arr-to-obj
- remove build folder
- fix something with fliphub helpers not showing in git
- add build folder to gitignore

# part 41 - mar 19 17
- better mergeable config
  - reusable for fusebox and rollup
  - change bundlerconfig -> bundler config extractor
- do quick comparison between the 3 bundlers for speed
- module arr-to-obj
- added izz.class
- push to github
- keep playground out of commit but include fliphub2 this time
- experiment with oao
- rename examples -> fliphub-examples

# part 40 - mar 18 17
- adding fusebox
- updating the `to` method as fusebox is `toFuse*B*ox`
- sourceMaps working for all 3!
- do happypack preset for neutrino part 2/3
- module flip-neutrino-preset-happypack
- fixed up happypack preset again

# part 39 - mar 18 17
- update eslint-plugin-no-for-each badges
- use neutrino for config if webpack
- fork neutrino to do `entry` point fixes
- writing preset todos for neutrino
- starting PresetLibrary
- starting PresetTarget
- starting PresetVisualize
- cleaning & reordering presets, moving neutrino from config to Bundlers, starting Bundlers to go alongside the configs (as APIS)
- starting defaults rollup
- started defaults typescript
- added izz.notReal
- experiment with require nodejs hijacker to see about installing missing deps
- add PresetProgress
- add Presetter
- start DefaultFuseBox
- get rollup working
- updating ts interfaces - big update

# part 38 - mar 17 17
- exposing filter method on flipbox to allow client filtering, adjusting setup filter
- using the confighub in core
- static init back to fliphub
- add preset chain
- expose preset fn on fliphub
- add presets
- tidy presets
- use a preset
- fix arrToObj presets
- use arrToObj to simplify preset assignment
- add config defaulter
- filter props for just appconfig and flipconfig
- add inherit props
- improving default chainable merge
- making app config inherit from flipconfig and merge in
- adding toConfigs for presets to staet using them
- adding `add`, `addAll`, `use`, `useAll` to presets and AppConfig for presets to use
- change `arrToObj` to use `undefined` with valAsKey to allow defaults being used
- experiment with babel-register to see speed diff
- flipflag module, add node to packagejson engine
- adding es5exports module

# part 37 - mar 16 17
- updated fliplog with debugFor which returns a new instance
- izz module
- adding more resolve options for use in flipconfig

# part 36 - mar 16 17
- fliptime module
- updating inspector
- updating log
- mono-root module
- resolve module
- deep-replace module
- fliplog module updated
- flipfile module
- some thoughts on ts
- updating inferno pr

# part 35 - mar 16 17
- fix some readme links
- minor tweaks to log and chain and inspector
- make a package exposer to allow better modular exports!
- adding easy-npm-files as a module
- interfacing the hub
- starting to run the config to test it and see where it breaks

# part 34 - mar 16 17
- adding license badge
- add code style badge
- start prototyping a more minimal powerful interface
- extracting built in core code into presets
- xterm to log
- api chain example
- preset default env
- preset replace
- preset uglify
- preset define env
- preset sourceMap
- is.windows
- cleaning core and hubs
- start neutrino-happypack-plugin
- gitignore playground which has next refactor wip
- add modules folder for handling a bunch of flat submodules without cluttering packages
- a bit of cleanup on logs
- publish flipchain
- publish fliplog
- publish inspector-gadget
- start cleaning up some globals
- add refactor notice
- push to github

# part 33 - mar 15 17
- plan stripping it down
- start stripping it down
## helpers:
- add `rooter`
- expand file
- fix up inspect helper with safety
- add javascript stringify to inspector
- add deps extractor
- add str helpers (strHasAny, prefix)
- add context
- improve `debugFor`

# part 32 - mar 14 17
- major fliphub-helpers revamp
- add `jsonParse` just easy accessor
- add `lap` to timer
- add `minimalist` to flags

# part 31 - mar 13 17
- use chain for logging! lovely
- putting a new fusebox folder to start splitting and simplifying and using presets

# part 30 - mar 13 17
- play around with webpack chain as ts
- pushing to github
# part 29 - mar 10 17
- extract out core of cli functionality to make inferno-cli
- create fusebox cli
- adding directories to link to packages
- move things to playground
# part 28 - mar 9 17
- convert to monorepo to start splitting up functionality
- more playing with webpack chain

# part 28 - mar 8 17
- reduce logging on deps installation
- use deps in deps installation script from pkg json not hardcoded
- reduce unused deps
- add flipbox and client pkg jsons, and require.main to paths config
- version bump

# part 27 - mar 7 17
- update es6 config with ability to use ts, output to tmp file in .flipbox, resolve some paths and update the todos related
- cleanup/remove the gulpfile rollup contents
- update fusebox

# part 26 - mar 7 17
- adding initial rollup setup from inferno
- playing with webpack chain
- working on headless api on fusebox
- make exec op work
- using publishing to publish multiple names with flipbox in the cli

# part 24 - mar 6 17
- remove lerna built in experiment

# part 23 - mar 5-6 17
- move all examples into an example repo
- pushed, did pr, connected with issues
- updating more issues from prioritized todos and docs/todos
- exposing cli hub on exports
- adjust depth on inspector
- adding fusebox help commands https://github.com/flip-box/flipbox/issues/30
- move fluent arithmetic bundle to fusebox and out of flipbox
- adding bin to bin/flip and to pkg json bin https://github.com/flip-box/flipbox/issues/31
- refactor scripter -> ScriptCreator
- adding alias hijacker for flipImport
- fixing alias fromObj typo
- testing flipbox as a module with clients above

# part 22 - mar 5 17
- using latest `sourcemaps` option for fusebox https://github.com/flip-box/flipbox/issues/20
- updating fsbx
- cleaning most prioritized todos into github milestones
- cleaning readmes
- make compat example work part 1
- make compat example work with fusebox pt 1 https://github.com/flip-box/flipbox/issues/1
- make array of entries on an object of entries work pt 1 https://github.com/flip-box/flipbox/issues/21
- fix package.json
- cli build config handler https://github.com/flip-box/flipbox/issues/19
- safety to handling paths pt 1 on pathmaster https://github.com/flip-box/flipbox/issues/18

# part 21 - mar 5 17
- pushed to refactor branch
- adding find and scripts to scripthub/pkg
- updating ExecOp
- improving commander
- tidy the script lib a little
- moving sleepFor helper into lib
- added building of config file so configs can be in es6 when running from cli ^w^
- update todos

------------

# part 20 - mar 5 17
- move some playground to playground
- fix typo on clibundle -> clihub
- move examples back into the repo but into packages

# part 19 - mar 4 17
- add initClassOrObj
- start working on adapters for loaders and plugins to do the close to finishing touches
- add webpack config model schema pt 1
- verbose webpack reporting
- basic LoaderSettings to convert adapters with in bundler model
- safety for no apps
- testing multi in multi out
- implementing dry run
- adding deepReplace lib util
- add deepReplaceTest ^
- added realm utils to helpers
- added contextRequire util
- adding deepReplace to resolve paths in PathMaster
- resolved multi-inout (webpack will work, is not converted for fuse fully though it should give a different bundle)
- add empty test and minimal test to see how bundlers apis do
- add includeEmpty to toArr
- get Plugins setup similar to Loaders
- add adapters for plugins for webpack
- test passing in custom webpack plugins + built in ones
- abstract out plugin subscriber into plugin hub
- add first adapter plugins for fusebox with env plugin using plugin subscriber
- merge params passed for fusebox
- prioritizing before releasing soonish
- fixing if no loaders are added yet other params are
- move examples out into their own repo
- example fuse-canada working
- adding babel-env preset
- putting node preset back in built in
- fix typo on babel adapter for includes
- move original to packages/original
- move testing deps to packages/testing

# part 18 - mar 3 17
- try catch some ops
- start on loaders and plugins
- move all webpack and fuse into the bundler hub
- get at least babel plugin added
- add parallel-webpack
- fix html model pt 1

# part 17 - mar 2 17
- add lerna, vorpal, semver for releasing scripts
- make translator events bubble up from context -> box so it is easy to register more translators
- update todos
- require abstract hub
- verbose log errors for full understanding of schema to clients
- adding computed props
- experiment with observable
- fix args boolean typo for returning true when it was false :facepalm:
- start builderhub
- split up Aliases and SourceMaps from builder context
- regex replace util inspections for empty fn!
- fix key emitting
- set up html model
- add fuse-test-runner
- add filter auto hooked up to flags
- add filter to box
- sending all op keys out
- ops.compile working for webpack + fusebox, and ops.run (with built in dev server) for fusebox
- adding .server property to context from ops, add port and middleware to it
- flush out a sourcemaps compat obj in GeneralTranslator
- fix typo on envhub
- add pretty-error
- move pathmaster and BundleContext to bundlehub

# part 16 - mar 1 17
- finally found a reasonable pattern for managing the lifecycle flow, refactor to hubs
- start sourcemaps: builder, translator, bundler.config
- start Classes for Ops
- use childToParentMethods on bundle context with child pm for easier access
- add childToParentMethods helper
- add toArr helper
- make fusebox operation for compile bundle part 1
- start webpack usage
- redo happypack -> class
- flush out ts loader a little, add todos to webpack loaders
- typescript experiment #2, not super great
- remove workflow context to simplify

# part 15 - feb 28 17
- added debug all option
- making the filterer
- removed evt from lib
- a lot on refactoring
- using eventemitter2
- inspectorGadget eventemitter2
- add whitelist to inspectorgadget
- start on extendable
- start on extensions
- start implementing extendable with flags and presets
- adding middleware and a more customizable devserver
- adding dry op
- added xterm colors for logging
- add logger to console, with prefix underscore to avoid main compatibility issues ```js
console.
_log, _color, _text, _error, _warn, _verbose
```


# part 15 - feb 27 17
- pushed to refactor
- started timer helper
- furthering refactor with:
  - core: AppContext, BundleContext, Events, PathMaster
  - translators: flatten, bundles
  - loaders: Babel, BabelAlias
  - agnostic: sourcemaps
  - example/experiment/z
  - added FlipValidationError
  - made helpers fs and path functions to return for debugging easier
  - added inspectorGadget

# part 14 - feb 26 17
- move deps to lib
- start on events
- start on refactor

# part 13 - feb 26 17
- rename commander -> flip
- make it work a lot better
- changing defaults for ts
- added caching prop passed down
- caching prop used in fusebox
- caching prop turns off happypack
- installing only missing deps
- added canary version
- fusebox plugin to output js to ts
- [x] make ts a flag
- add cache flag defaults
- add compile debug
- add alias plugin for fusebox
- add better bool checks in flags
- add default bool and num checks for flags

# part 12 - feb 25 17
- 🖇🔣 start arithmetics
- 📚⚒ fixing example for compat, add it to root package as script
- ⚙ make name optional
- 🚑🐛 debug the webpack not compiling bug - was not excluding webpack and fusebox
- 📦⬆💣🛅 update fusebox
- 📜 script to run fusebox, or webpack and it will swap just on cli!
- ⌨️⚒ fix typo on example in flags for fusebox
- 🔈 logging in tests
- 🔈⚠☺️️🛅 log warning fn and use with happypack
- 🏷 version bump

- 📜 script to run fusebox, or webpack and it will swap just on cli!
- ⚙ make `apps` as an array optional and just pass in `app`
- ⚙ make `app` optional and just pass in `entry`
- 📦⬆💣🛅 update fusebox ^1.3.122-preview.8
- 🗝️ update keywords
- 📦⬆ add missing deps!
- 📦⬆ added realm utils
- 📦⬆💣🛅 update fusebox
- 📜📦 script to install deps on postinstall npm hook
- 🖇 add strIncludesAnyOf helper
- 🔈⚙ debug.fuseAlias
- ⚒🖇🔣 fix some in arithmetics, add to exports on fusebox, use in example for building itself
- 📦 added `asNeeded` requirer to cache deps and install if they are not installed... experiment
- @TODO: validator could figure out which deps were needed for that run...
- ⚙🕸🛅 config `webpack` to start making 💣🛅 fusebox a first class citizen


# part 11 - feb 24 17
- 📚 _lots_ more on docs
- add compileEnd hook
- improve canada example
- make fullauto return mediator
- release
- 👾 add minimal example
- 📚 format docs, all you need, reordering docs
- 📚📅👑⚔️
- ⚙ optionally pass presets and middleware to constructor
- 🏷 version bump and name example
- 📚🚧 (need docs) loaderOptions, define, uglify, analyze, clean, provide
- 📚⚒🔗 fix some links
- ⚒ app builder fixes

# part 10 - feb 23 17
- doing lots on readme
- 🗣 add gitter
- add badges
- 🚮 cleaning
- ℹ️️ added note to json loader to just use for fuse
- 🔈 add node utils to logger

# part 9 - feb 22 17
- ⚙🔈 added debug config for fusebox
- put in its own repo
- 📦⬆ added missing deps
- adding building flipbox with flipbox
- updating fusebox to latest preview
- add fuseboxPlugins option
- use lodash merge for merging defaults
- named it - flipbox
- 🏗🏗 built itself with itself, with fuse and webpack
- published empty package on npm & created github repo
- add gitignore, eslint, ~commander basic at root
- 🔈⚙ add debug option for exec, flags, testOutput
- ⚒ fix case where builder builds itself and the test runner that strips out strict mode strips out the built test runners strict mode check hahaha
- ⚒🔬🏃 tests for building itself pass, but issue with running those tests in the test runner

# part 8 - feb 21st
- 🔈 add changelog
- 📝📅📚 update todos and planning into docs folder
- 🗼🔧🏹 aliasing with babel module resolver
- 🔢🗝️ key ordering for new keys that were added
- 🖥📦⬆📦⬇ change shelljs to makedirp
- ⛑🛡📦⬆ add makedirp for safety when making dist outputs
- 📜🖥 pkg json script for help
- 💣🛅📖📚 add another fusebox example for canada that imports the built bundle and logs, is used as default currently
- ⚙ added polyfill as an option to exec and also fb fn for exec if needed

# part 7
- 🔬 start karma test runner
- 🔬 swapping testing libs
- 🔬⚙ karma and mocha presets
- 📒🚚 put fusebox middleware in transformers
- 📒🚚🔬 move mocha and karma into testing folder for abstraction and easily
- ⚙⌨️⚒ fix configout order typo
- 💣🛅⛓🔧🏹 finally get fusebox aliasing working using babel
- 💣🛅⛓🔧🏹 use latest fusebox homedir aliasing
- 💣🛅📖📚 fusebox example
- 💣🛅⚗ lots of fusebox experiments wow
- 🚯💣🛅 remove fusebox dist of master
- 📦⬆💣🛅 fusebox 119
- 🏰💣🛅🖥 refactor fused into fused commander
- 🔌 start expanding fusebox middleware
- 🖇 add path to helpers
- 🖇 relative path expansion
- 🖇 fs and path to helpers
- 🖇 helper.file.isFile
- 🖇 helper.file.getFileAndPath
- 🖇🔌 builderinstance plugin
- ⚙ add outFile config option
- ⚙ add default sourcemaps enabled, and disabled on production
- 🏰 restructure test middleware into one middleware folder
- 🏰 restructure builder middleware into one middleware folder
- 🕸🛅🏗 https://github.com/aretecode/pixi-help help someone with webpack config, finding the people who will need the sort of easy webpack builder
- 🚮🖥 cleaning command
- ⚗💣🛅 start fusebox experiment with ds-solver
- 📝📅 update todos and planning
- 🚮🔬⚙🏃 some cleaning in mocha runner
- 🗺🚩 sourcemap defaults for envs
- 🗺🚩⚙ sourcemap config options
- https://github.com/storybooks/react-storybook

# 🏗 part 6
- 💣🛅🏗📦 use fusebox from master
- 🔚 🔙📖📚 add back end node example
- ⚙📖📚 add exec example
- 🔬 tests as their own example
- 📝📅 update todos and planning

#  🏗 part 5
- 🗽 start on app context
- 💽 write configs to disk
- 🔮🖥 get node path automatically
- 🛡⚙ safely fallback to node path if nothing is provided
- 🔈 give warning if it falls back
- 📝📅 update todos and planning
- 📒🚚⚗ move experiments to packages/zexperiments
- 🔬 integration test building with webpack
- 🔈⚠🕸🛅🖥 logging and not executing when it is webpack cli
- ⚙ config option to force through webpack cli running things anyway
- 🤖🌲 start on transformers, parsers, ast
- 🍶📜 start on scripting and gulp
- 👣  ⚙🖇 recursive option on walk
- 💽 write packages to disc
- 📜✨ added diffing to packages for current vs production to be able to build our scripts!
- ⚗  experiment with glob
- ⌨️⚒ fix typo on env for production
- ⚒ 👹🔌 fix uglify plugin
- ━- ╤デ╦︻(▀̿̿Ĺ̯̿̿▀̿ ̿)" executor with jsdom polyfil and app option

# 🏗 part 4
- ✨🔈⚙🎨 easier text, verbose, and error logging options
- ✨🚩⚙ better flags with more config options: array of objects
- ⚒🔍🔌 added missing init middleware
- ✨🔌⚙ added ability to add middlewares as array or object, transform and validate them, and - add at any position / index
- ✨🗽 adding merging of aliases that are objects and arrays
- ✨🔬⚙ adding test preset
- ✨🔬⚙ adding test handler
- ✨🔬⚙🏃 adding test runner
- 🔬 adding tests
- 🔌 adding externals middleware
- 🔌☁️ adding node example
- ⛑🛡⚙ safety making defaultAppNames optional
- ✨🛅🏗 start hot module reloading support
- ✨🛅🏗 add polyfill option
- ✨👀⚙ watch option
- ✨🔬⚙🏃 add mocha running
- ✨👀🔬⚙ add mocha watching
- 📒🖇 start file helpers
- ⚙🏗 added builder instance to helpers
- ⚗ experiment with jsdom tape
- ✨⚙🏋️ support for raw `._loaders` with presets
- ✨⚙🍬 support for preset callback decorators

# 🏗 part 3
- ⚙👢🔌 add init
- 📖📚 add more examples that run
- 📜📦⬆ add package json
- 🚂 use auto port
- 🚧 warning for fusebox middleware comments
- 🎯☺️️🛅 resolve happypack includes
- ☺️️🛅⚙ happypack includes root default
- ☺️️🛅⚖️🏋️⚙🔌 happypack plugin with ids for all loaders
- 📒🚚🔈⚙🎨 move log formatters from devserver to log lib
- 👀⚙ add html creation with selector config option
- 👀⚙ add html full param options
- ⚙🏗 add addPreset
- ⚙🏗 add extendPresets
- 📝📅 update todos and planning
- 🏰 constructor to top
- 🏸🖥 serving if needed command
- ☕🏳️ cb function filters, fix logging in flags
- ⌨️⚒🔈 fix logging typo for building
- 🔬⚙ test env and custom env added
- 🗼🏋️⚒🏗  babel loader fix with core-js being loaded when it should not

# 🏗 part 2
- 📒🚮 some file cleanup
- ⌨️⚒☕🏳️ fix typo on defaultAppNames filter
- 🔈🎨☕🏳️ better logs for whitelist filters
- 👀⚙ add html template string support
- ⚖️🏋️⚙🔌  added loader options plugin
- 📌📌⚙ multiple entry point config option
- ⛓🏸🏗 connect all servers to builder
- ⚛⚙ react preset
- 🕸🛅🏗 convert all important webpack configs
- 🛡⚒💣🛅🏗 safety fixes for fusebox
- 🎨🏋️⚙🔌 style loader plugin
- ⌨️⚒ fix typo on filename in params

# -- prs to fusebox
- 📝⏲🚮 added todos for someone who has time to throw away one day
- 🔬ℹ️️ examples in the tests for detecting `process`
- ✚🔬 for common `process` use case
- 📦⬆ missing deps
- ⚒👕⚒ autofixes

- # part 0
- 🚩⚙ isWebpackCli
- 🚩⚙ added yargs
- 🏗👾👾👾 .mediator call for ultimate simplicity
- 🦄 .compile, with a promise returned result
- 🔢 ordering keys
- ☮️ compatibility+++
- 🔬 starting testing
- 📒🚚 rename with package json with src and examples and flow

## 📦⬆🗼🏋️🏗 updated babel-loader-builder to have
  - 🗼🏋️🏗 emoji header
  - 🏷 version bump
  - 📦⬆ use * for dep versions to use them just as a fallback if the client does not install them
  - 📦⬆ added babel-plugin-webpack-aliases
  - ⚙🕸🛅⛓🏹 webpack aliases option
  - ⚙🗺 add .sourceMaps option
  - ⚙🔥 add more inferno options
  - ⚙ add .latest option
  - ⚙ add .stringify option
  - ⚙ add defaults option
  - ⚙ put reactjsx explicitly as false in default options
  - 🛡 if config options cannot be used as default string
  - 👾🔬 simple tests for stringified and updated to latest
  - 📝 update todos
- 🏋️ add other benchmarks from mollyjs
- 💣🛅🏗🔌 fusebox middleware
- 🔈🎨⚙ more logging configs with verbose
- 🎯 lots of resolving
- 📝📅 update todos and planning
- 👕⚒ lint fixes for dbl quotes
- ✙🗼 enable .babelrc again
- ⛄🚨 igloo breaking example
- ❌ .gitignore build
- ✚🦌 moose example
- ⛓🔧🏹 aliasing / shimmiing eh and moose
- ☢⏲ eval a require to run the built file
- 🚮🔙🔚 clean to go back end
- ⚗📦⬆💣🛅🏗 experiment with fusebox frontend with updated deps
- 📝✏ update todos
- ⚗💣🛅🏗 experiment with fusebox
