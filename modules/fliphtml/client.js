const HTMLs = require('./index')

const htmls = new HTMLs()

htmls
  .add('app1')
    .assets(['assets'])
    .html(['html-files'])
  .add('app2')
    .gom($)
    .head()
    .body()
  .run()
