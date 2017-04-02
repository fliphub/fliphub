const gom = require('gom')
const {Sparky} = require('fuse-box')

class Tasks {
  use(cb) {
    this._cb = cb
    this.taskArr = []
  }

  // call it with our files
  // call the callback set in `.use`
  // handle the returned args
  cb(files) {
    const args = this._cb(gom, files)
    this.handle(args)
    return this
  }

  copy(assets) {
    // Copy all files (flatten everything)
    // Wrap a html files in h1 tag
    // override json file completely
    this.taskArr.push(Sparky
      .src('files/**/**.*')
      .clean('dist/')
      .dest('dist/$name'))

    return this
  }

  tasks() {
    return Promise.all(this.taskArr)
  }

  handle(args) {
    args.forEach(arg => {
      const {dir, html} = arg
    })
  }
}

module.exports = Tasks

// assets.forEach(asset => copy.push({from: asset.from, to: asset.to})
