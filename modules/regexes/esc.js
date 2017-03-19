module.exports = function escapeReg(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}
