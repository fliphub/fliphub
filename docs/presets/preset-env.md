# 🍰⛰ preset-env

# ❔

### what
uses common configurations for `production` and `development` environments.
- [preset-flags][preset-flags]


## 🐬 args
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

## 🍦 defaults

#### production

`defineEnv: JSON.stringify('production')`
`minify: PresetMinify`
`uglify: PresetUglify`
`sourceMap: 'hidden'`

#### development

`'sourceMap': '#sourcemap'`
