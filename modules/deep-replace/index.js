const deepReplaceProp = require('./prop')
const deepReplaceMatch = require('./match')
const del = require('./del')

const exportee = {
  del,
  match: deepReplaceMatch,
  deepReplaceMatch,

  prop: deepReplaceProp,
  deepReplaceProp,
}
module.exports = exportee
