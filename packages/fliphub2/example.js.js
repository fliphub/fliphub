/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// var path = require("path");
// var CommonsChunkPlugin = require("../../lib/optimize/CommonsChunkPlugin");
// module.exports = {
//     entry: {
//         pageA: "./pageA",
//         pageB: "./pageB",
//         pageC: "./pageC",
//         adminPageA: "./adminPageA",
//         adminPageB: "./adminPageB",
//         adminPageC: "./adminPageC",
//     },
//     output: {
//         path: path.join(__dirname, "js"),
//         filename: "[name].js"
//     },
//     plugins: [
//         new CommonsChunkPlugin("admin-commons.js", ["adminPageA", "adminPageB"]),
//         new CommonsChunkPlugin("commons.js", ["pageA", "pageB", "admin-commons.js"], 2),
//         new CommonsChunkPlugin("c-commons.js", ["pageC", "adminPageC"]),
//     ]
// }
// https://robertknight.github.io/posts/webpack-dll-plugins/
// http://stackoverflow.com/questions/39941187/how-do-i-include-npm-modules-in-webpack-dlls
// https://medium.com/@soederpop/webpack-plugins-been-we-been-keepin-on-the-dll-cdfdd6cb8cd7#.a4kfutzam
// http://odetocode.com/blogs/scott/archive/2016/12/01/building-vendor-and-feature-bundles-with-webpack.aspx
// https://github.com/girder/girder/issues/1652
// https://engineering.bitnami.com/2016/11/15/optimizing-your-webpack-builds.html
// https://github.com/mozilla-neutrino/neutrino-dev/blob/master/packages/neutrino-middleware-chunk/index.js
// https://github.com/webpack/webpack/tree/master/examples/dll
// https://gist.github.com/trueter/0e861403e59a9e27a476f3ad7ada1a89
// https://github.com/webpack/webpack/issues/1574
// https://bendyworks.com/blog/optimizing-ci-and-webpack

// neutrino
// onst { CommonsChunkPlugin } = require('webpack').optimize;
// const merge = require('deepmerge');
//
// module.exports = ({ config }, options) => config
//   .plugin('chunk')
//   .use(CommonsChunkPlugin, [
//     merge({ minChunks: Infinity, names: ['vendor', 'manifest'] }, options)
//   ]);
// module.exports = {
//   entry: path.join(APP_DIR, 'vendors.js'),
//   output: {
//     path: BUILD_DIR,
//     filename: 'vendors.js',
//     library: 'vendors',
//   },
//   plugins: [
//     new webpack.DllPlugin({
//       path: path.join(BUILD_DIR, 'vendors-manifest.json'),
//       name: 'vendors',
//     }),
//   ],
//   module: {
//     loaders: [{
//       test: /\.jsx?/,
//       include: APP_DIR,
//       exclude: /node_modules/,
//       loader: 'babel',
//     },
//     ],
//   },
// }



// {
//   name: 'timbucktwo',
//   entry: './src/z/Composite.js',
//   outFile: './dist/out.js',
//   loaders: {
//     'babel': true,
//   },
// },


// @TODO:
// - [ ] alias loader - probably as a preset or chain?
// - [ ] autoresolve as a preset - able to be disabled
// - [ ] defaults: ['names-of-built-in-to-enable'] | bool
//
// - [ ] presets + chains (?+ decorators ?+ ops)
//    and then those are the only 3 I extract from config, simple
//
const apps = [
  {
    name: 'eh',
    // @TODO: add these presets
    presets: ['web', 'babel-react-chrome', 'resolve-alias', 'require-alias'],

    alias: {
      z: './src/z/z.js',
    },

    // how best to deal with the `bundle` config things below?
    // almost everything is a `bundle` config :s

    // if externals is an array, make it into an object
    externals: ['fs', 'jquery', 'inferno'],

    include: {
      'inferno': 'inferno',
    },

    entry: './src/z/Composite.js',

    // https://github.com/webpack/webpack/blob/master/lib/WebpackOptionsDefaulter.js#L35
    output: './dist/out.js',

    // @TODO: this one comes later
    // bundle: {
    //   common: 'name, minchunks?',
    //   split: [
    //     {
    //       name: 'vendor',
    //       include: 'node_modules',
    //     },
    //     {
    //       name: 'admin-page',
    //       include: 'pages/admin.js',
    //     },
    //   ],
    //
    //   // this seems a bit different than entry points
    //   // if it does things such as inferno which may be provide
    //   // and babel-polyfill + inferno which are entry points
    //   // include: [
    //   //   'inferno',
    //   //   'hmr',
    //   //   'babel-polyfill',
    //   // ],
    // },
  },
]

const flip = {}
// const FlipBox = require('./src')
// const flip = FlipBox.base({
//   root: __dirname,
//   output: 'dist/$name',
//   sourceMaps: true,
// })
console.log(flip)


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);