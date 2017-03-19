const dest = join(cwd, 'dist', filename)
const bundleConfig = {
  dest,
  format: 'umd',
  moduleName: rollupConfig.moduleName || name,
  globals: Object.assign({moduleGlobal: rollupConfig.moduleGlobal}, rollupConfig.moduleGlobals),
  banner: copyright,
  sourceMap: false,
}

const external = Object.keys(dependencies).filter(n => !bundledDependencies.includes(n))

rollup({
  entry,
  plugins: withNodeResolve(plugins, {
    jsnext: true,
    skip: external,
  }),
  external,
})
.then(({write}) => write(bundleConfig)).catch(console.error)
