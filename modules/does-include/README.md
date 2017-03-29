# does include
> pass in a string, or array of strings, to compare to an array of strings

## api
```js
/**
 * @param  {Array<string> | string} haystack
 * @param  {Array<string>} needles
 * @param  {boolean} any
 * @return {boolean}
 */
const doesInclude = require('does-include')

// or can be destructured
const {any, all} = require('does-include')
```

## any (default)
```js
const doesInclude = require('does-include')

// can is in canada, so true.
doesInclude('canada', ['eh', 'can'])
```

## all
```js
const doesInclude = require('does-include')

// last argument is `any` (default true)
// 'canada' and 'can' are both in it, so true
doesInclude('canada', ['canada', 'can'])
```
