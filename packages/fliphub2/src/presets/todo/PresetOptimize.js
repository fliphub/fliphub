const optJs = {
  name: 'optimizeJs',

  transformBundle(code) {
    return optimizeJs(code)
  },
}

// goes after uglify
// https://github.com/infernojs/inferno/blob/dev/bin/rollup#L115
