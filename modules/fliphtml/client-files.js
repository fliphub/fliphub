const HTMLs = require('./index')

const htmls = new HTMLs()

htmls.add('#root', [], () => {})
htmls.setup('#root')

console.log(htmls)

htmls.setup(['./test/app1.html', './test/app2.html'])
console.log(htmls)
