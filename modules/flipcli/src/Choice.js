const {ChainedMap, log} = require('./deps')

module.exports = class Choice extends ChainedMap {
  constructor(parent) {
    super(parent)
    this.extend([
      'type',
      'checked',
      'disabled',

      // value should be autoset from name + parent group
      // 'name',
      // 'value',

      'message',

      // use when expanding
      'key',

      // 'when',
      'validate',
    ])
  }

  when(fn) {
    fn = fn.bind(this, this.parent.parent.answers)
    fn.NAME = 'PROMPT-WHEN'
    log.data(this.parent).bold('PROMPT-WHEN').echo()
    return this.set('when', fn)
  }

  value(value) {
    return this.set('value', value)
  }
  name(name) {
    this.set('name', name)
    if (!this.has('value')) this.value(this.parent.get('name') + '.' + name)
    return this
  }


  toConfig() {
    return this.entries()
  }

  // --- type
  // confirm() {}
  // input() {}
  // --- meta
  // disabled() {}
  // checked() {}
  // --- evts
  // when() {}
  // validate() {}
  // ---
}
