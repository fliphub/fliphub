const {ChainedMap, ChainedSet, log} = require('./deps')
const Program = require('./Program')
const Stepper = require('./Stepper')
const Steps = require('./Steps')
const Question = require('./Question')
const Choice = require('./Choice')

/**
 * story (name, is usable for multiple stories to run)
 *  step (name, type = checkboxes)
 *    group
 *      input (type = checkbox, input, confirm)
 *      input
 *    group
 *      input
 *      step (this is where it gets tricky eh)
 *        group
 *          input
 *
 *  step
 *    group...
 *
 */
class Core extends ChainedMap {
  // command
  // option
  // action
  // alias (I can alias flags myself), parse minimist, change vals
  // [ ] /light.js in fam & flags
  //
  // delimiter
  // show

  static program(...args) {
    return Core.init().program(...args)
  }
  static init(parent) {
    return new Core(parent)
  }

  constructor(parent) {
    super(parent).handleParent(parent)

    this.stepper = new Stepper()
    this.answers = this.stepper.data
    this.steps = new Steps(this)
  }

  handleParent(parent) {
    if (!this.parent || !this.parent.delimiter) return
    this.delimiter = this.parent.delimiter.bind(this.parent)
    this.parse = this.parent.parse.bind(this.parent)
    this.show = this.parent.show.bind(this.parent)
    this.command = this.parent.command.bind(this.parent)
    this.alias = this.parent.alias.bind(this.parent)
    this.action = this.parent.action.bind(this.parent)
  }

  program(...args) {
    return new Program(this).program(...args)
  }

  /**
   * @return {Promise}
   */
  run() {
    const steps = this.toConfig().steps
    this.thenner = this.stepper.start(steps)
    if (this.thenCb) this.thenner.then(this.thenCb)
    return this.thenner
  }

  then(cb) {
    this.thenCb = cb
    return this
  }


  // story() {}

  // but it is optional :s
  // group is section / QYUESTIONS...
  // group() {}

  // goToStep
  // getStep

  // steps() {}

  decorateCurrent() {
    this.current.step = this.step.bind(this)
    // this.current.confirm = this.confirm.bind(this)
    // this.current.input = this.input.bind(this)
    // this.current.list = this.list.bind(this)
    // this.current.stepChild = this.stepChild.bind(this)
    this.current.stepChild = this.stepChild.bind(this.current)
    this.current.child = this.child.bind(this)
    this.current.then = this.then.bind(this)

    if (this.parent && this.parent.delimiter) {
      this.current.delimiter = this.parent.delimiter.bind(this.parent)
      this.current.parse = this.parent.parse.bind(this.parent)
      this.current.show = this.parent.show.bind(this.parent)
      this.current.command = this.parent.command.bind(this.parent)
    }
  }

  // is PROMPT/CHOICE
  step(name, type = 'checkbox', msg = null) {
    if (msg === null) msg = name
    this.current = new Question(this).name(name).type(type).message(msg)
    this.decorateCurrent()
    this.steps.add(this.current)
    return this.current
  }
  // checkbox(name, msg) { return this.step(name, msg, 'checkbox') }
  // confirm(name, msg) { return this.step(name, msg, 'confirm') }
  // input(name, msg) { return this.step(name, msg, 'input') }
  // list(name, msg) { return this.step(name, msg, 'list') }

  // @TODO: pass in condition (when) here optionally
  child(name, type, msg) {
    const current = new StepChild(this)

    // improve... maybe need to loop... only 2 levels
    // store ref
    // // .data.values().pop()
    const parent = this.current.get('name')
    let currentChoice = this.current
    if (currentChoice.current) currentChoice = currentChoice.current
    currentChoice = currentChoice.get('name')
    const step = current.step(name, type, msg)
    step.when((answers) => {
      // parent.childName
      let key = parent + '.' + currentChoice
      // get answer
      let parentAnswer = this.answers[parent]

      let result
      // checkboxes
      if (Array.isArray(parentAnswer)) result = parentAnswer.includes(key)
      // input
      else result = !!parentAnswer[key]

      // fallback
      if (!result) {
        key = parent
        parentAnswer = this.answers[parent]

        // if it was a confirm y/n
        if (parentAnswer === true) result = parentAnswer
        // checkboxes
        else if (Array.isArray(parentAnswer)) result = parentAnswer.includes(key)
        // input?
        else result = parentAnswer[key]
      }

      // console.log({result, answers, parent, key, an: this.answers, parentAnswer})

      return result
    })
    this.steps.add(current)
    return step
  }


  stepChild(name, type = 'list', msg = null) {
    const current = new StepChild(this)
    const parent = this.current.get('name')
    let currentChoice = this.current
    if (currentChoice.current) currentChoice = currentChoice.current
    currentChoice = currentChoice.get('name')
    const step = current.step(name, type, msg)
    step.when((answers) => {
      // parent.childName
      let key = parent + '.' + currentChoice
      // get answer
      let parentAnswer = this.answers[parent]

      let result
      // checkboxes
      if (Array.isArray(parentAnswer)) result = parentAnswer.includes(key)
      // input
      else result = !!parentAnswer[key]

      // fallback
      if (!result) {
        key = parent
        parentAnswer = this.answers[parent]

        // if it was a confirm y/n
        if (parentAnswer === true) result = parentAnswer
        // checkboxes
        else if (Array.isArray(parentAnswer)) result = parentAnswer.includes(key)
        // input?
        else result = parentAnswer[key]
      }
      return result
    })
    this.parent.steps.add(current)
    return step
  }

  toConfig() {
    return this.steps.toConfig()
  }
}


class StepChild extends Core {
  // step(name, type = 'checkbox', msg = null) {
  //   return this.end().step(name, type, msg)
  // }
  toConfig() {
    const steps = this.steps.toConfig().steps
    const first = steps.shift()
    return first
  }
}

Core.StepChild = StepChild

module.exports = Core
