# 🔈 changelog 🔈

# part 76 - apr 16 17

- 🔬👕 ava eslint rules, ⚗ experiment with prettier max len

- 🙃📒 flipfile
  - ⚗⚖️ benchmark experiment with globs switch glob-fs to node-glob, fast glob is not really much better
  - 📦⬆📦⬇ swapped glob-fs for node-glob
  - 📖💩 updated readme for glob depreciation

- 📦🙃 depflip & 🔎🎯 flipfind
  - 🐴📦⬆ temp added glob-fs until converted
  - 🔗 update links

- ⚡🤸 d-l-l
  - 🔊 better debugging

- 🛁📘 clean an example artifact log

# part 75 - apr 15 17

- ⚡🤸 d-l-l
  - 🆕 created
  - ⚗🤸 experiment with dll plugin
  - 🏷 setup repo & publish
  - 💚 add travis config
  - 🔬 add ~tests~ that just run build scripts in front & back end examples
  - 🌐📚 solid api docs
  - 📖📘📚️ readme, examples, docs
  - 🔗 add links
  - 🎁 all api functionality listed as of this wiki commit https://github.com/fliphub/d-l-l/wiki/%F0%9F%8C%90-api/0f696aa29d121d10670e80307fe663a634fffbb9
  - 📘 adding frontend example
  - 📘 adding node example
  - 📅📝 plan todos
  - ⛓💸 flipcache goodness
  - ℹ️ jsdocs
  - 🎁 all functionality found in docs

- 🚩 flipflag
  - 📦⬇ remove yargs
  - 📦⬇ move around deps

- 😊 emoji commits
  - ⎁, 🗝️, ▶️◀️👾, 🤸🍰, ✚😊
  - ▶️◀️👾 combine & simplify some sections
  - 🤸🍰 split out presets to make it easier to search
  - 🔗🎃 hrefs for helpful tips n tricks
  - ✚ add 😊😊😊 -- 📶⛰💯🕵🗜🐉✍👓⚾⭐🚁🆑💤😊🥕🚱⛏🎁🆕🆙🚓🚔📑👽🦐
  - https://github.com/aretecode/emoji-commits/commit/4ba448956a3401e0cbae60003f762e28a61bc33f


# part 74 - apr 14 17
- 🔬⚗ code coverage experiment
- 🛁📜 better cleaning script
- ⚗🤸 experiment with dll plugin add links

- 📚 docs
  - 🆕 start lint.md
  - 🆕 start editor.md
  - 🌐 add api to md-template

- ⛓💸 flipcache 🎁📒ℹ️️
  - 🎁📒ℹ️️ add File.info
  - 🎁📒ℹ️️ add File.lastModified

- ⛓⏲ fliptime 🎁📖📘
  - 🎁 added .tillNow
  - 📖📘 added docs for tillNow
  - 🎁 added .tillNowSatisfies
  - 📖📘 added docs for .tillNowSatisfies

- 💯fosho - 🎁 added .between

@TODO:
  - [ ] add flip-ts to flip js to ts, and ts to js (would convert, then run autofixing lint and prettier)
  - [ ] should add flippath to be pathmaster, have File, flipfile, flipcache, fliphub resolve etc, optimized, usable everywhere
  - [ ] .whenFlag(flagNames, cb)
  - [x] dev server
    - [x] neutrino devserver
    - [ ] express dev server
    - [ ] more verbose devserver output, use ops
  - decorate each of the commands with `-p`, `-d` and `-l` for logging and envs
  - [ ] build a chrome only bundle and a compat bundle







---------
---------
---------

# part 73 - apr 13 17
- ⚒📖💚🔬 minor fixes 📚
  - ⚒📖💚 fix travis link in readme
  - ⚒🔬 minor fix for running tests for flipcache
  - 📚 docs - add vid link, graphs & routing links
- ⏲💚🔬📒 debugging travis file existing timing
- 🍰 add commented out code for PresetAssetGraph todo

# part 72 - apr 12 17

- ⛓🔈 fliplog 🎁®️🚩⚾  📚📘  ⚡🦐
  - 🎁 add .registerConsole
  - 🎁⚾ add .registerCatch
  - 📒 start .toFile
  - 🚩 handle flags to debug all debugging
  - 📚 add docs in readme for the flag
  - 📚 add docs in readme for .registerCatch & .registerConsole
  - 📘 add examples in readme for .registerCatch & .registerConsole & flag
  - ⚡🦐 adjust more imports
  - 🌀⌨️⚒ fix spinner frame type check, check Array not string
- ⛓💸 flipcache
  - 🚮🐦 clean mocks after test
  - 🔬 re-enable all tests
  - ⛑ safety for non-existing-file in detached
  - 🎁 add .hashcache -> Cache
    - ℹ️️ jsdocs
    - 🎁 .hash, .staleTimeout, .debug, .hashChanged, .isStale, .canBeUsed, .bustIfNeeded, .setContent, .bustOnChange, .bust, .onBusted
    - 🔬 test basic .canBeUsed with consistent and random content
    - 🔬📝 test todos for other functionality
  - ⚒🔬 fix issue where tests are runningin multiple threads, running and coming back, adjust timeout, improve checks, add debug
  - ⛑🔬🐦 safety in test mocks for changing content
- 🙃# fliphash 🆕🔬📖
  - 🆕📖🔬 create, docs, tests, publish
- 🔎🎯 flipfind ⛑
  - ⛑ add safety to globbing as it can throw an lstat error when reading & writing in multiple processes
- ⏲ fliptime
  - ⛑ safety, fallback to performance.now and Date

- 📚 docs
  - ✚ add symlinks and exports
  - ✚ add more to sourcemaps, css, webpack, community
  - ✚ start improving awesome-fluent

- 🏗💠 fliphub
  - 🤾 devServer sticky multi spinner link with animation
  - ⚒☕ fixing filtering
  - 📦⬆🗼🏋️🏗 adding babel-loader builder
  - 🎁🍰 add PresetDefine
  - 🎁🍰 adding presets for inferno and react in babel & web
  - 🎁🍰 preset Alias works for preset require + preset resolve
  - ⚒🏹 fix aliasing, add option to resolving for force resolving if it thinks it is an absolute path
  - ⚒🍰📑 fix PresetHTML not returning plugin for webpack
  - 🤢 had to add preset looping .preDecorate
  - copy old compile op for webpack for more debugging later
  - big webpack chain fix for plugins and calling neutrino dependent plugins
  - docs on ops
  - adding fliphash and flipcache to estimate duration and hydrateFromCache

- 💠💗 fliphub-core
  - 🍰 add .getConfigured for Presets if needing to call some presets at different times


# part 71 - apr 11 17
- 📦🙃 depflip
  - ⚡ use require.resolve instead of requiring
  - ☕🏴🏳️ add .ignore and .only flags
- 📦 hoist dependencies
- 🔬 unify ava version, update minimal test example
- ⛓ flipchain
  - 🆙 update mergeReal with existing if values are the same
- 🏗💠 fliphub
  - 🆙 update debug config so it does not go to bundler
  - 🆙 have debug override default debug filter
  - 🎁 add devServer op
  - 🎁 add 🙃🛳 flipport
  - ⚒ fix array entry point https://github.com/fliphub/fliphub/issues/65
  - 🆕 start PresetAlias
  - 🎁🍰 add PresetCopy
  - 🎁🍰📑 add PresetHTML just for webpack for now
- ⛓🍯 flipglob
  - ⚒ fix the scoping when there are no packages
- ⛓🔈 fliplog 📖 & 🎁 🌀🌀🌀 & ⚡& 🎨🌀
  - 🌀🌀🌀 multispinner: .addSpinner .removeSpinner .startSpinners .stopSpinners https://github.com/fliphub/fliplog/issues/2#issuecomment-293445710
  - 📖🎨🌀 colored spinners + docs
  - 📖🌀🌀🌀 docs for multi spinner
  - 📖⚡ docs for performance


-----

# part 70 - apr 10 17

- ✍
  - https://twitter.com/aretecode/status/851344090033602560 post on package name for flip and fliphub
  - update gitter integrations

- ⛓🖥 flipcli 🎁☮️🆙
  - 🆕🎁 starting auto-cli-to-interactive-presets
  - 🆙 add more missing from vorpal: .types, .hidden, .cancel, added comments
  - ☮️ .message aliased as .description in Question for compatibility with vorpal
  - ✅ have basic cli-to-interactive working
  - 🆙 continuing cli presets
- 💯 fosho 📝
  - 📝 assertion writing todo https://github.com/fliphub/fliphub/issues/62
- 📚 docs ✚ added good/bad in webpack
  - https://img.shields.io/badge/%E2%9B%93-fluent-9659F7.svg?style=flat-square fluent badge
- ⛓ flipchain 📖🌊
  - 📖🌊 rock skipping analogy https://github.com/fliphub/fliphub/issues/61
- 🙃🍑 fliphtml 📦⬆⛓🕸🛅🤾  📖
  - 📦⬆⛓ add missing flipchain dep
  - 📦⬆🕸🛅🤾 add webpack server and history dep
  - 📖 add intro readme with 🚧🚧🚧
- 📘 examples 📦⬆🔖
  - 📦⬆🔖 update fliphub version
- ⛓💸 flipcache 📖👽
  - 👽 export more deps
  - 📖👽 exports in docs
- 🙃📒 flipfile 📦⬆
  - 📦⬆ add node-path-extras
- 🕳 deep-replace ⚒ fix missing files in pkgjson
- 📦🙃 depflip 🖥📖 📧
  - 🖥 add a bin to install dev deps
  - 🖥 cli for deps extractor
  - 📖 docs
  - 📧 emailing npm about dynamic installs

---

# part 69 - apr 9 17

- 🔥🖥 fliphub-inferno-cli 🔋🆙🍰
  - 🆙⛓🖥 using latest flipcli
  - 🔋🆙🍰 converting adding presets
  - 🔋🆙 converting tests
  - 🔋🆙 converting script building
  - 🔋🆙 converting from commander to vorpal with flipcli
- ⛓🖥 flipcli 📦⬆🕵🗜  ℹ️🎁
  - 🎁 add .separator
  - 🎁 add .hide
  - 🎁 add .history
  - 🎁 add .localStorage
  - ℹ️️ jsdocs to question
  - 📦⬆🕵🗜 add inspector-gadget dep
  - 🕵🗜 inspector-gadget on vorpal
- ⛓🍯 flipglob, fliphelp
  - 📖 start updating readme
- ⛓🔈 fliplog
  - 📖🛰 docs for `space`
  - ⚒🛰 fix spaces, make it append to `text`
  - ⚒🐛 fix capturing
  - 🎁💤 sleepfor
  - ⚒⛓🔗 fix flipchain link
  - 📜 script to run test-all
- 📚 docs ✚ added helpful-info/concurrency

# part 68 - apr 7 17

- ⛓💸 flipcache 📇ℹ️️🛁🔬⛑
  - 📇🎀📒 add json metadata meta cache file to ensure only a single operation to a single file at a time
  - ℹ️️ minor Core comments
  - 🛁 minor Core clean
  - 🔬 adding concurrency test
  - ⛑ safety with the timeout and ending

---

# part 67 - apr 6 17

- ⛓🖥 flipcli 🔌📜 🚩📦⬆ 🔮⛰ ℹ️
  - 🔌 add .use for middleware, firstly for 📜 flipscript
  - 🚩📦⬆ add flipflag as dep
  - 🔮⛰ auto env
  - ℹ️️ comments
- ⛓📜 flipscript 📐 💸 ⚒🏃⛰👣 🆙🎀 🆕⌛ 🔬🔬 👽👽
  - ⛓📜 flipscript
  - 🚩🚩 if last arg was doubledash which we do not need unless there are flags after it, pop it off
  - ⚒🏃⛰👣  fix running with no env & no PATH, passing in empty env causes EONENT
  - 📐 some refactor
  - 🆙🎀 better detection with special-character regexing for stringifying flags
  - 🆕 adding Remember for estimating progress of a script
  - 🆕⌛ implement estimator
  - 💸 use flipcache to store and read results
  - ⛓🚩 make Flag class chainable
  - 🔬 update tests for better stringifying
  - 🔬⛓🚩 update tests for updated chainable flags
  - 📦 move deps to deps file
  - 👽 export Flag and Remember
  - 👽 export deps
  - 🔬 add test for using prefixer and just flag
  - 🔬 test for globarg only, added shorthand options, added globarg
- ⏲ fliptime 👽💸
  - 👽 export microtime
  - 💸 add docs for parse and properties
- 💸 flipcache
  - 📦⬆💤 add sleepfor
  - 🚓 add force bypassing loaded file cache
  - 🚑🐛 add missing .get!
  - ✅ finishing detachedParent
  - 🆙⛓🗺 update map to remove _ functions
  - 🆙 update File.toString
  - 🆙 update .load
  - 🔬 autoDelete test working
  - 🔬 autoRestore test working
  - 🔬 test for backup working
  - 🔬 test for backupAndRestore
  - 🔬 test for error handling safety when restoring
- 🚩 flipflag 🎁🤖 ⛓ 🍴
  - 🎁🤖 added .findAndRemove
  - 🆕 started fluent
  - 🍴 forked minimist to upgrade it
  - ✚ added objToArr for possible use
- 📚 docs ✚✚✚ add redux, webworker, process, types
- 💤 sleepFor 💍📖
  - 💍 return a promise.resolve so it can be awaited for testing
  - 📖 some inline jsdocs
- ⛓ flipglob 📖📝
  - 📖 minor docs update
  - 📖 add readme for future
  - 📝 add todo for emoji choices and todo
  - 🛰
- 💯 fosho 🎁
  - 🎁 add .aint(flipfile fns)
- 🏗💠🔮 flipfam 👽📒
  - 👽📒 export all files so they can be used individually

--------

# part 66 - apr 5 17
- 🏗💠 fliphub, 🔬🍰 🔬📦 📚🔗📖📘 🛁📒🚚 ⚙🛡
  - 📝🍰🌎 preset provide in presets/todos
  - 🔗 more readme links
  - 📖 gitbook fiddling, documentation expansion
  - 🔬🍰 test for presets as obj
  - 📖📦 doc for packages
  - 📖📒🚚🏰 move around the docs structure
  - 🔫 add bullet-points
  - 🛁 clean the presets-defaults
  - 🔗 update links from refactor2 to master
  - ⚙ expand on config
  - ⚙🛡 add safety in bundlerFlipper when merging to fallback to object if they are inheriting/using-reusable configs
  - 🍰⚙ added preset-reusable
  - 🔬🚨 failing tests for reusable inheriting fliphub configs (via plugins, though it should not be needed since configs are inherited if inherited is not false so...)
  - 📘 examples
  - 🔬📦 update test dependencies for ava

- 🎯 fliphub-resolve & 🥕 mono-root
  - 📖 docs part 2
  - 📘 examples
- 📜 flipscript
  - 🔬🚨 update test for permutator to use commas instead of spaces
- 🕳 deep-replace
  - 📖 adding docs
  - 🔬 test setup
- ⛓🔈 fliplog
  - 🎁 trackConsole
  - ⌨️⚒ fix typo where using .quick would use arguments even if it was only length 1 which was a harder to read log
  - 🔍🎨 add missing color red shorthand
- 💯 fosho
  - 🚧 add .t method to scope `t` for shorter asserting
- 🖥 flipcli
  - 🔬 more tests
- 🎀⛓ json-chain
  - 🎁 .setIfNotEmpty
  - 🔬 updated
  - 📚 add docs
  - 📦⬆🎁 add dotprop set and get
  - 🎁 add .set .get .delete .remove aliases
- 💾💸 flipcache
  - 🗑 add `.del`
  - 🎀⛓ update with latest json-chain
  - 👣 adding .dir
  - 🔬 added test
  - 📦⬆📦⬇ swap built in autofind with 🔎 flipfind
🏗💠🔮 flipfam
 - added fliphub back to dep from optionalDependencies
 - updated 🎯 fliphub-resolve & 🥕 mono-root
 - used 💾💸 to create exports
 - 🔬 added tests

---
- ⛓🔈 fliplog
  - ☕ filtering - added support for function
  - 🎁 add .expose
  - 🐌 add .slow mode
  - 📖 updated readme to reflect
  - 📖🏗💠🔮 added flipfam to readme
  - 📝 update todos
  - 🛁⚗ clean experiment
---

# part 65 - apr 4 17
- 👂 flipevent
  - 🆕 start
  - 📒🚚 extract from fliphub-core
- 💠💗 fliphub-core
  - 📖📚 docs
- fliphtml
  - part4
  - ⚗ experiment with gom
  - 🏸 make static server serve them all
  - 📝 add todos for server with webpack with multiple html files
  - 🐦 add fixtures
  - 📝 add links
- 📖📚 docs
  - 🤸 splitting up into files
  - ✍ updating contents
  - 📝 adding todos
  - 📘📖 prepping for gitbook
- ⛓ flipchain
  - 📖 add create-once-get-three docs
  - 📘 add examples of merging and hydrating
  - 📘👋 simple example
  - 📘🕳🏊 advanced example
  - 📝 add todo
  - 🚑🐛 fix extending with prefixes
- ⛓🔈 fliplog
  - 🎁 add .expose
- 💍 tiny-promise-map
  - 📖 readme setup
  - 🔬 test setup
  - ⛓ add .chain and .map exports
-  🏗💠 fliphub
  - ⛰🍰 env preset
    - update args
    - 📖 expanding docs
    - 📖 adding wiki
- 🏗💠🔮 flipfam
  - 📦⬇ update dependencies for unreleased deps

# part 64 - apr 3 17
- 🏗💠 fliphub
  - 🍰 🙃 🚩 updating preset-flags
  - 📖📘📚 adding flags example, updating readmes
  - 🍰📝 add PresetNoop to presets/todo
  - 🍰📝 add PresetPkg to presets/todo
- 🙃🛳 flipport
  - 📒🚚🖇 move out of fliphub-helpers
  - 🆕 create
  - 📖 add readme
- 📚 docs
  - 📦 add dependencies.md

# part 63 - apr 3 17

- 🚁 on the fly
  - 📛 updated badges, readme
  - 📦⬆📦⬇ swap flipfile finding file for 🔎 flipfind
- 💾💸 flipcache
  - 📦⬆📦⬇ swap built in autofind with 🔎 flipfind
  - export all files so they can be used individually
- 🎀⛓ json-chain
  - 📚 add docs
  - 📦⬆🎁 add dotprop set and get
  - 🎁 add .set .get .delete .remove aliases
- 📚📚📚📖📖📖
- 🤝 flipshake
  - 🆕 start
  - ✚ add pkgjson
  - 📝🔬 add test todos
  - add fixtures
  - 📦⬆📦⬇ add deps
  - 🆒 added query string require statements by generating out the permutations of requires
  - need to 📘 add examples & readme
- 📜 flipscript
  - ✚ add .separator to options in permutations, for flipshake
  - 🚑🐛 fix wrong pkg main field
  - and it works ^w^
- 🏋️⚗ play/bench for env experiment
- 📚📖📘 readme & examples update
  - [to-arr], does-include, izz, flipcli, 💤 sleepfor, 💯 fosho, 🏹 fliphub-alias, 🗺 remap-by, 👶 childparent, 💾💸 flipcache, {arr-to-obj}, , 💠 fliphub-core, easy-npm-files, 📒 flipfile, expose-hidden, ⏲ fliptime, es5exports, 🕵🗜 inspector-gadget
- ⛓ flipchain
  - 📚 docs
  - 📖📘 examples
- 🙃 🚩 flipflag
  - 📚 docs
  - 📖📘 examples

-------

- 🏗💠🔮 flipfam
  - 🔗 so many links, so many more todo
- 🏗💠
  - 📖 wip readme glob generator
  - 📖 readme improvements
  - 📚 misc minor docs changes
  - 📝 misc todos


# part 62 - apr 2 17
- ⛓🔈 fliplog
  - 📒🚚 move tests & examples to /test
  - added progress bar
  - 📚 adding docs for fun, sparkly, bar, beep, box, formatting, progress, highlight, bar, update doDiffs -> diff, emojis
  - 📦⬆📦⬇ adjust deps
  - ⚒🐛 fix capturing
  - added a formatter fn cb for data, for use later
- 🏗💠🥕 fliphub-monorepo
  - update deps move some into optionalDependencies
- 📘 examples
  - updating package jsons
  - ⚒ finding cycle in deps
  - 👾 add minimal
- misc minor updates in git commits
- 🗝️ minor package keyword changes, readme emoji and such
- 🖥 flipcli
  - ⛓ add shorthand choices, so nice
  - 🏭 expanding shorthand with a shorthandFactory for all question options
- ⛓🔎 flipfind
  - 📒🚚 take beginnig part out of flipfile
  - 🆕 start
  - 📖 add readme
  - 📜 add pkgjson
  - 📦⬆ add deps
  - 🔬 add tests
    - debug test
    - failing / non-existing-file test
    - file only
    - obj
    - relative
    - shorthand
  - 🔊 add debug mode
  - ⚡ optimize
  - 📚 add docs
  - 📘 add examples
- 🥕 mono-root
  - 📖 add to readme
- 🎯 fliphub-resolve
  - 📖 start adding some docs for readme pt2
- ⛓⌛ fliptime
  - 📚 more to readme
  - 🎁 adding .took
  - 🔬 added tests
- 📚 docs
  - ⛓ add awesome-fluent.md
  - ℹ️️ add explanation for Replace/Define
  - 🏗💠🔮 flipfam setup badge
    - https://img.shields.io/badge/%F0%9F%8F%97%20%F0%9F%92%A0-flipfam-9659F7.svg
- 📒 flipfile
 - 🚑🐛 added missing files to pkg json files
 - 📒🚚 move /find out as the beginning of flipfind
- insert-at-index
  - 🔬 add test
  - 📚 update docs

- ⚒💚🔬 🆕👶 🏗💠🔎📦⬆
- 💚 travis working to install now
- 🔬🚨 tests
  - 🏴 adding glob for exec on lerna.json
  - ⚒ fixing flipcache, fliphelp,  tests
  - 🛁 remove missing tests on depflip, tiny-promise-map, regexes, emoji-by-name
  - 👣 update fliphub tests with fusebox with absolute paths
  - 🔮🦄💍 use async instead of promises
  - 💚 should be ready for travis
- 👶 childparent
  - 🆕 extracted child-to-parent-methods into childparent module
  - 📖 add basic example
- 🏗💠 fliphub
  - 🔎📦⬆ neutrino-middleware-progress
- ⛓ flipchain
  - 📦⬇🖇 deps down using simpler prefix inline instead of the whole fliphub-helpers just for the prefix util
  - 🚑🐛 fix bug when importing that prefix
- 🖇 fliphub-helpers
  - remove some utils that have been moved to other modules (stringContainsAnyOf)
  - improve str/prefix
- 👕 allow var
- 📝 for readme with dep checking

- ⛓🔈 fliplog
  - 📦⬆💤 sleepfor
  - 📖 add readme
  - 😊 update description & emoji

# part 61 - apr 1 17
- wrote commits using emoji again finally
- remove flipglob from next as it is a module now

- flipfam
  - start
  - add deps
  - add missing deps
  - add light
  - publish for the name
- 📚 docs
  - add server.md
  - add cli.md
  - do some solid research for cli before expanding on fluent-cli to ensure best choice before investing
- fliplog
  - add boxen,
  - add sparkly,
  - add babar,
  - add ora,
  - add node-notifier,
  - add beeper (with .inspect so it only beeps on echo)
  - add test-fun to run it
  - add cli-highlight, and strip out the annoying html tags
  - add random shuffling to defaults on sparkly & babar
- flipcache
  - add configstore dep
  - add store method
  - default to store if no file path passed in
  - add static .file method
- flipscripts
  - added tags
  - added dargs
  - moved test deps to devDependencies
- flipchain
  - add .append & .append as commonly it is being used to .get.concat.set or +=
  - safety to setting .name
- fliphub-cli
  - clean up and use flipcli
  - add todos
- flipcli
  - a lot of fiddling and thinking and reading to get a simple example
    that does what is expected part 1
  - first simple example is working, so nice and short!!!
  - two steps + confirm, exactly how it should be.
  - add Stepper with .run op
  - add vorpal command integration
  - add .actionPrompt
  - add all main actions from vorpal to cli
  - add log, vorpal, and inquirer to exports
  - split into multiple files
  - export all in index
  - move Presets in as a todo
  - add examples to readme
- fliphtml
  - expanding for chaining
  - simplify the handling before it is working to avoid too much magic hard to debug
  - simplified copying and setting up
  - rename to fliphtml
  - fork gom-html-parser since it had no main field

# part 60 - mar 31 17
- flipglob
  - adding minimatch
  - add izz
  - add isGlob
- fliplog
  - making echo default fn rather than log and aliasing echo
  - adding diffs instead of dodiffs
  - safety to diffs
  - safety to stringify
- depflip
  - move glob-fs out,
  - fix dupe keys in pkg json
- flippack
  - cleaning old ScriptPermutator
  - cleaning PackageFinder
  - cleaning publisher a little, adding comments
  - updating deps
  - updating PackageManager to use flipcache
  - adding README
- fliphub-core
  - add link to workflow song
- add .log.* to .gitignore
- fliplog
  - fix bug in echoing when echoing `false`
- html-plugin
  - adding deps
- fluent-cli
  - create
  - mock out an interface example
  - setup pkgjson with deps
- fliphub
  - minor update to presets/todo/opshub/run
  - clean some deps

---

# part 59 - mar 31 17
- attempt to configure commonchunks for nodejs, not easy
- docs
  - add a few to splitting
- json-chain
  - create
  - add toJSON, toString, has, del, val, parse, update
  - add chainable functionality
  - make pkgjson
- flipcache
  - flush out two examples
  - chain it up
  - use json-chain
  - add deps
  - split into individual files
  - ran initial log test, looks good
  - adding .create to the File, if it does not exist
  - child-to-parent-methods from json to File
  - returning File when calling update on json
  - some cleaning and jsdocs
  - adding .backup to Files
- eslint
  - allowing return assign
- flipchain
  - add aliasMethods
- flipscript
  - adding Binner
  - move ava to devDependencies
  - splitting into files
  - testing stdout contents, working
  - adding autostringify if using anything but letters, numbers, and more than 1 dash
- onthefly
  - add missing pkgjson metadata
- make jsonchain
  - move files there from flipcache
- added some autoresolving, will be good to improve on
- TODOs
  - move TODO to docs
  - updating
- docs
  - adding some vorpal links to flipcache, cli, etc
- minimal test
  - added a simple ava example seed
- fliphub-cli
  - clean up the files
- inspector-gadget
  - added missing pkgjson description
  - added picture
- easy-npm-files
  - updating todos
  - updating exposer
  - using flipcache
  - add description
  - improving
  - needs one last pass for dealing with paths, then should be good to go
- izz
  - added is.glob
  - added todo
- committing to github

# part 58 - mar 30 17
- filter out large file that prevented committing
- started git.md
- typos on flags.name(s)
- clean backup
- fix docs links
- updated on-the-fly 📇
  - to run without a trace
  - installation docs
  - updated docs for without a trace
  - published under onthefly as well as it uses that for the bin
  - 📦⬆💸 add flipcache for use later
- flipscript
  - hacking on it
  - fixing prefixing
  - adding toCmd
  - fixing group index and order
  - add ops.run
  - adding tests
    - test toString
    - test toCmd on all scripts
    - toCmd on one script
    - lerna
    - prefixes not duplicated
    - prefixes respected
    - npm adds doubledash
    - npm deepEqual
- inspector-gadget
  - export util
  - export disabling of custom inspection
  - docs for custom
  - readme picture
- izz
  - extend is_js
  - add .includes
  - add .glob
- fosho
  - adding diff logging in equals
  - adding occurrs/includesTimes
  - multi-arg support for izz
- 📒 flipfile
  - add glob-fs
  - expanding readme
  - add fs-extra under /extra.js
  - add all.js to export all
  - added ava for testing
  - added test for export
  - examples to readme
  - flat export of path in all
- expose-hidden
  - return object for convenience
  - make second arg allow no binding
  - update docs to reflect
  - add .version to it, good practice
- flipcache
  - started
  - added detached child experiment, success, cool
  - planned a bit
- fliphelp
  - started
  - experimented with tern
  - added screenshots of result
- docs
  - add bench.md
  - add more to monorepo

---

# part 57 - mar 29 17
- update todos
- moving out uvxyz
- json plugin into rollup for now
- more splitting up the examples
- starting on an array of flips.to
- got array of flips.to working first round, sweet
- starting multiple apps with flip.to arrays
- fixed typo on fliplog filters with conditional _filters_ reset
- 9 bundles at once works :success: but memory leak with eventemitter2
- updating linting-example
- updating typescript example
- adding eslintrc with airbnb
- move out old examples
- add in empty minify-examples to start
- start webworker example
- move out old example/z into random
- move out old example/es6+ts into es6-ts-cconfig-example
- move out old example/tests into tests
- start updating readme
- adding tap args for presets
- added aliasing to web preset to require built in middleware as updating docs and examples
- todo on with loader merge for inferno preset
- adding the readme2
- move more of pkgmngr topkgmngr
- moving around cli
- making flipscript
- add flippack for flipping package json scripts
- export appRootPath in mono-root
- gulp doc list
- finally move babelrc for minify out of fliphub src
- add find to flipfile
- make on-the-fly
- making fluent flags
- continuing flipscript
- adding back accidentally deleted flipglob
- having flipscript use fliphub-core
- adding contextType to fliphub-core
- adding extend increment
- making the chainedmap return this on extension methods
- adding extendType to flipchain
- add izz.any
- add izz.realNotEmpty
- tostring the flags, nice and simple
- update fliptime to use microtime
- add fliptime to fliplog
- clean up quick a bit for the arguments
- format fliptime a little
- start advice.md
- expand flipglob a little
- adding lots to flipscript, docblocks, full features
- starting toString on flipscript
- pushing to github, somehow committed but didn't push

---

# part 56 - mar 28 17
https://github.com/mozilla-neutrino/neutrino-dev/issues/151
- painfully debug typo in webpack-chain https://github.com/mozilla-neutrino/webpack-chain/pull/21
- update webpack-chain pr https://github.com/mozilla-neutrino/webpack-chain/pull/19
- updating foldername to fliphub from fliphub2
- example/temps working
- set rollupdefaults to preset defaults
- handle replacing things in rollup that are webpack and fusebox only with entry points
- adding resolveall to rollup
- update webpack-chain pr again
- update presets to use fuse-box instead of fsbx
- better resolving with prettier relative paths
- splitting and updating node example
- splitting and updating canadas example
- add .name to chained by default
- add outputToString method on bundler config for support from webpack to fusebox and rollup
- fix double slash in alias to fusebox
- add PresetWeb to move react/inferno/web out of PresetBabel
- change .resolve.alias to .alias for fusebox and rollup
- add rollup-plugin-alias
- updating empty example
- update rollup defaults to resolve output paths from webpack...
- html preset part 3
- pr updating fuse-box spinner https://github.com/fuse-box/fuse-box/pull/442
- decorating fliplog with .color(text) shorthands
- making fliplog implement PSR-3
- making fliplog callable as a fn
- make extend-hidden object
- fix extra : used in fliplog if no text or title
- make does-include module with {any, all}
- update fliphub-core pkg json
- update flipfile pkgjson
- cleaning some folders like yuge into playground
- cleaning old flipchain from modules/next
- adding missing pkjsons for lerna
- pkgjson for emoji-by-name
- updating fosho to use extend-hidden
- rename extend-hidden to expose-hidden
- update inspector-gadget docs
- publish packages
- make repo for fliplog
- update readme badge url for codestyle
- update gitter room
- update gitter badge
- fix some screenshots
- publish the modules
- push to github
- 🚮 delete fake it generated src

# part 55 - mar 27 17
- move .each and .all to izz from fosho
- testing other bundlers to ensure output for all :-)
- make fusebox default set flipto
- make bundlerflipper re-init and re-merge if to is changed
- add del to flipfile
- add log to fliphub exports
- clean neutrino-preset
- update neutrino preset toWebpack fn as workflow changes where the config and bundler api are
- continue on examples
- fix toConfig for contexts -> have them use bundler.api.config if available
- neutrino with newest version breaking with immutables, revert some changes, make issue

# part 54 - mar 26 17
- going to add tests for bundling, make sure it all works, then good to go :-)
- remove generated mocks woops
- update todos, remove dist
- add isRizzle, add power assert, convert all fuse tests to 10x smaller scoped
- test preset inheritence
- test multiple apps
- test default to webpack
- test flipto rollup
- verbose reporting for fosho logging diffs and failures
- build tests
  - fix calling .build on context on buildSync op
  - adding buildSync test
  - adding buildFast test
  - adding build output exists test
  - adding auto calling setup in ops if it was not explicitly called
- add safety to stop the spinner in fliplog
- starting defaults
  - adding defaults prop to configs
  - adding to configDefaulter
  - adding monorepo mode for resolving easier
- fixing alias resolve
- fixing preset merging when args exist and they are undefined which triggered falsy condition and did not set them over
- extending fusebox default preset
- fix regression in merging configs in bundler flipper

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
