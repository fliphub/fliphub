const inquirer = require('inquirer')
const vorpal = require('vorpal')

class Builder {
  constructor(fsbx) {
    this.config = {}
    this.Fluent = fsbx.Fluent
    this.gatherer = new Gatherer()
  }

  stepper() {
    this.gatherer.stepper()
  }
  init() {
    this.gatherer.init()
  }
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
