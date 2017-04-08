// @TODO:
// - [ ] handle parsing cli such as `node eh --canada -- foo bar baz -- --cool io`
// - [ ] should handle aliases in fliphub-alias?
// - [ ] chained options for config, for more optimized checking

const timer = require('fliptime')
const minimist = require('./minimist')

function objToArr(obj) {
  const arr = []
  const keys = Object.keys(obj)
  keys.forEach(key => arr.push(`${key}=${obj[key]}`))
  return obj
}

// https://www.npmjs.com/package/minimist
// https://npmcompare.com/compare/commander,minimist,nomnom,optimist,yargs
// https://github.com/gulpjs/gulp-cli/issues/103
// http://unix.stackexchange.com/questions/11376/what-does-double-dash-mean-also-known-as-bare-double-dash
// https://www.lifewire.com/uses-of-xargs-command-2201091
// http://stackoverflow.com/questions/27690980/how-to-pass-node-v8-args-and-script-args-to-pm2
// https://babeljs.io/docs/usage/cli/#babel-node-usage
// https://medium.freecodecamp.com/writing-command-line-applications-in-go-2bc8c0ace79d
// https://npm.taobao.org/browse/keyword/flags (has flipflags ha)
// https://npm.taobao.org/package/to-flags
// https://github.com/sindresorhus/loud-rejection
class FluentFlags {

  // uppercase lowercase, array
  find(needle) {
    const argv = minimist(process.argv.slice(2))

    // is expensive to do it this way, so should refactor minimist
    // const env = objToArr(process.env)
  }

  /**
   * defaults to process.argv,
   * but can clone it, pass it in, and edit a copy or another array
   *
   * @param  {string} needle
   * @param  {array} [argvScoped=process.argv]
   * @return {any}
   */
  findAndRemove(needle, argvScoped = process.argv) {
    // eslint-disable-next-line
    let foundVal = undefined
    argvScoped.forEach((arg, i) => {
      if (arg.includes(needle)) foundVal = val(arg)
      delete argvScoped[i]
    })
    return foundVal
  }
}

// would want to export as function

module.exports = FluentFlags
