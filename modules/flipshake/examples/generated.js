// example generated
// should also export other values like map by name
module.exports = function shake(query) {
  const required = {}
  if (query === 'name1,name2,name3') {
    required[name1] = require('file1')
    required[name2] = require('file2')
    required[name3] = require('file3')
  }
}
