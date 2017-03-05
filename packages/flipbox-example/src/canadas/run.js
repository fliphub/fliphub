console.log('------')
var howCanadaWasNamed = require('./dist/canadasbundle.js')

console.log(howCanadaWasNamed)
howCanadaWasNamed.say.default()

// same as ^ if it didn't use package name
// var res = canadaEh.FuseBox.import('./src/canadasbundle/')
// console.log(res)
