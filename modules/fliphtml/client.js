const log = require('fliplog')
const {HTMLs, $} = require('./index')

const htmls = new HTMLs()

htmls
  .add('app1')
    .assets(['assets'])
    .html(['html-files'])
  .add('app2')
    .head({}, [$('link', {}, 'theweb')])
      .script({}, 'eh')
    .body()

log.quick(htmls)
