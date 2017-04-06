# ⛓🖥 flipcli

[![NPM version][flipcli-npm-image]][flipcli-npm-url]
[![MIT License][license-image]][license-url]
[![fliphub][gitter-badge]][gitter-url]
[![flipfam][flipfam-image]][flipfam-url]

[flipcli-npm-image]: https://img.shields.io/npm/v/flipcli.svg
[flipcli-npm-url]: https://npmjs.org/package/flipcli
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT
[gitter-badge]: https://img.shields.io/gitter/room/fliphub/pink.svg
[gitter-url]: https://gitter.im/fliphub/Lobby
[flipfam-image]: https://img.shields.io/badge/%F0%9F%8F%97%20%F0%9F%92%A0-flipfam-9659F7.svg
[flipfam-url]: https://www.npmjs.com/package/flipfam

> easy, powerful, interactive, fluent cli.

## full api

extending [vorpal](https://github.com/dthree/vorpal) it comes with all the goodies, nestable interactive command action stories with *~10x* less lines of code than any other lib.

![allthat](https://cloud.githubusercontent.com/assets/4022631/24635847/06b3d836-188b-11e7-9e5c-f3362c8b70ca.gif)

```js
const {CLI, log} = require('flipcli')

CLI.program()
  .command('release')
    .actionPrompt('confirm')
      .type('confirm')
      .message('Are you sure you want to release?')
    .step('env')
      .checkbox('production', true)
      .checkbox('development', false)
    .then((args) => {
      if (args.continue) log.yellow('Good move.').echo()
      else log.bold('Off we go!.').data(args).echo()
    })
  .command('skeleton')
    .alias('seed')
    .alias('scaffold')
    .actionPrompt('is this cool or what?', 'confirm')
  .parse()
  .show()
```

## storytelling

![cli](https://cloud.githubusercontent.com/assets/4022631/24635848/06c91a0c-188b-11e7-9d7b-9c6f1c433d46.gif)

```js
const CLI = require('flipcli')

const easyButton = CLI
  .step('presets', 'checkbox', '[presets message]')
    .checkbox('production', true)
    .checkbox('development', false)
  .step('approved')
    .checkbox('magical', true)
    .checkbox('unicorns', false)
      .child('unicorn babies', 'input')
        .input('so cute!')
        .toSteps()
  .step('confirm or deny?', 'confirm')
    .child('fosho fosho?', 'confirm')
    .toSteps()
  .step('view', 'list')
    .choice('React')
    .choice('Inferno')
    .choice('Vue')
    .choice('Angular')
    .choice('other')
    .step('other', 'input').when(answers => answers.view == 'view.other')

easyButton.run()
```


## extendable

```js
const {
  vorpal,
  inquirer,
  log,

  Program,
  Stepper,
  Steps,
  Question,
  Choice,
  Core,
} = require('flipcli')
```
