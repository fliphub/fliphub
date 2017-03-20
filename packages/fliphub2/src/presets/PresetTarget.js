// https:// github.com/rollup/rollup-plugin-multi-entry

module.exports = class PresetTarget {
  init() {
    this.target = 'node'
  }

  // ROLLUP BUNDLER NEEDS ITS OWN CHAIN
  // DOES NOT NEED TO BE AN INTENSE CHAIN WHEN WE WANT TO MERGE
  // WE CAN USE `ARRAY` FOR PLUGINS
  // THEN WE CAN REPLACE AND MERGE EASILY
  //
  // WE NEED A WAY TO ENSURE THIS PLUGIN RUNS LAST
  // EITHER `POST` + `PRE`, OR INSERT-AT-INDEX

  toRollup(bundler) {
    const nodeResolve = require('rollup-plugin-node-resolve')
    return {
      pluginIndex: 10,
      plugins: [nodeResolve({
        jsnext: true,
        // main: true,
        // skip: external,
      })],
    }
  }
}
