const deepReplaceProp = require('./delProp')
const deepReplaceMatch = require('./match')
const del = require('./del')

const exportee = {
  del,
  match: deepReplaceMatch,
  deepReplaceMatch,

  delProp: deepReplaceProp,
  deepReplaceProp,
}
module.exports = exportee
