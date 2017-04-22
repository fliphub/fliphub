[travis-image]: https://travis-ci.org/fliphub/fliphub.svg?branch=master
[travis-url]: https://travis-ci.org/fliphub/fliphub
[flipfam-image]: https://img.shields.io/badge/%F0%9F%8F%97%20%F0%9F%92%A0-flipfam-9659F7.svg
[flipfam-url]: https://www.npmjs.com/package/flipfam
[nsp-url]:https://nodesecurity.io/orgs/fliphub/projects/d37f0cc6-02ea-4f05-a8aa-3b6c1e08bd21
[nsp-image]: https://nodesecurity.io/orgs/fliphub/projects/d37f0cc6-02ea-4f05-a8aa-3b6c1e08bd21/badge

[fliphub-npm-image]: https://img.shields.io/npm/v/fliphub.svg
[fliphub-npm-url]: https://npmjs.org/package/fliphub

<!-- [![Slack][slack-image]][slack-url] -->

# 🏗💠 fliphub
[![Build Status][travis-image]][travis-url]
[![NPM version][fliphub-npm-image]][fliphub-npm-url]
[![fliphub][gitter-badge]][gitter-url]
[![flipfam][flipfam-image]][flipfam-url]
[![Dependencies][david-deps-img]][david-deps-url]
[![MIT License][license-image]][license-url]
[![Standard JS Style][standard-image]][standard-url]
[![NSP Status][nsp-image]][nsp-url]
![examples-badge](https://img.shields.io/badge/📘-examples-blue.svg?style=flat-square)
[![PRs Welcome](https://img.shields.io/badge/🌽%20PRs-welcome-EFC052.svg?style=flat-square)](http://makeapullrequest.com)

> the builder, of builders.





### 👾 all you need
#### [see the example](examples/minimal)

enables configs that would take hundreds or thousands of lines, with just a few properties.


```js
const FlipHub = require('fliphub')
new FlipHub({entry: './src/index.js'}).build()
```

### 📦 installation
```bash
yarn add fliphub
npm i fliphub --save
```

<!-- legend for all the packages 0.0?
[cli][docs-cli]
-->

### 🗝️ legend
- [introduction](#-intro)
- [all the apps](#-all-the-apps)
- [flipfam][flipfam-url]
- [fliphub-core](#fliphub-core)
  - [presets](#-presets)
  - [hubs](#-hubs)
- [examples](#-examples)
- [apps](#-apps)
- [cli](#-cli)
- [terminology](#-terminology)


## 📅❗ **__[changelog][changelog]__**
keep up to date! updated frequently.

[changelog]: https://github.com/fliphub/fliphub/blob/master/docs/CHANGELOG.md

<!-- also see the [board](https://github.com/fliphub/fliphub/issues#boards?repos=82865013) -->

#### all the apps

one app? two apps? 100 apps? fusebox, rollup, _and_ webpack? nodejs server, inferno, and react? existing configs? happy and no happy pack? at the same time? no sweat.

```js
const FlipHub = require('fliphub')

// take an existing config, flip it to fusebox or rollup or webpack
const config = require('./webpack.config.js')
config.flips = {to: 'fusebox'}

const apps = [
  config,

  {
    name: 'infernod',
    entry: './src/index.js',
    presets: ['inferno', 'neutrino-preset-happypack', 'web'],
  },
  {
    name: 'backend',
    entry: './backend/src',
    presets: ['node'],
  },
]

FlipHub.init({apps}).build()
```













#### ♻️ reusability?
```js
const { FlipHub } = require('fliphub')
const apps = [
  {
    name: 'reacted',
    presets: ['react'],
  },
  {
    name: 'infernod',
    presets: ['inferno'],
  },
]

FlipHub.init({
  presets: {
    reusable: {
      entry: './src/index.js',
      flips: {to: 'fusebox'},
    },
  },
  apps,
}).build()
```

[they are configured for each environment by default][docs-presets-default]
[and can be customized for any config you want](#-flags)

## ⚠️ the problem
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

## ✔️ the solution
- [with the flip of a flag](#-flags), you can go from [webpack][webpack-url], to [fusebox][fusebox-url], to [rollup][rollup-url] or any other supported [build system][docs-build-systems].
- [existing configs](#-examples) can be used and enhanced with ease.
- [easily create presets & hubs][docs-presets-add-your-own] to start converting your build system to another, flip the switch to keep compatibility without breaking everything,







# 📘 examples
- [examples-minimal][examples-minimal]
- [examples-canadas][examples-canadas]
- [examples-monorepo][examples-monorepo]
- [examples-react][examples-react]
- [examples-react-and-alias][examples-react-and-alias]
- [examples-typescript][examples-typescript]
- [examples-node][examples-node]
- [examples-lint][examples-lint]
- [examples-compat][examples-compat] 🚧
- [examples-tests][examples-tests] 🚧
- [examples-webworker][examples-webworker] 🚧
- [examples-code-splitting][examples-code-splitting] 🚧
- [examples-es6-ts-config][examples-es6-ts-config] 🚧
- [examples-flags][examples-flags] 🚧


# 📚 documentation

- [📖 see the wiki][wiki-url]
- [🚧 see the work-in-progress docs][docs-wip]


# 💠 hubs (middleware +)
[docs hubs][docs-hubs]


## 🚩 flags
#### ☕🏳️ filters
white-list flags are used to filter which apps are run for different [operations][wiki-url]

## 🏹 aliasing

[see the alias docs][docs-alias]


## 🍰 presets

[see the preset documentation][docs-presets]

```js
const apps = [{
  presets: ['alias-resolve', 'neutrino-preset-web', 'eslint'],
}]

const appsWithArgs = [{
  presets: {
    aliasResolve: __dirname,
    presetWeb: null,
    eslint: require('./.eslintrc.js')
  },
}]
```

<!--
# 🕳 digging deeper
## 🖇 tools
- see flipfam
-->


# v0
v0 is still available as [flipbox][flipbox-url] but is unmaintained.

[docs-wip]: https://github.com/fliphub/fliphub/tree/master/docs
[docs-build-systems]: https://github.com/fliphub/fliphub/wiki/supported-build-systems
[docs-presets-add-your-own]: https://github.com/fliphub/fliphub/wiki/presets-add-your-own
[wip-docs]: https://github.com/fliphub/fliphub/tree/master/docs
[wiki-url]: https://github.com/fliphub/fliphub/wiki
[flipbox-url]: https://www.npmjs.com/package/flipbox
[webpack-url]: https://webpack.js.org/
[rollup-url]: rollupjs.org
[fusebox-url]: fuse-box.org
[docs-presets-default]: https://github.com/fliphub/fliphub/wiki/presets-default
[examples-minimal]: https://github.com/fliphub/fliphub/tree/master/examples/minimal
[examples-compat]: https://github.com/fliphub/fliphub/tree/master/examples/compat
[examples-react]: https://github.com/fliphub/fliphub/tree/master/examples/react
[examples-react-and-alias]: https://github.com/fliphub/fliphub/tree/master/examples/react-and-alias
[examples-canadas]: https://github.com/fliphub/fliphub/tree/master/examples/canadas
[examples-lint]: https://github.com/fliphub/fliphub/tree/master/examples/lint
[examples-empty]: https://github.com/fliphub/fliphub/tree/master/examples/empty
[examples-monorepo]: https://github.com/fliphub/fliphub/tree/master/examples/monorepo
[examples-typescript]: https://github.com/fliphub/fliphub/tree/master/examples/typescript
[examples-webworker]: https://github.com/fliphub/fliphub/tree/master/examples/webworker
[examples-tests]: https://github.com/fliphub/fliphub/tree/master/examples/tests
[examples-code-splitting]: https://github.com/fliphub/fliphub/tree/master/examples/code-splitting
[examples-es6-ts-config]: https://github.com/fliphub/fliphub/tree/master/examples/es6-ts-config
[examples-node]: https://github.com/fliphub/fliphub/tree/master/examples/node
[examples-flags]: https://github.com/fliphub/fliphub/tree/master/examples/flags

[src-core-workflow]: https://github.com/fliphub/fliphub/tree/master/packages/fliphub-core/src
[src-fliphubp-hubs]: https://github.com/fliphub/fliphub/tree/master/packages/fliphub/src/hubs
[src-fliphubp-configdefaulter]: https://github.com/fliphub/fliphub/blob/master/packages/fliphub/src/hubs/ConfigDefaulter.js
[src-fliphubp-presets]: https://github.com/fliphub/fliphub/tree/master/packages/fliphub/src/presets
[src-fliphub-core]: https://github.com/fliphub/fliphub/tree/master/packages/fliphub/src/core


[docs-cli]: https://github.com/fliphub/fliphub/tree/master/docs/cli.md
[docs-cli]: https://github.com/fliphub/fliphub/tree/master/docs/cli.md
[docs-alias]: https://github.com/fliphub/fliphub/tree/master/docs/cli.md
[docs-presets]: https://github.com/fliphub/fliphub/tree/master/docs/cli.md
[docs-dependencies]: https://github.com/fliphub/fliphub/tree/master/docs/dependencies.md
[docs-debugging]: https://github.com/fliphub/fliphub/tree/master/docs/debugging.md
[docs-event-lifecycle]: https://github.com/fliphub/fliphub/tree/master/docs/event-lifecycle.md
[docs-hubs]: https://github.com/fliphub/fliphub/tree/master/docs/hubs.md
[docs-next]: https://github.com/fliphub/fliphub/tree/master/docs/next.md
[docs-operations]: https://github.com/fliphub/fliphub/tree/master/docs/operations.md
[docs-preset-sourcemaps]: https://github.com/fliphub/fliphub/tree/master/docs/preset-sourcemaps.md
[docs-preset-html]: https://github.com/fliphub/fliphub/tree/master/docs/preset-html.md
[docs-preset-default]: https://github.com/fliphub/fliphub/tree/master/docs/preset-default.md




[new-issue-url]: https://github.com/fliphub/fliplog/issues/new
[fliplog-url]: https://www.npmjs.com/package/fliplog
[flipfile-url]: https://www.npmjs.com/package/flipfile


[src-pkg-json]: https://github.com/fliphub/fliphub/tree/master/package.json
[src-params]: https://github.com/fliphub/fliphub/tree/master/src/middleware/defaults.js
[src-fusebox-middleware]: https://github.com/fliphub/fliphub/tree/master/src/middleware/builders/fusebox.js
[src-presets]: https://github.com/fliphub/fliphub/tree/master/src/middleware/presets.js
[src-defaults]: https://github.com/fliphub/fliphub/tree/master/src/middleware/defaults.js

[flow-middleware]: https://github.com/fliphub/fliphub/tree/master/flow/MiddlewareInterface
[flow-app]: https://github.com/fliphub/fliphub/tree/master/flow/MiddlewareInterface



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

[standard-image]: https://img.shields.io/badge/%F0%9F%91%95%20code%20style-standard%2Bes6+-blue.svg
[standard-url]: https://github.com/aretecode/eslint-config-aretecode
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT

[slack-url]: https://now-examples-slackin-mquyzyrecx.now.sh/
[slack-image]: https://now-examples-slackin-mquyzyrecx.now.sh/badge.svg

[com-avoid-symlinks]: @TODO
[com-massive-package-sizes]: @TODO
[gitter-badge]: https://img.shields.io/gitter/room/fliphub/pink.svg
[gitter-url]: https://gitter.im/fliphub/Lobby
