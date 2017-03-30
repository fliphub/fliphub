function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
}
function esc(str) {
  return str.replace(/[\\]/g, '\\$&')
}
