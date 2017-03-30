// https://medium.com/@drainingsun/in-search-of-a-good-node-js-hashing-algorithm-8052b6923a3b#.cvgbigkp4
// https://github.com/mscdex/node-xxhash
// https://github.com/hex7c0/nodejs-hash-performance
// var XXHash = require('xxhash')
// const result = XXHash.hash(file, 0xCAFEBABE)

const fs = require('fs')
const path = require('path')
const file = fs.readFileSync(path.resolve(__dirname, 'inferno2.js'))
// var file = new Buffer('eh...............................?')
const murmurhashNative = require('murmurhash-native')
const result = murmurhashNative.murmurHash64(file)
console.log(result)
