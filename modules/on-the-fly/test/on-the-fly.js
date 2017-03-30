const onTheFly = require('../')
// const onTheFly = require('on-the-fly')

onTheFly('config.js', __dirname, 'js.js').then((config) => {
  console.log(config, typeof config)
})

onTheFly('config.ts', __dirname, 'ts.js').then((config) => {
  console.log(config, typeof config)
})
