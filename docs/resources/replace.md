This is how replace/define plugin works:

Libraries (such as react, inferno, etc) (see [react-readme](https://github.com/facebook/react/blob/c78464f8ea9a5b00ec80252d20a71a1482210e57/scripts/error-codes/dev-expression-with-codes.js#L63), [react-code](https://github.com/facebook/react/blob/c78464f8ea9a5b00ec80252d20a71a1482210e57/scripts/error-codes/dev-expression-with-codes.js#L63), [inferno-code](https://github.com/infernojs/inferno/blob/0203b437ba2b2f8305b7dbf49752c463af3f5146/packages/inferno/src/DOM/rendering.ts#L37)) have conditionals which look like the following: `if (process.env.NODE_ENV === 'development') { /* do debugging */ }`

After it has been run with a config similar to:
`define({
  'process.env.NODE_ENV': JSON.stringify('production'),
})`

the library code will come out as
`if ('production' === 'development') { /* do debugging */ }`

when that code is run through [uglify](https://github.com/mishoo/UglifyJS#api) [or babili](https://www.npmjs.com/package/babel-plugin-minify-dead-code-elimination) with drop-dead-code (`default: true`), it can do static-analysis, and will remove that block, since `'production'` is never `'development'`.

since this is a string replacement, it does not mean that a `process` polyfill is required for the browser, so `console.log(process.env)` will not exist unless it is auto-polyfilled because of that `console.log`, or because you've explicitly added a polyfill that handles that.

the origin of `define` is [C define](https://www.techonthenet.com/c_language/constants/create_define.php)
