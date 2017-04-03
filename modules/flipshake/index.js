// generate out a file (default to `shakable.js`)
// with metaprogramming so it can be used for dynamic require statements
// conceptually similar to query strings for selecting data you want

// may use qs or something similar for query string parsing, if it is needed
// can just parse super simple `toarr` strings
const flipcache = require('flipcache')
const ChainedSet = require('flipchain/ChainedSet')
const ChainedMap = require('flipchain/ChainedMap')
const {Permutator} = require('flipscript')
const toarr = require('to-arr')

const shakable = flipcache.to('shakable.js').create()

function uniq(value, index, self) {
  return self.indexOf(value) === index
}

class Drink extends ChainedMap {
  constructor(parent) {
    super(parent)
    this.extend(['file'])
  }
  name(name) {
    return this.set('name', name)
  }
  exports(exports) {
    return this.set('exports', exports)
  }
  exposed(exposed) {
    return this.set('exposed', exposed)
  }
}

class Drinks extends ChainedSet {
  // stir() {}
}

// pass in exports
class Shake {
  static init(parent) {
    return new Shake(parent)
  }
  constructor(parent) {
    this.drinks = new Drinks(this)
  }

  add(name, file) {
    const drink = new Drink()

    drink
      .name(name)
      // .exposed(exposed)
      // .exports(exports)
      // may not be helpful if it exports different than what is exposed
      .file(file)

    this.drinks.add(drink)
    return this
  }

  addAll(files) {
    toarr(files).forEach(file => this.add(file))
    return this
  }

  mix(mapped) {
    shakable
      .prepend('module.exports = function shake(query) { \n')
      .append('const required = {} \n')

      // if (query === 'name1,name2,name3') {
      //   required[name1] = require('file1')
      //   required[name2] = require('file2')
      //   required[name3] = require('file3')
      // }
  }

  mixin(names, files) {
    this.whisk(names, files)
    shakable
      .append('  if (query === "' + names + '") {\n')

    names = toarr(names)
    toarr(files)
      .forEach((file, i) => shakable
        .append('    required["' + names[i] + '"]')
        .append(' = require("' + file + '") \n'))

    shakable
      .append('    return required;\n  }\n')

    return this
  }

  whisk(names, files) {
    const flipnames = flipcache
      .to('?' + names + '.js')
      .prepend('module.exports = {\n')

    const nameArr = toarr(names)
    toarr(files)
      .forEach((file, i) => flipnames
        .append('  "' + nameArr[i] + '": ')
        .append('require("' + file + '") \n'))

    flipnames
      .append('}')
      .write()
  }

  stir() {
    const entries = this.drinks.values().map(value => value.entries())
    // console.log({entries})

    const files = entries.map(entry => entry.file)
    const names = entries.map(entry => entry.name)
    // const exposed = entries.map(entry => entry.exposed)

    const opts = {
      separator: ',',
      env: [],
      files: [],

      // dedupe
      mapFn: (arg) => {
        arg = toarr(arg)
          .filter(uniq)
          .map((val, i) => files[i])
          // .join(',')
        return arg
      },
    }

    const scriptCreator = new Permutator(opts)
    scriptCreator.addEnv(names)
    scriptCreator.addFiles(names)
    scriptCreator.addOperations(names)
    const scripts = scriptCreator.run().scripts

    // eslint array-callback-return: 0
    // eslint-disable-next-line
    Object.keys(scripts).map(key => {
      const deduped = toarr(key).filter(uniq).join(',')
      const ref = scripts[key]
      delete scripts[key]
      scripts[deduped] = ref
    })

    this.mix()
    Object.keys(scripts).forEach(key => {
      // console.log(scripts)
      this.mixin(key, scripts[key])
    })

    return shakable
      .append('\n  return required \n}')
      .write()
      .contents
  }
}

// const shaker = Shake.init().addAll('canada,eh').stir()

// class Shaken {}

// could do integration test driven shaking to remove basic code
// class Shaker {}

module.exports = Shake
