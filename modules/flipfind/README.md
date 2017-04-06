# 🔎 🎯 flipfind

> find and resolve files automatically
> searches nearby paths in an optimized order

[![NPM version][flipfind-npm-image]][flipfind-npm-url]
[![MIT License][license-image]][license-url]
[![fliphub][gitter-badge]][gitter-url]
[![flipfam][flipfam-image]][flipfam-url]

[flipfind-npm-image]: https://img.shields.io/npm/v/flipfind.svg
[flipfind-npm-url]: https://npmjs.org/package/flipfind
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT
[gitter-badge]: https://img.shields.io/gitter/room/fliphub/pink.svg
[gitter-url]: https://gitter.im/fliphub/Lobby
[flipfam-image]: https://img.shields.io/badge/%F0%9F%8F%97%20%F0%9F%92%A0-flipfam-9659F7.svg
[flipfam-url]: https://www.npmjs.com/package/flipfam

## usage
```bash
yarn add flipfind
npm i flipfind --save
```

```js
// can be used as a class for chaining and debugging
const {Finder} = require('flipfind')

// or as a function for easier fun
const finder = require('flipfind')
```

## 🔊 debug

![example debug output](https://cloud.githubusercontent.com/assets/4022631/24595185/09917ea2-17e9-11e7-908e-36778c0c5cd2.png)

```js
const found = Finder.file('./src/eh').debug().all().asObj().find()
```


## 👣 steps

to optimize, it will go through the steps in order and `return` once it finds the correct existing path. If [.debug](#debug) is used with `.all`, it will go through every step and output the results so you can see the process.

1. if a file and dir are given, it will attempt to resolve using file + dir
2. if the given file is [absolute](https://nodejs.org/api/path.html#path_path_isabsolute_path), and if it [exists](https://www.npmjs.com/package/flipfile)
3. checks with the [cwd](https://nodejs.org/api/process.html#process_process_cwd)
4. checks with [require.main](https://nodejs.org/api/modules.html#modules_accessing_the_main_module) extracts the [dirname](https://nodejs.org/api/path.html#path_path_dirname_path) from it
5. checks the [app-root-path](https://github.com/inxilpro/node-app-root-path)
6. checks a [glob](https://github.com/isaacs/node-glob) for very near files
  - filters to ensure it [does-include](https://www.npmjs.com/package/does-include) the file and/or dir passed in through options
7. checks with the [mono-root](https://www.npmjs.com/package/mono-root)

## 📘 examples

```js
// will return null
const found = Finder.file('not-real').find()

// without ext
Finder.file('eh').find()
// with ext
Finder.file('eh.js').find()
// can use relative,  
Finder.file('./src/eh').find()
// or shorthand
Finder.file('src/eh').find()
// with dir
Finder.file('eh').dir('test/fixtures').find()

// return an object
const {
  abs,
  file,
  name,
  ext,
  dir,
} = Finder.file('src/eh').asObj().find()

// as function
find('src/eh')
```


### 📝 todo
- add fallback for resolving a file that does not yet exist - currently is `null`, will require an option
- cache the results
