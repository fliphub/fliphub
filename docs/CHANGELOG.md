# 🔈 changelog 🔈

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
