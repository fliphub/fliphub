# Neutrino Preset HappyPack
[![NPM version][npm-image]][npm-url] [![NPM downloads][npm-downloads]][npm-url] [![Join Slack][slack-image]][slack-url]

`neutrino-preset-happypack` is Neutrino preset for taking existing loaders and

## Requirements

- Node.js v6.9+
- Neutrino v5

## Installation

`neutrino-preset-happypack` can be installed via the Yarn or npm clients.

#### yarn or npm

```bash
❯ yarn add neutrino-preset-happypack --dev
❯ npm install neutrino-preset-happypack --save-dev
```

## Usage

`neutrino-preset-happypack` can be consumed from the Neutrino API, middleware, or presets. Require this package
and plug it into Neutrino:

```js
const neutrinoPresetHappyPack = require('neutrino-preset-happypack');
neutrino.use(neutrinoPresetHappyPack);
```

[npm-image]: https://img.shields.io/npm/v/neutrino-preset-happypack.svg
[npm-downloads]: https://img.shields.io/npm/dt/neutrino-preset-happypack.svg
[npm-url]: https://npmjs.org/package/neutrino-preset-happypack
[slack-image]: https://neutrino-slack.herokuapp.com/badge.svg
[slack-url]: https://neutrino-slack.herokuapp.com/
