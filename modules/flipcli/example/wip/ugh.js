const inquirer = require('inquirer')
// const autocomplete = require('inquirer-autocomplete-prompt')
// inquirer.registerPrompt('autocomplete', autocomplete)
//
// const steps = [
//   {
//     type: 'checkbox',
//     name: 'presets',
//     message: 'options:',
//     choices: choices.view,
//     default: false,
//   },
// ]
// inquirer.prompt(steps).then(answers => {
//   console.log(answers)
//   // flip.presets.add(answers, ['env', 'clean', 'build', 'test', 'bench'])
// })

inquirer.prompt([
  {
    type: 'checkbox',
    message: 'Conflict on `file.js`: ',
    name: 'overwrite',
    choices: [
      {
        key: 'y',
        name: 'Overwrite',
        value: 'overwrite',
      },
      {
        key: 'a',
        name: 'Overwrite this one and all next',
        value: 'overwrite_all',
      },
      {
        key: 'd',
        name: 'Show diff',
        value: 'diff',
      },
      new inquirer.Separator(),
      {
        key: 'x',
        name: 'Abort',
        value: 'abort',
      },
    ],
  },
]).then((answers) => {
  console.log(JSON.stringify(answers, null, '  '))
})
