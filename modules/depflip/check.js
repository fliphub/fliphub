const depcheck = require('depcheck')

module.exports = (cwd) => depcheck(cwd || process.cwd(), {}, (unused) => {
  console.log(unused, process.cwd(), cwd)
  // console.log(unused.dependencies) // an array containing the unused dependencies
  // console.log(unused.devDependencies) // an array containing the unused devDependencies
  // console.log(unused.missing) // an array containing the dependencies missing in `package.json`
  // console.log(unused.using) // a lookup indicating each dependency is used by which files
  // console.log(unused.invalidFiles) // files that cannot access or parse
  // console.log(unused.invalidDirs) // directories that cannot access
})
