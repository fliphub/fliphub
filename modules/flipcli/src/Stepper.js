const {inquirer, log} = require('./deps')

class Stepper {
  constructor() {
    this.data = {}
  }
  start(steps) {
    // this.data = {}
    this.steps = steps
    this.indx = 0
    this.thenner()
    return new Promise(resolve => {
      this.resolve = resolve
    })
  }

  thenner() {
    const steps = this.steps[this.indx]
    if (!steps) {
      console.log((this.data))
      this.resolve(this.data)
      return
    }
    if (steps.type === 'checkbox') steps.message += ' (use [spacebar])'
    inquirer.prompt(steps).then(answers => {
      Object.assign(this.data, answers)
      this.indx++
      setTimeout(() => this.thenner(), 1)
    }).catch(log.catch)
  }
}

module.exports = Stepper
