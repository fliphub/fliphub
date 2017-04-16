let izz = require('izz')
delete izz.arguments
delete require.cache[require.resolve('izz')]
const flipfile = require('flipfile')
const {lcFirst, ucFirst} = require('./helpers')

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


izz.between = function between(arg, min, max) {
  return arg >= min && arg <= max
}

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
