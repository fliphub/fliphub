const {ChainedSet, ChainedMap, toarr} = require('./deps')
const Choice = require('./Choice')

module.exports = class Question extends ChainedMap {
  constructor(parent) {
    super(parent)

    this.extend([
      'type',
      // 'confirm',
      // 'input',
      // 'list'


      'name',
      'message',
      'default',
    ])
    this._choices = new ChainedSet(this)
    this.shorthandFactory(['checkbox', 'confirm', 'input', 'list', 'choice'])
  }

  factory(type, names, msg) {
    const choice = new Choice(this).type(type).name(names)
    this.current = choice
    this._choices.add(choice)

    // maybe this is meant to be value. 0.0?
    let message = msg || names
    if (message) return choice.message(message)

    // const {name, value} = parent.entries()
    const parent = this.parent
    const current = parent.current
    if (current && current.has('name')) message = current.get('name')
    // else message = '.' + name
    return choice.message(message)
  }
  // type of choice, child of step...
  // checkboxes() { this.current.concat() }
  checkbox(name, checked = false) {
    this.factory('checkbox', name).checked(checked)
    return this
  }
  confirm(name, msg) {
    this.factory('confirm', name, msg)
    return this
  }
  input(name, msg) {
    this.factory('input', name, msg)
    return this
  }
  list(name, msg) {
    this.factory('list', name, msg)
    return this
  }
  choice(name, msg) {
    this.factory(null, name, msg)
    return this
  }

  shorthand(list, arg, fn) {
    toarr(list).forEach(data => this[fn](data, arg))
    return this
  }
  shorthandFactory(methods) {
    methods.forEach(method =>
      this[method + 's'] = (arg1, arg2) =>
        this.shorthand(arg1, arg2, method))
    return this
  }

  // child(conditional) {
  //   // this.current.when
  //   return this
  // }

  toConfig() {
    return Object.assign(this.entries(), {
      choices: this._choices.values().map(choice => choice.toConfig()),
    })
  }

  when(fn) {
    fn = fn.bind(this, this.parent.answers)
    fn.NAME = 'QUESTION-WHEN'
    // log.data(this.parent).bold('QUESTION-WHEN').echo()

    return this.set('when', fn)
  }

  // @TODO: --- need more thought ---
  // list() {}
  // expand() {}
  // ---
  // editor() {}
  // password() {}
  // ---
  // autocompletion() {}
}
