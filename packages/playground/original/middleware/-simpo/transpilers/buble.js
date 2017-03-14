function run() {
  var buble = require('buble')
  var tosource = require('tosource')
  var fs = require('fs')

  var file = '' // input filename
  var fileOut = '' // output filename
  var input = fs.readFileSync(file, {encoding: 'utf8'})
  console.log(input)

  var output = buble.transform(input, {
    // corresponds to --target – if absent, everything will be
    // compiled to ES5
    target: {chrome: 48, firefox: 44},

    // corresponds to --yes (true) and --no (false) – overrides
    // the settings derived from `target`
    transforms: {
      arrow: true,
      modules: false,
      dangerousForOf: false,
    },

    // used for sourcemaps
    file: 'output.js',
    source: 'input.js',

    // custom JSX pragma (see below)
    jsx: 'NotReact.createElement',

    // custom `Object.assign` (used in object spread)
    objectAssign: 'angular.extend',

    // prevent function expressions generated from class methods
    // from being given names – needed to prevent scope leak in IE8
    namedFunctionExpressions: false,
  })

  var input = fs.writeFileSync(fileOut, tosource(output), {encoding: 'utf8'})
}

run()
