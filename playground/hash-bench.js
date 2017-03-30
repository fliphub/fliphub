/**
 * MIT License
 *
 * Copyright (c) 2017 Draining Sun
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * SETUP:
 *
 * npm install benchmark beautify-benchmark farmhash metrohash murmurhash-native xxhash
 *
 * RUN:
 *
 * node hash_performance.js
 *
 * OTHER RESULTS:
 *
 * https://medium.com/@drainingsun/in-search-of-a-good-node-js-hashing-algorithm-8052b6923a3b#.jorqhy1o8
 */



const start = new Date().getTime()

global.__base = __dirname + '/'

const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const benchmark = require('benchmark')
const beautifyBenchmark = require('beautify-benchmark')
const farmhash = require('farmhash')
const metrohash = require('metrohash')
const murmurhashNative = require('murmurhash-native')
const xxhash = require('xxhash')

const results = [
  [
    'Data size',
    'sha1',
    'farmHash-hash64',
    'farmHash-fingerprint64',
    'metroHash-64',
    'metroHash-128',
    'murmurHash-64',
    'murmurHash-64x86',
    'murmurHash-64x64',
    'murmurHash-128',
    'murmurHash-128x86',
    'murmurHash-128x64',
    'xxHash-64',
  ],
]

for (let i = 1; i <= 20; i++) {
  const buffer = crypto.randomBytes(Math.pow(2, i))

  const suite = new benchmark.Suite()

  // suite.add('sha1', () => {
  //   crypto
  //           .createHash('sha1')
  //           .update(buffer)
  //           .digest('hex')
  // })

  // suite.add('farmHash-hash64', () => {
  //   farmhash.hash64(buffer)
  // })
  //
  // suite.add('farmHash-fingerprint64', () => {
  //   farmhash.fingerprint64(buffer)
  // })
  //
  // suite.add('metroHash-64', () => {
  //   metrohash.metrohash64(buffer)
  // })
  //
  // suite.add('metroHash-128', () => {
  //   metrohash.metrohash128(buffer)
  // })

  suite.add('murmurHash-64', () => {
    murmurhashNative.murmurHash64(buffer)
  })
  suite.add('md5', () => {
    crypto.createHash('md5').update(buffer).digest('hex')
  })

  // suite.add('murmurHash-64x86', () => {
  //   murmurhashNative.murmurHash64x86(buffer)
  // })
  //
  // suite.add('murmurHash-64x64', () => {
  //   murmurhashNative.murmurHash64x64(buffer)
  // })
  //
  // suite.add('murmurHash-128', () => {
  //   murmurhashNative.murmurHash128(buffer)
  // })
  //
  // suite.add('murmurHash-128x86', () => {
  //   murmurhashNative.murmurHash128x86(buffer)
  // })
  //
  // suite.add('murmurHash-128x64', () => {
  //   murmurhashNative.murmurHash128x64(buffer)
  // })
  //
  // suite.add('xxHash-64', () => {
  //   xxhash.hash64(buffer, 0xCAFEBABE, 'hex')
  // })

  const result = []

  suite
        .on('start', () => {
          result[0] = buffer.length

          console.log(`${result[0]} bytes`)
        })
        .on('cycle', (event) => {
          const index = results[0].indexOf(event.target.name)

          result[index] = event.target.hz

          beautifyBenchmark.add(event.target)
        })
        .on('complete', () => {
          results.push(result.join(','))

          beautifyBenchmark.log()

          console.log('Fastest is: ' + suite.filter('fastest')[0].name)
          console.log('Slowest is: ' + suite.filter('slowest')[0].name)
        })
        .run({async: false})
}

results[0] = results[0].join(',')

fs.writeFile(`${__base}csv/hash_performance.csv`, results.join('\n'), (err) => {
  if (err) {
    throw err
  } else {
    console.log(`\n${path.basename(__filename)} finished in ${(new Date().getTime() - start)} ms.`)
  }
})
