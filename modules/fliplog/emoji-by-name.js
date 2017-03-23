const byName = {
  preset: '🍰',
  step: '👣',
}
module.exports = function emoji(name) {
  return byName[name]
}
