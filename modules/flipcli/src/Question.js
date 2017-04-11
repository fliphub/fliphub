const {ChainedSet, ChainedMap, toarr, inquirer} = require('./deps')
const Choice = require('./Choice')

module.exports = class Question extends ChainedMap {

  /**
   * @param {any} parent
   */
  constructor(parent) {
    super(parent)

    this.extend([
      'type',
      'name',
      'message',
      'default',
    ])
    this._choices = new ChainedSet(this)

    this.description = this.message.bind(this)
    // this.checked = this.default.bind(this)

    this.shorthandFactory(['checkbox', 'confirm', 'input', 'list', 'choice'])
  }

  /**
   * @private
   * @since 0.0.6
   * @param {string} type
   * @param {Array<string>} names
   * @param {string} msg
   * @return {Choice}
   */
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

  /**
   * @since 0.0.6
   * @see Question.factory
   * @param {string} name
   * @param {boolean} [checked]
   * @param {string} [msg]
   * @return {Question}
   */
  checkbox(name, checked = false, msg) {
    this.factory('checkbox', name).checked(checked)
    if (msg) this.current.message(msg)
    return this
  }

  /**
   * @since 0.0.6
   * @see Question.factory
   * @param {string} name
   * @param {string} msg
   * @return {Question}
   */
  confirm(name, msg) {
    this.factory('confirm', name, msg)
    return this
  }

  /**
   * @since 0.0.6
   * @see Question.factory
   * @param {string} name
   * @param {string} msg
   * @return {Question}
   */
  input(name, msg) {
    this.factory('input', name, msg)
    return this
  }

  /**
   * @since 0.0.6
   * @see Question.factory
   * @param {string} name
   * @param {string} msg
   * @return {Question}
   */
  list(name, msg) {
    this.factory('list', name, msg)
    return this
  }

  /**
   * @since 0.0.6
   * @see Question.factory
   * @param {string} name
   * @param {string} msg
   * @return {Question}
   */
  choice(name, msg) {
    this.factory(null, name, msg)
    return this
  }

  /**
   * @since 0.0.8
   * @param {string} [msg]
   * @return {Question}
   */
  separator(msg = '===') {
    const separator = {
      toConfig() {
        return new inquirer.Separator(msg)
      },
    }
    this._choices.add(separator)
    return this
  }

  /**
   * @see Question.constructor
   * @param {Array<string>} list
   * @param {any} arg
   * @param {Function} fn
   * @return {Question}
   */
  shorthand(list, arg, fn) {
    toarr(list).forEach(data => this[fn](data, arg))
    return this
  }

  /**
   * @description take single methods, add as multi methods
   * @example separator -> separators
   * @param  {[type]} methods [description]
   * @return {[type]}         [description]
   */
  shorthandFactory(methods) {
    methods.forEach(method =>
      this[method + 's'] = (arg1, arg2) =>
        this.shorthand(arg1, arg2, method))
    return this
  }

  /**
   * @see Question._choices
   * @return {Object}
   */
  toConfig() {
    return Object.assign(this.entries(), {
      choices: this._choices.values().map(choice => choice.toConfig()),
    })
  }

  /**
   * @param {Function} fn
   * @return {Question}
   */
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

  // child(conditional) {
  //   // this.current.when
  //   return this
  // }
}
