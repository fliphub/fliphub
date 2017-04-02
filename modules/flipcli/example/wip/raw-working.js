const inquirer = require('inquirer')
const fluent = require('../src')

const choices = {
  view: [
    new inquirer.Separator(' = View / Presentation = '),
    {
      name: 'React',
      value: 'react',
    },
    {
      name: 'Inferno',
      value: 'inferno',
    },
    {
      name: 'Vue',
      value: 'vue',
    },
    {
      name: 'Angular',
      value: 'angular',
    },
    {
      // input...
      name: 'Other',
      value: 'other',
    },
  ],

  target: [
    // if browser, ask about inline svg and html, and styles
    new inquirer.Separator(' = Environment? ='),
    {
      name: 'Server',
      value: 'server',
      checked: true,
    },
    {
      name: 'Browser',
      value: 'browser',
      checked: true,
    },
  ],

  env: [
    new inquirer.Separator(' = Production? = '),
    {
      name: 'DefinePlugin',
      checked: true,
    },
    {
      name: 'SourceMaps',
      checked: true,
    },
  ],

  syntax: [
    new inquirer.Separator(' = Syntax? = '),
    {
      name: 'TypeScript',
      value: 'ts',
      checked: true,
    },
    {
      name: 'Babel es6',
      value: 'babel',
    },
    {
      name: 'None - es5',
      value: 'es5',
    },
    {
      name: 'CoffeeScript',
      value: 'cs',
    },
    {
      name: 'Other',
      value: 'other',
    },
  ],
}

const _steps = {
  aliases: {
    type: 'confirm',
    name: 'aliases',
    message: 'Do you use aliases?',
    default: false,
  },
  target: {
    type: 'checkbox',
    name: 'target',
    message: 'Target env(s)?',
    choices: choices.target,
  },
  syntax: {
    type: 'checkbox',
    name: 'syntax',
    message: 'Syntax used?',
    choices: choices.syntax,
  },
  bundles: {
    // then go to their names...
    // and go to alias interactive...
    // and save the data in case they exit...
    // and ask if they want to resume...
    type: 'confirm',
    name: 'bundles',
    message: 'Multiple bundles?',
    default: false,
  },
  targetThenView: [
    {
      type: 'checkbox',
      name: 'target',
      message: 'Env target(s)?',
      choices: choices.target,
    },
    {
      type: 'list',
      name: 'view',
      message: 'View framework?',
      choices: choices.view,
      when: answers => answers.target.includes('browser'),
    },
  ],
}

class Gatherer {
  stepper() {
    const steps = [
      _steps.targetThenView,
      _steps.aliases,
      choices.exporting,
      _steps.bundles,
      _steps.syntax,
    ]
    this.data = {}
    this.steps = steps
    this.indx = 0
    this.thenner()
  }

  thenner() {
    const steps = this.steps[this.indx]
    if (!steps) {
      console.log((this.data))
      return
    }
    if (steps.type === 'checkbox') steps.message += ' (use [spacebar])'
    inquirer.prompt(steps).then(answers => {
      Object.assign(this.data, answers)
      this.indx++
      setTimeout(() => this.thenner(), 1)
    })
  }
}

new Gatherer().stepper()
