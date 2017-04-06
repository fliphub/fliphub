/**
 * create an index file
 * if flag: write, create export files
 * if flag: del, delete export files
 *
 * @TODO:
 * could also update pkg json for the files...
 */
const camel = require('lodash.camelcase')
const flipflag = require('flipflag')
const flipcache = require('flipcache')
const dependencies = Object.keys(require('./package.json').dependencies)

function uniq(value, index, arr) { return arr.indexOf(value) === index }
const write = flipflag('write')
const del = flipflag('del')

const config = flipcache
  .from('./config.json')
  .dir(__dirname)
  .json()
  .load()
  .setIfNotEmpty('files', [])

const index = flipcache
  .from('./index.js')
  .dir(__dirname)
  .load()
  .setContent('const flips = {}')

dependencies.forEach(dep => {
  index.appendContent(`\nflips["${camel(dep)}"] = require('${dep}')`)
  const filename = `./${dep}.js`
  config.contents.data.files.push(filename)

  const file = flipcache
    .from(filename)
    .setContent(`module.exports = require('${dep}')`)

  if (write) file.write()
  else if (del) file.del()
})

index
  .appendContent('\n\n module.exports = flips')
  .write()

config.contents.data.files = config.contents.data.files.filter(uniq)
config.write()
