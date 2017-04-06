const log = require('fliplog')
const Shake = require('../')

const shaker = Shake
  .init()
  .add('canada', './test/fixtures/src/canada.js')
  .add('eh', './test/fixtures/src/eh.js')
  .stir()

log.highlight().data(shaker).text('shaker').echo()


// .add('./canada.js', 'canada')
// .add('./eh.js', 'eh')
