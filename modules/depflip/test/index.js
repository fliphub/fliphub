const {execSync} = require('child_process')

// doesn't make a difference
// const clearRequireCache = require('clear-require').all

let browserify
try {
  browserify = require('browserify')
} catch (e) {
  execSync('npm i browserify --save', {stdio: 'inherit'})
  // clearRequireCache()
  browserify = require('browserify')
}

console.log(browserify)
