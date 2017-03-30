const log = require('fliplog')

module.exports = class Core {

  /**
   * @param {object} config
   */
  constructor(config) {
    this.reset = this.reset.bind(this)
    return this
  }

  /**
   * @param {Hub} hub
   * @return {Core}
   */
  hub(hub) {
    const name = hub.name || Object.keys(this.workflow.hubs).length
    this.workflow.hubs[name] = hub

    log
      .tags('core,hub,add')
      .color('green')
      // .data(hub)
      .text('adding hub ' + name)
      .echo()

    return this
  }

  /**
   * @see Workflow.reset
   */
  reset() {
    if (!this || !this.workflow) return
    const workflow = this.workflow
    workflow.reset()

    Object.keys(this).forEach((key) => delete this[key])
  }
}
