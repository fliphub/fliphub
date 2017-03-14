class SourceMaps {
  constructor() {
    this.use = false
    this.tool = false
    this.file = false
  }

  // defaults() {}

  // remember these may include `[]` for webpack or instructions
  interpret({context}) {
    const {name, bundles} = context
    const result = {}
    if (this.tool === 'hidden') {
      result.fileToMapLink = false
    } else {
      result.fileToMapLink = this.file
    }

    if (this.use === false) {
      result.fileToMapLink = false
    }

    if (this.file) {
      result.file = this.file
    } else if (this.use) {
      result.file = bundles.getBundle().outDir() + name + '.map.js'
    }

    return result
  }
  // name() { return this.tool }
}

module.exports = SourceMaps
