
// or just filter by if they use alias
const getDirectories = require('./packages/fliphub-helpers/src/file/getDirectories')
const node_modules = getDirectories('./node_modules')

const DepsExtractor = require('./packages/fliphub-helpers/src/deps/depsExtractor')
const extractor = new DepsExtractor()
extractor.usingGlob('packages/**/*.js')

// extractor.usingGlob('packages/playground/**/*.js')
// console.log(extractor.onlyInternal())
// console.log(extractor.onlyExternal())

// const gulp = require('gulp')
// gulp.task('build', function() {
//   return gulp.src(['packages/playground/**/*.js', '!node_modules/**', '!packages/**/node_modules/**', '!packages/**/node_modules/**/*.js'])
//     .pipe(extractor.gulp())
// })
// setTimeout(() => {
//   console.log(extractor.onlyInternal())
//   console.log(extractor.onlyExternal())
// }, 10000)
