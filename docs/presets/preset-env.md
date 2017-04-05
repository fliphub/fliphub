# preset-env

## args
```js
this.args = {
  production: {
    uglify: null,
    minify: null,
    defineEnv: JSON.stringify('production'),
    sourceMap: 'hidden',
  },
  development: {
    sourceMap: '#sourcemap',
  },
}
```

#### production

`defineEnv: JSON.stringify('production')`
`minify: PresetMinify`
`uglify: PresetUglify`
`sourceMap: 'hidden'`

#### development

`'sourceMap': '#sourcemap'`
