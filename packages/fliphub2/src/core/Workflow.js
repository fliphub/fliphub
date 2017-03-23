// this contains the flipconfig, appconfigs, bundler, bundler configs...
// - [ ] could have some kind of flat mono config
// ```
//   workflow
//     - app
//       - context
//       - config
//     - box
//       - context
//       - config
//     - bundler
//       - api
//       - config
// ```

module.exports = class Workflow {
  constructor(box) {
    this.root = box.root
    this.apps = {
      names: [],
      list: {},
      original: {},
    }
    this.bundler = {
      api: {},
      config: {},
    }
    this.box = {
      context: box,
      config: box.flipConfig,
    }
  }
}
