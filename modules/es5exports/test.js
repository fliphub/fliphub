const importTheExport = require('./example')

console.assert(importTheExport.core === true, 'core is exported')
console.assert(importTheExport.one.prop1 === true, 'one is exported')
console.assert(importTheExport.two.prop2 === true, 'two is exported')
console.assert(importTheExport.default === importTheExport, 'default exports everything')
console.log('all assertions pass, good to go')
