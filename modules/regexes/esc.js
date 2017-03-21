module.exports = function escapeReg(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
}
function esc(str) {
  return str.replace(/[\\]/g, '\\$&')
}
