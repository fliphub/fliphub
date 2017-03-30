const appRoot = require('app-root-path')
const path = require('path')
const helpers = require('flipbox-helpers/file')
const {mkdirp, isDir} = helpers

// https://github.com/fuse-box/fuse-box/blob/master/src/Config.ts
// const FLIPBOX_ROOT = process.env.FLIPBOX_DIST_ROOT || path.join(__dirname, '../../')
const FLIPBOX_ROOT = process.env.FLIPBOX_DIST_ROOT || path.join(__dirname, '../')
const CLIENT_ROOT = process.env.FLIPBOX_DIST_ROOT || path.join(__dirname, '../../../')
const FLIPBOX_PKG = process.env.FLIPBOX_PKG || require(path.join(FLIPBOX_ROOT, 'package.json'))
const CLIENT_PKG = process.env.CLIENT_PKG || require(path.join(CLIENT_ROOT, 'package.json'))

// https://nodejs.org/api/modules.html#modules_accessing_the_main_module
// https://nodejs.org/api/process.html#process_process_mainmodule
const Config = {
  MAIN: require.main,
  CLIENT_ROOT,
  FLIPBOX_ROOT,
  FLIPBOX_PKG,
  TEMP_FOLDER: path.join(appRoot.path, '.flipbox'),
  FLIPBOX_VERSION: process.env.FLIPBOX_VERSION || FLIPBOX_PKG.version,
  FLIPBOX_NODE_MODULES_DIR: process.env.FLIPBOX_NODE_MODULES_DIR || path.join(appRoot.path, 'node_modules'),
  CLIENT_NODE_MODULES_DIR: process.env.CLIENT_NODE_MODULES || path.join(CLIENT_ROOT, 'node_modules'),
  CLIENT_PKG,
  // FLIPBOX_MODULES: path.join(PROJECT_ROOT, 'modules'),
}
// console.log(appRoot.path)

if (!isDir(Config.TEMP_FOLDER)) mkdirp(Config.TEMP_FOLDER)

module.exports = Config
