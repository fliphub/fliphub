# 🏗🏗 fliphub
[![Build Status](https://travis-ci.org/fliphub/fliphub.svg?branch=master)](https://travis-ci.org/fliphub/fliphub)
[![fliphub](https://img.shields.io/badge/gitter-join%20chat%20%E2%86%92-brightgreen.svg)](https://gitter.im/fliphub/Lobby)
[![NPM version][npm-image]][npm-url]
[![Dependencies][david-deps-img]][david-deps-url]
[![Standard JS Style][standard-image]][standard-url]
[![MIT License][license-image]][license-url]

## another refactor is in progress
### huge wins for simplicity, power, and stability

the builder, of builders.

It allows you to create configs that would take hundreds or thousands of lines, with just a few properties.

## all you need

#### minimal
```js
import FlipHub from 'fliphub'
new FlipHub({entry: './src/index.js'}).fullAuto()
```


#### all the apps
one app? two apps? 100 apps? nodejs server, inferno, react, fusebox, _and_ webpack? existing configs? happy and no happy pack? at the same time? no sweat.
```js
const FlipHub = require('fliphub')
const apps = [
  {
    name: 'reacted',
    config: './webpack.config.js'
    fusebox: true,
  },
  {
    name: 'infernod',
    entry: './src/index.js',
    presets: ['inferno'],
    html: './src/index.html',
  },
  {
    name: 'backend',
    entry: './backend/src',
    presets: ['node'],
    happypack: false,
  },
]
module.exports = new FlipHub({apps}).fullAuto()
```

#### reusability?
```js
const FlipHub = require('fliphub')
const apps = [
  {
    name: 'reacted',
    presets: ['react', 'entry'],
  },
  {
    name: 'infernod',
    presets: ['inferno', 'entry'],
  },
]
module.exports = new FlipHub({
  apps,
  presets: {
    front: {
      entry: './src/index.js',
      html: '#root',
      fusebox: true,
    },
  },
}).fullAuto()
```

...oh and you can run those configs through webpack just like any other webpack config.
which means you can also change the returned config in the same way.

[they are configured for each environment by default](#-default settings)

[and can be customized for any config you want](#-flags)

[it can build itself with webpack or fusebox, with the flip of an env flag][src-pkg-json]

## the problem
- [build systems are notorious for their difficulty][medium-webpack-difficulty].
- finding and setting up the right
  - scripts
  - plugins
  - loaders
  - configs
  - requiring the dependencies
  - bloating your config files
  - making configs for
    - development bundling
    - production bundling
    - production dev bundling
    - test environments
    - development servers
    - production servers
- tedious, with a high barrier of entry
- time intensive; switching build systems for 1 app is grueling
- ... all of the above for _every application_

## the solution
- [with the flip of a flag](#flags), you can go from [webpack][webpack], to [fusebox][fusebox], or any other supported build system.
- [existing webpack configs](#compat) can be used and enhanced with ease.
- [create plugins](#create-your-own-plugins) to start converting your build system to another, flip the switch to keep compatibility without breaking everything,





# legend
- [middleware](#-middleware)
- [apps](#-apps)
- [commander](#-commander)
- [examples](#-examples)
- [terminology](#-terminology)
- [🏭 behind the scenes / internal](#-behind-the-scenes)




# examples
- [examples-basic][examples-basic]
- [examples-basic-build][examples-basic-build]
- [examples-compat][examples-compat] 🚧
- [examples-fliphub][examples-fliphub]
- [examples-fuse-canadas][examples-fuse-canadas]
- [examples-fusebox][examples-fusebox]
- [examples-intermediate][examples-intermediate]
- [examples-intermediate-tests][examples-intermediate-tests] 🚧
- [examples-verbose][examples-verbose]

### ⚠
- needs cleaning
- needs general improvements
- needs more thought in running them all
- [todo-examples][todo-examples]


# 🔌 middleware

------------------

### add your own middleware
- you can add your own middleware before building apps
- the name of the middleware maps in as a hook for the properties on the app
- optional index property to insert middleware at any position
- [middleware interface][flow-middleware]

#### example
```js
fliphub.addMiddlewares({
  index: 999, // optional
  name: 'propertyOnApp',
  inject(app, helpers) {
    helpers.log.text('❗ middleware for `.propertyOnApp`!')
    return app
  },
})
```

#### ⚠
- [todo-middleware][todo-middleware]


## 🐛 debugging
- ⚙ with full options for debugging everything in the flipping process, debugging is a breeze.
- see [debugging - deep](#deep-debugging) for all of the options



## 🏹 aliasing

### problems
  - relatively importing files is a major pain `../../../../../utils`
  - when refactoring, relative imports requires updating all files affected
  - manually resolving paths to root
    - bloats the code  
    - adds knowledge about the structure to files that should not need it, such as presentation layer / ui components
  - [multiple versions of any npm packages][shrinkwrap]   
    - [multiple react refs][react-refs-error] when multiple versions of react are loaded
    - dependencies have different versions of the same dependency
    - servers such as heroku keep caches where there are multiple versions

### solutions
  - using aliases, you can force a single version of a dependency
  - write your aliases relatively to your [home](#home)

### 🔗 resources
- [🗼 babel aliases][babel-module-resolver]
- [🕸 webpack aliases][webpack-alias]
- [💣 fusebox aliases][fusebox-alias]
- ✔️💣🕸

## 🍰 presets

### add your own presets
```js
.extendPresets({
  'inferno': {
    loaders: ['styleloader'],
    alias: ['moose', 'igloo', 'inferno'],
    html: '#root',
  },
})
```

### built in presets
- [built in presets][src-presets]


## 🍦 default settings
- [see the code][src-defaults]

### default defaults
```
{
  env: {
     production: {
       uglify: true,
       defineProduction: true,
       run: false,
       compile: true,
       useSourceMaps: false,
       sourceMapTool: 'hidden',
     },
     development: {
       noEmitErrors: true,
     },
  }
}
```

### adding your own defaults
this would make it so if `fusebox` [flag](#flags) are true, it would add the fusebox property to any app that has passed [filters](#filters) and is being built.
```js
fliphub.addDefaults({
  flags: {
    // this can also be a objects,
    // or an array of strings
    // or a string
    names: [{flag: 'fusebox', type: 'bool', default: false}],
    cb: ({fusebox}) => {
      return {fusebox}
    },
  },
})
```

### ⚠
- ✔️💣🕸
- needs docs
- [todo-presets][todo-presets]


## params
- converts shorthand code to webpack configs
- [read the code][src-params]
- ✔️💣🕸

## 💣🛅 fusebox
- converts webpack configs to fusebox configs
- [read the code][src-fusebox-middleware]
- ✔️💣
- [todo-build-systems][todo-build-systems]
- needs to pass in more of the config

## ☺️️🛅 happypack
- [happypack][happypack]
- ✔️🕸

### defaults
```js
happypack: {
  cache: false,
  threads: 4,
  include: [
    './',
  ],
}
```
```js
{
  _noop: true,
  clean: false, // bool, or array<string>
}
```


## 🗺 sourcemaps
- ✔️💣🕸

### defaults
```js
env: {
  development: {
    useSourceMaps: true,
    sourceMapTool: '#source-map',
  }
  production: {
    useSourceMaps: true,
    sourceMapTool: 'hidden',
  },
}
```

## ⚖️ loaders
- ✔️💣🕸
- .loaderOptions

### defaults
```js
loaders: {
  'babel': {},
  'json': {},
},
```



## 🚩 flags
flags can be used to find global variables passed around for configuration
from [globals][node-global]

### defaults
```js
flags: {
  names: [
    {flag: 'compile'},
    {flag: 'exec'},
    {flag: 'run'},
    {flag: 'test'},
  ],
  cb: ({compile, exec, run, test}) => {
    var decorated = {compile, exec, run, test}
    if (test) {
      if (decorated.presets) {
        decorated.presets.push('test')
        decorated.presets.push('mocha')
      }
      else decorated.presets = ['test', 'mocha']
    }
    // helpers.log.verbose(decorated)
    return decorated
  },
}
```

### examples
```js
flags: [
  {
    names: ['html'],
    cb({html}) {
      if (!html) return {}
      var template = `./back/verbose/${html}.html`
      return {html: [{template}]}
    },
  },
  {
    names: [{flag: 'run', type: 'bool', default: false}],
    cb({run}) {
      return {run}
    },
  },
],
```

### resources
- [yargs][yargs]
- [node-flag][node-flag]
- ✔️💣🕸

### ⚠
- needs ungreedy search
- [todo-flags][todo-flags]


## ♼ environment
is an extension of [flags](#flags) as a middleware using flags

### defaults
```js
env: {
  production: {
    uglify: true,
    defineProduction: true,
    run: false,
    compile: true,
    sourceMaps: false,
    sourceMapTool: 'hidden',
  },
  development: {
    noEmitErrors: true,
  },
}
```

## ☕🏳️ filters
white [flags](#flags) are used to filter which apps are run for different [operations](#app-operations)

apps, and app operations can be filtered based on flags either per app, or for all apps.
[see the examples](#examples)


## configOut
- writes the generated config to a file, for use with [babel-module-resolver][babel-module-resolver]
- ✔️💣🕸


## polyfills
- can be used currently only for polyfilling window when you `.exec` in [app operations](#app-operations)
### ⚠
- ✔️🕸
- needs docs
- [todo-polyfill][todo-polyfill]


## externals
- allows you to exclude paths from a bundle
- ✔️💣🕸
- [webpack externals][webpack-externals]
- [fuse exclude][fuse-arithmetic]



## tests
- run tests in mocha
- run tests in karma
- ^ while running dev servers at the same time

### ⚠
- ✔️💣🕸
- needs docs
- needs links to code
- needs links to karma and mocha
- [todo-tests][todo-tests]


# 👑⚔️ commander

### resources
- [commanderjs][commanderjs]

### ⚠
- needs docs
- needs lots of work
- [todo-commander][todo-commander]



# apps
- multiple apps [flow-app][flow-app]

### app-operations
  - 🏃🏸 running
    - 🔮🌐 automatic safety in ports
  - ⌛ compiling
    - 👂 compileEnd
  - 💀 executing
  - 👻 mediator
- ⛴ releasing scripts
  - 📦🏗 package builder
  - pipeline
  - task running
  - 💚📜 scripts created for ci environments
  - 🔮📜 scripts for all environments and servers created and added to your packages
  - 📦⬇ keep your dependencies at root to [avoid symlinks][com-avoid-symlinks] and [massive package sizes][com-massive-package-sizes]

### ⚠
- needs docs






# 🕳 digging deeper

## 🖇 helpers

## 🐛 deep-debugging
- 🎨 logs are styled with color & emoji for easy searchability & scannability
- 👀 full source options, when you want to see deep inside the contents, you can
  - [log.verbose](#log-verbose) for [node util inspected colored logs][node-util-format]
  - [log.source](#log-source) for [tosource][nodejs-tosource] logs of the contents
  - [log.color](#log-color) for [any supported color][chalkjs] as the [log level](#log-level)
  - [log.text.color](#log-text) for any supported color for entire log

### defaults
```js
debug: {
  missingMiddleware: false,
  missingLoaders: true,
  devServer: true,
  middleware: true,
  loaders: false,
  verbose: false,
  built: false,
  decorated: true,
  time: true,
  filter: true,
  defaults: false,
  happypack: false,
  presets: false,
  out: true,
  order: false,
  params: false,
  alias: true,
  fuse: true,
  exec: true,
  flags: true,
  testOutput: true,
}
```
### ⚠
- [todo-helpers#log][todo-helpers]




## 📒 files
- write
- read(dir)
  - synchronously reads a file as a string
- isFile(file)
  - returns boolean
- getFileAndPath(file)
  - splits up a path
  - returns {file, path}
- resolving
  - root
  - forKeys
  - isAbsolute

### ⚠
- needs types



## 🌐 port
used for finding available ports if preferred ones are not available

### ⚠
- needs types
- needs option to disable



## html

## example
```js
{
  flags: {
    // selector=your-custom-root-react-id
    // htmlfile='./src/index.html'
    // htmlfiles=['./src/index.html', './src/page2.html']
    // template=[{template: './src/index.html'}]
    names: [
      'selector',
      'htmlfile',
      'template',  
      {flag: 'htmlfiles', type: 'array'},
    ],
    cb: ({selector, htmlfile, template, htmlfiles}) => {
      if (selector) return {html: `#${selector}`}
      if (htmlfile) return {html: htmlfile}
      if (htmlfiles) return {html: [htmlfiles]}
      if (template) return {html: template}
    },
  },
}
```

### ⚠
- ✔️🕸
- needs docs
- needs more fusebox support, only supports html file


## 📚🚧 (need docs)
- HMR
- include
- builderInstance
- init
- instructions
- tasks
- copy
- define
- uglify
- analyze
- clean
- provide


## 🗝️⎁ terminology / key

### home
- [fusebox-homedir][fusebox-homedir]
- [webpack-root][webpack-root]

### ⚠
- docs need work
- code needs work
- 💣🛅 fusebox compatible
- 🕸🛅 webpack compatible




## 🏭 behind the scenes
  ## core
  ## middleware
  - flattening

  ## builders
  ## core

  ## 🖇 helpers
    reference & context

## 📅 plans
- [todo-architecture][todo-architecture]
- [todo-later-soon-next][todo-later-soon-next]
- [todo-perf][todo-perf]

### ⚠
- needs docs





# 🏗 build systems / builders
- fusebox
```js
  app = {
    fusebox: false,
    fuseboxAlias: false,
  }
```
- webpack - is default




# 🎃 tips n tricks
- 🚧 this is a wip, it has been in development for about a week and as such is not 100% stable, but is definitely worth trying

[src-pkg-json]: https://github.com/fliphub/fliphub/tree/master/package.json
[src-params]: https://github.com/fliphub/fliphub/tree/master/src/middleware/defaults.js
[src-fusebox-middleware]: https://github.com/fliphub/fliphub/tree/master/src/middleware/builders/fusebox.js
[src-presets]: https://github.com/fliphub/fliphub/tree/master/src/middleware/presets.js
[src-defaults]: https://github.com/fliphub/fliphub/tree/master/src/middleware/defaults.js

[flow-middleware]: https://github.com/fliphub/fliphub/tree/master/flow/MiddlewareInterface
[flow-app]: https://github.com/fliphub/fliphub/tree/master/flow/MiddlewareInterface

[examples-basic]: https://github.com/fliphub/fliphub/tree/master/example/configs/basic
[examples-basic-build]: https://github.com/fliphub/fliphub/tree/master/example/configs/basic-build
[examples-compat]: https://github.com/fliphub/fliphub/tree/master/example/configs/compat
[examples-fliphub]: https://github.com/fliphub/fliphub/tree/master/example/configs/fliphub
[examples-fuse-canadas]: https://github.com/fliphub/fliphub/tree/master/example/configs/fuse-canadas
[examples-fusebox]: https://github.com/fliphub/fliphub/tree/master/example/configs/fusebox
[examples-intermediate]: https://github.com/fliphub/fliphub/tree/master/example/configs/intermediate
[examples-intermediate-tests]: https://github.com/fliphub/fliphub/tree/master/example/configs/intermediate-tests
[examples-verbose]: https://github.com/fliphub/fliphub/tree/master/example/configs/verbose

[todo-flags]: https://github.com/fliphub/fliphub/tree/master/docs/todos/middleware/flags.md
[todo-aliasing]: https://github.com/fliphub/fliphub/tree/master/docs/todos/middleware/aliasing.md
[todo-compat]: https://github.com/fliphub/fliphub/tree/master/docs/todos/middleware/compat.md
[todo-HMR]: https://github.com/fliphub/fliphub/tree/master/docs/todos/middleware/HMR.md
[todo-loaders]: https://github.com/fliphub/fliphub/tree/master/docs/todos/middleware/loaders.md
[todo-middleware]: https://github.com/fliphub/fliphub/tree/master/docs/todos/middleware/middleware.md
[todo-polyfill]: https://github.com/fliphub/fliphub/tree/master/docs/todos/middleware/polyfill.md
[todo-presets]: https://github.com/fliphub/fliphub/tree/master/docs/todos/middleware/presets.md
[todo-tasks]: https://github.com/fliphub/fliphub/tree/master/docs/todos/middleware/tasks.md
[todo-architecture]: https://github.com/fliphub/fliphub/tree/master/docs/todos/architecture.md
[todo-build-systems]: https://github.com/fliphub/fliphub/tree/master/docs/todos/build-systems.md
[todo-commander]: https://github.com/fliphub/fliphub/tree/master/docs/todos/commander.md
[todo-core]: https://github.com/fliphub/fliphub/tree/master/docs/todos/core.md
[todo-docs]: https://github.com/fliphub/fliphub/tree/master/docs/todos/docs.md
[todo-examples]: https://github.com/fliphub/fliphub/tree/master/docs/todos/examples.md
[todo-helpers]: https://github.com/fliphub/fliphub/tree/master/docs/todos/helpers.md
[todo-later-soon-next]: https://github.com/fliphub/fliphub/tree/master/docs/todos/later-soon-next.md
[todo-perf]: https://github.com/fliphub/fliphub/tree/master/docs/todos/perf.md
[todo-tests]: https://github.com/fliphub/fliphub/tree/master/docs/todos/tests.md


[npm-image]: https://img.shields.io/npm/v/fliphub.svg
[npm-url]: https://npmjs.org/package/fliphub
[david-deps-img]: https://david-dm.org/fliphub/fliphub.svg
[david-deps-url]: https://david-dm.org/fliphub/fliphub

[emoji-commits]: https://github.com/aretecode/emoji-commits/
[chalk]: https://github.com/chalk/chalk

[react-refs-error]: https://facebook.github.io/react/docs/error-decoder.html?invariant=119
[shrinkwrap]: https://docs.npmjs.com/cli/shrinkwrap

[babel-setup]: https://babeljs.io/docs/setup/
[babel-module-resolver]: https://github.com/tleunen/babel-plugin-module-resolver
[babel-loader-builder]: https://github.com/aretecode/babel-loader-builder
[babel-monorepo]: [https://github.com/babel/babel/blob/master/doc/design/monorepo.md]
[babel-make]: [https://github.com/babel/babel/blob/master/Makefile]

[webpack]: https://webpack.js.org/
[webpack-alias]: https://webpack.js.org/configuration/resolve/
[webpack-root]: https://webpack.js.org/guides/migrating/#resolve-root-resolve-fallback-resolve-modulesdirectories
[medium-webpack-difficulty]: https://medium.com/@dtothefp/why-can-t-anyone-write-a-simple-webpack-tutorial-d0b075db35ed#.b57i57t24
[webpack-externals]: https://webpack.js.org/configuration/externals/#components/sidebar/sidebar.jsx

[happypack]: https://github.com/amireh/happypack
[webpack-plugin-uglify]: https://webpack.js.org/guides/migrating/#uglifyjsplugin-minimize-loaders

[fusebox]: http://fuse-box.org/
[fusebox-alias]: http://fuse-box.org/#alias
[fusebox-homedir]: http://fuse-box.org/#home-directory
[fuse-arithmetic]: http://fuse-box.org/#arithmetic-instructions

[sigh]: https://github.com/sighjs/sigh
[fly]: https://github.com/flyjs/fly
[brunch]: http://brunch.io/
[broccili]: [http://broccolijs.com/]
[gearjs]: [http://gearjs.org/]
[yeoman]: [http://yeoman.io/]
[make]: [https://github.com/mklabs/make]
[documentationjs]: [http://documentation.js.org/]
[ninjabuild]: [https://ninja-build.org/manual.html]

[meteor-scripts]: [https://github.com/meteor/meteor/tree/devel/scripts]
[facebook-gulp]: [https://github.com/facebook/react/blob/master/gulpfile.js]
[facebook-scripts]: [https://github.com/facebook/react/tree/master/scripts]
[commanderjs]: https://github.com/tj/commander.js/

[node-global]: https://nodejs.org/api/globals.html
[node-process-env]: https://nodejs.org/api/process.html#process_process_env
[node-util-format]: https://nodejs.org/api/util.html#util_util_format_format
[nodejs-tosource]: https://github.com/marcello3d/node-tosource

[yargs]: https://www.npmjs.com/package/yargs
[node-flag]: https://www.npmjs.com/package/node-flag

[standard-image]: https://img.shields.io/badge/code%20style-standard%2Bes6+-brightgreen.svg
[standard-url]: https://github.com/crocodilejs/eslint-config-aretecode
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT

[com-avoid-symlinks]: @TODO
[com-massive-package-sizes]: @TODO
