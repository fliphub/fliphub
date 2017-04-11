# 📦🙃 depflip

[![NPM version][depflip-npm-image]][depflip-npm-url]
[![MIT License][license-image]][license-url]
[![fliphub][gitter-badge]][gitter-url]
[![flipfam][flipfam-image]][flipfam-url]

[depflip-npm-image]: https://img.shields.io/npm/v/depflip.svg
[depflip-npm-url]: https://npmjs.org/package/depflip
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT
[gitter-badge]: https://img.shields.io/gitter/room/fliphub/pink.svg
[gitter-url]: https://gitter.im/fliphub/Lobby
[flipfam-image]: https://img.shields.io/badge/%F0%9F%8F%97%20%F0%9F%92%A0-flipfam-9659F7.svg
[flipfam-url]: https://www.npmjs.com/package/flipfam

> finding, extracting, checking, & installing dependencies

🚧🚧🚧


## 📦 install
```bash
yarn add depflip --dev
npm i depflip --save-dev
```

## 📘 examples
```js
const install = require('depflip')
install(['package-name', 'another-package-name'])
```

## 🖥 cli
```bash
# installs dev dependencies
depflip --dev=true

# extracts dependencies from a glob
# installs external ones
depflip --extract="packages/**/*.js" --install=true
```

[depcheck](https://www.npmjs.com/package/depcheck)
