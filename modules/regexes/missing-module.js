// Error\:
const expr = `Cannot find module (?:\\'|\\")(.*)(?:\\'|\\")`
module.exports = new RegExp(expr)
