# 📒 flipfile

[![NPM version][flipfile-npm-image]][flipfile-npm-url]
[![MIT License][license-image]][license-url]
[![fliphub][gitter-badge]][gitter-url]
[![flipfam][flipfam-image]][flipfam-url]

[flipfile-npm-image]: https://img.shields.io/npm/v/flipfile.svg
[flipfile-npm-url]: https://npmjs.org/package/flipfile
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT
[gitter-badge]: https://img.shields.io/gitter/room/fliphub/pink.svg
[gitter-url]: https://gitter.im/fliphub/Lobby
[flipfam-image]: https://img.shields.io/badge/%F0%9F%8F%97%20%F0%9F%92%A0-flipfam-9659F7.svg
[flipfam-url]: https://www.npmjs.com/package/flipfam

> file helpers for reading, writing, deleting, checking types & existence, extracting metadata, walking, globbing, and more.

## 📦 usage
```bash
yarn add flipfile
npm i flipfile --save
```

```js
const flipfile = require('flipfile')
```


## api (everything is synchronous)

- getFileAndPath `(file: stringPath) => {file: string, dir: string}`
- getDirectories `(src: string, blacklist: Array<string>) => array<string>`
- isDir `(file: stringPath) => boolean`
- isFile `(file: stringPath) => boolean`
- isRel `(file: stringPath) => boolean`
- isFile `(file: stringPath) => boolean`
- read `(dir: stringPath) => string`
- write `(file: stringPath, contents: string) => void` writes to folder, uses mkdir if it does not exist
- exists `(file: stringPath) => boolean`
- fileName `(file: stringPath) => string`
- isFileOrDir `(file: stringPath) => bool`
- walk `(dir: stringPath, {recursive: true}) => Array<string | Array<Array<string>>`
- [mkdirp](https://www.npmjs.com/package/mkdirp)


## size

everything in [#api](#api) is exported in the main entry point, so it can be used as

```js
const {exists, isFile} = require('flipfile')
const file = './index.js'
if (exists(file)) console.log(read(file))
```

or as modular imports for fastest / smallest access

```js
const isRel = require('flipfile/isRel')
const write = require('flipfile/write')

const file = './src'
if (isRel(file)) write(file, 'eh')
```


## convenience

additionally there are 3 files not exported in the index
- they can be used by requiring them by name,
- or if you prefer destructuring, from `flipfile/all`
  - exports everything in [#api](#api) alongside these additional ones
  - exports a flattened `path` module
- [glob](https://www.npmjs.com/package/glob-fs)
  - `require('flipfile/glob')`
- [extra](https://www.npmjs.com/package/fs-extra)
  - `require('flipfile/extra')`
  - @NOTE: everything in `extra` is exported flat as well
- [promise](https://www.npmjs.com/package/fs-promise)     
  - `require('flipfile/glob')`
  - @NOTE: fs-promise is a dependency, so it will check if it's installed and if not, export is an empty object

```js
const {
  extra,    // fs-extra module
  promise,  // fs-promise or empty object
  exists,   // flipfile.exists
  copySync, // flat export from fs-extra
  glob,     // glob-fs
  fs,       // real 'fs'
  resolve,  // flat export from path
  join,     // flat export from path
} = require('flipfile/all')

const out = resolve(__dirname, './out')
const src = resolve(__dirname, './src')
if (exists(src)) {
  glob(src).forEach(fileOrDir => {
    copySync(fileOrDir, join(out, fileOrDir))
  })
}
```





-------

### TODO:

#### chain:

```js
const flipfile = require('flipfile')
flipfile
  .file('./file')
  .isRel()
  .exists()
    .write('contents')
    .del()
    .exists()
```
