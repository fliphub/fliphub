
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
- [👀 see the alias resolve preset code][https://github.com/fliphub/fliphub/blob/master/packages/fliphub/src/presets/PresetAliasResolve.js]
- [👀 see the alias require preset code][https://github.com/fliphub/fliphub/blob/master/packages/fliphub/src/presets/PresetAliasRequire.js]
