const {execSync} = require('child_process')
const {resolve} = require('path')

const path = resolve(__dirname, '../../.fliphub/flipcaches.json')
console.log(path)
setTimeout(() => {
  try {
    execSync('rm ' + path)
  } catch (e) {
    console.log(e)
  }
}, 10000)
