# 🏹 fliphub-alias

[![NPM version][fliphub-alias-npm-image]][fliphub-alias-npm-url]
[![MIT License][license-image]][license-url]
[![fliphub][gitter-badge]][gitter-url]
[![flipfam][flipfam-image]][flipfam-url]

[fliphub-alias-npm-image]: https://img.shields.io/npm/v/fliphub-alias.svg
[fliphub-alias-npm-url]: https://npmjs.org/package/fliphub-alias
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT
[gitter-badge]: https://img.shields.io/gitter/room/fliphub/pink.svg
[gitter-url]: https://gitter.im/fliphub/Lobby
[flipfam-image]: https://img.shields.io/badge/%F0%9F%8F%97%20%F0%9F%92%A0-flipfam-9659F7.svg
[flipfam-url]: https://www.npmjs.com/package/flipfam

> require, handle, & resolve aliases for use with any build tool/system/bundler

## 📦 usage

```bash
yarn add fliphub-alias
npm i fliphub-alias --save
```

# 📘 examples

```js
const aliaser = new Aliaser('root-directory', 'directory-of-aliases')
const aliases = aliaser.requireAndHandle(['file-in-directory-of-aliases'])
```

- https://github.com/fliphub/fliphub#-aliasing more on aliasing using fliphub-alias
