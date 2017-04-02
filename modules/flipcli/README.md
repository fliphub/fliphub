# flipcli ⛓🖥

> easy, powerful, interactive, fluent cli.


## full api

extending [vorpal](https://github.com/dthree/vorpal) it comes with all the goodies

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
