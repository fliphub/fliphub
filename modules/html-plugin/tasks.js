const gom = require('gom')

class Tasks {
  use(cb) {
    this._cb = cb
  }

  // call it with our files
  // call the callback set in `.use`
  // handle the returned args
  cb(files) {
    const args = this._cb(gom, files)
    this.handle(args)
  }

  handle(args) {
    args.forEach(arg => {
      const {dir, html, assets} = arg
    })
  }
}

// const copy = []
//
// or merge
// assets.forEach(asset => copy.push({from: asset.from, to: asset.to})


// Copy all files (flatten everything)
// Wrap a html files in h1 tag
// override json file completely
// Sparky.task('example2', () => {
//   return Sparky.src('files/**/**.*')
//     .clean('dist/')
//     .file('*.html', file => {
//       file.read()
//       file.setContent(`<h1>${file.contents}</h1>`)
//     })
//     .file('hello.json', file => {
//       file.json(json => {
//         return {hello: 'json'}
//       })
//     })
//     .dest('dist/$name')
// })
