let izz = require('izz')
delete izz.arguments
delete require.cache[require.resolve('izz')]
const toarr = require('to-arr')
const flipfile = require('flipfile')

const ucFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1)
Object.keys(izz).forEach((key) => {
  // console.log(key)
  const uc = 'is' + ucFirst(key)
  izz[uc] = izz[key]
  // if (izz[uc]) izz[uc].ucf = true
})
Object.keys(izz).forEach((key) => {
  if (key.includes('is')) {
    const fn = izz[key]
    const aint = key.replace('is', 'aint')
    const not = key.replace('is', 'isNot')
    izz[not] = (arg1, arg2, arg3) => {
      try {
        if (fn(arg1, arg2, arg3)) {
          return false
        }
        return true
      } catch (e) {
        console.log(e)
        return true
      }
    }
    izz[aint] = izz[not]
    izz[aint].aint = true
    izz[not].aint = true
  }
})

// https://www.youtube.com/watch?v=SwSle66O5sU
const OFF = `${~315 >>> 3}@@`
const FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m
const FN_ARG_SPLIT = /,/
const FN_ARG = /^\s*(_?)(\S+?)\1\s*$/
const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
function fnParams(fn) {
  let args = []
  let fnText = fn.toString().replace(STRIP_COMMENTS, '')
  let argDecl = fnText.match(FN_ARGS)
  let r = argDecl[1].split(FN_ARG_SPLIT)

  for (let i = 0; i < r.length; i++) {
    let arg = r[i]
    arg.replace(FN_ARG, (all, underscore, name) => {
      args.push(name)
    })
  }

  return args
}

const propertyDefined = (arg, prop) => {
  return arg[prop] !== undefined || arg.hasOwnProperty(prop)
}

// https://github.com/chaijs/chai/issues/72
izz.properties = (arg, fnArgs) => {
  return !!toarr(fnArgs).map((prop) => propertyDefined(arg, prop)).length
}
izz.hasProps = izz.properties
izz.props = izz.properties

izz.each = (args, fn) => {
  if (typeof fn === 'string') fn = izz[fn]
  return !!args.filter((arg) => fn(arg)).length
}

izz.all = (args, fns = []) => fns.map((fn) => {
  if (typeof fn === 'string') fn = izz[fn]
  if (fnParams(fn).length && Array.isArray(args)) {
    return fn.apply(null, args)
  }
  return fn(args)
})

// const {
//   getFileAndPath,
//   getDirectories,
//   isDir,
//   isFile,
//   isRel,
//   walk,
//   read,
//   write,
//   exists,
//   fileName,
//   isFileOrDir,
// } = flipfile
izz = Object.assign(izz, flipfile, izz)
izz.flipfile = flipfile


module.exports = izz
