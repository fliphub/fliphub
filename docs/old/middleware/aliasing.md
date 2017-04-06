
### aliasing
- [x] support aliases as obj
- [ ] add babel-module-resolver config to babel-loader-builder
- [ ] add babel-module-resolver config to middleware

[ ] include aliases in include if wanted
  - [x] fuseboxAlias
  - [~] babelAliases
  - [ ] babelWebpackAlias
  - [ ] babel instead of webpack (if it is explicitly set and not fuse)
  - [x] build in aliases to presets
  - [ ] ast that would replace require statements for aliasing? babel?

- [ ] add resolution config so resolve only if needed
- [ ] add resolution customization per alias file and per alias config to resolve aliases from


aliasing can be exceedingly helpful, for example, when
- when there are issues with multiple versions of a package because of npm caching
- when there are multiple versions of a package when different dependencies use different versions and you want to force one version
