const DepsExtractor = require('depflip')

const extractor = new DepsExtractor()
extractor.usingGlob('src/*.js')
console.log(extractor.onlyInternal())
