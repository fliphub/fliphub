const DepsExtractor = require('depflip/depsExtractor')

const extractor = new DepsExtractor()
extractor.usingGlob('src/*.js')
console.log(extractor.onlyInternal())
