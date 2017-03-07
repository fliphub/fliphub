#!/usr/bin/env node

const {resolve, join} = require('path')
const {rollup} = require('rollup')
const buble = require('rollup-plugin-buble')
const replace = require('rollup-plugin-replace')
const uglify = require('rollup-plugin-uglify')
const filesize = require('rollup-plugin-filesize')

const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')

const PROJECT_FOLDER = resolve(__dirname, '..')
const rootPackageJson = require(join(PROJECT_FOLDER, 'package.json'))

const {NODE_ENV} = process.env

const plugins = [
  commonjs({
    include: 'node_modules/**',
  }),
  buble({
    objectAssign: 'Object.assign',
  }),
]

if (NODE_ENV === 'production') {
  plugins.push(
		uglify({
  warnings: false,
  compress: {
    screw_ie8: true,
    dead_code: true,
    unused: true,
    drop_debugger: true, //
    booleans: true, // various optimizations for boolean context, for example !!a ? b : c → a ? b : c
  },
  mangle: {
    screw_ie8: true,
  },
})
	)
  plugins.push(
		replace({
  VERSION: rootPackageJson.version,
  'process.env.NODE_ENV': JSON.stringify('production'),
})
	)
} else if (NODE_ENV === 'browser') {
  plugins.push(
		replace({
  VERSION: rootPackageJson.version,
  'process.env.NODE_ENV': JSON.stringify('development'),
})
	)
} else {
  plugins.push(
		replace({
  VERSION: rootPackageJson.version,
})
	)
}

// Filesize plugin needs to be last to report correct filesizes when minified
plugins.push(filesize())

const COPYRIGHT_YEAR = new Date().getFullYear()

function withNodeResolve(arr, resolveConfig) {
  const newArray = Array.from(arr)
  const index = newArray.findIndex(plugin => plugin.name === 'buble')
  newArray.splice(index, 0, nodeResolve(resolveConfig))
  return newArray
}

const cwd = process.cwd()
const pkgJson = require(join(cwd, 'package.json'))

const {
	name,
	version,
	dependencies = {},
	module: entryFile,
	rollup: rollupConfig = {},
	bundledDependencies = {},
} = pkgJson

const copyright = `
/*!
 * ${name} v${version}
 * (c) ${COPYRIGHT_YEAR} ${rootPackageJson.author.name}'
 * Released under the ${rootPackageJson.license} License.
 */
`

const entry = require.resolve(resolve(cwd, entryFile))
let filename = name
if (NODE_ENV === 'production') {
  filename += '.min.js'
} else if (NODE_ENV === 'development') {
  filename += '.node.js'
} else {
  filename += '.js'
}
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
