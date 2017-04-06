## 🏹 aliasing

### problems
  - relatively importing files is a major pain `../../../../../utils`
  - when refactoring, relative imports requires updating all files affected
  - manually resolving paths to root
    - bloats the code  
    - adds knowledge about the structure to files that should not need it, such as presentation layer / ui components
  - [multiple versions of any npm packages][shrinkwrap]   
    - [multiple react refs][react-refs-error] when multiple versions of react are loaded
    - dependencies have different versions of the same dependency
    - servers such as heroku keep caches where there are multiple versions

### solutions
  - using aliases, you can force a single version of a dependency
  - write your aliases relatively to your [home](#home)

### 🔗 resources
- [🗼 babel aliases][babel-module-resolver]
- [🕸 webpack aliases][webpack-alias]
- [🗞️ rollup aliases][rollup-alias]
- [💣 fusebox aliases][fusebox-alias]
- [👀 see the alias resolve preset code][src-alias-resolve]
- [👀 see the alias require preset code][src-alias-require]


[src-alias-resolve]: https://github.com/fliphub/fliphub/blob/master/packages/fliphub/src/presets/PresetAliasResolve.js]
[src-alias-require]: https://github.com/fliphub/fliphub/blob/master/packages/fliphub/src/presets/PresetAliasRequire.js
[react-refs-error]: https://facebook.github.io/react/docs/error-decoder.html?invariant=119
[shrinkwrap]: https://docs.npmjs.com/cli/shrinkwrap
[rollup-alias]: https://github.com/rollup/rollup-plugin-alias
[fliphub-alias]: https://www.npmjs.com/package/fliphub-alias
[fliphub-resolve]: https://www.npmjs.com/package/fliphub-resolve
[mono-root]: https://www.npmjs.com/package/mono-root
[docs-alias]: https://github.com/fliphub/fliphub/tree/master/docs/cli.md
[webpack-alias]: https://webpack.js.org/configuration/resolve/
[webpack-root]: https://webpack.js.org/guides/migrating/#resolve-root-resolve-fallback-resolve-modulesdirectories
[fusebox-alias]: http://fuse-box.org/#alias
[babel-module-resolver]: https://github.com/tleunen/babel-plugin-module-resolver
