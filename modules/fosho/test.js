const test = require('ava')
const fosho = require('./')

test.failing('should chain back to fosho from fosho with t', t => {
  const foshod = fosho
    .t(t)
    .fosho([]).arr()
    .fosho({}).obj()
  console.log(foshod)
})
