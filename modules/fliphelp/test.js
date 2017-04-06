class Belieb {
  strengthen(amount = 0) {
    this.amount = amount + 1
    return this
  }

  i(beliebs = false) {
    this.beliebs = beliebs
    return this
  }

  does() {
    return this.beliebs
  }

  /**
   * @see Belieb.i
   * @see Belieb.beliebs
   * @return {boolean}
   */
  dont() {
    return !!this.beliebs
  }
}

// const belieb = new Belieb()
// const does = belieb.i(false).does()
// console.log(does)

module.exports = Belieb
