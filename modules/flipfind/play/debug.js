const log = require('fliplog')
const {Finder} = require('../src')

const found = Finder.file('src/eh').debug().all().asObj().find()
console.log(found)
