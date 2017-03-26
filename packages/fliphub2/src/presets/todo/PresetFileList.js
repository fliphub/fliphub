function FileListPlugin(options) {}

FileListPlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', (compilation, callback) => {
    // Create a header string for the generated file:
    let filelist = 'In this build:\n\n'

    // Loop through all compiled assets,
    // adding a new line item for each filename.
    for (let filename in compilation.assets) {
      filelist += ('- ' + filename + '\n')
    }

    // Insert this list into the Webpack build as a new file asset:
    compilation.assets['filelist.md'] = {
      source() {
        return filelist
      },
      size() {
        return filelist.length
      },
    }

    callback()
  })
}

module.exports = FileListPlugin
