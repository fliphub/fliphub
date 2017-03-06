const appRoot = require('app-root-path')
const path = require('path')
const helpers = require('./lib/file')
const {mkdirp, isDir} = helpers

// https://github.com/fuse-box/fuse-box/blob/master/src/Config.ts
// const FLIPBOX_ROOT = process.env.FLIPBOX_DIST_ROOT || path.join(__dirname, '../../')
const FLIPBOX_ROOT = process.env.FLIPBOX_DIST_ROOT || path.join(__dirname, '../')
const CLIENT_ROOT = process.env.FLIPBOX_DIST_ROOT || path.join(__dirname, '../../../')
const Config = {
  CLIENT_ROOT,
  FLIPBOX_ROOT,
  FLIPBOX_NODE_MODULES_DIR: process.env.FLIPBOX_NODE_MODULES_DIR || path.join(appRoot.path, 'node_modules'),
  CLIENT_NODE_MODULES_DIR: process.env.CLIENT_NODE_MODULES || path.join(CLIENT_ROOT, 'node_modules'),
  TEMP_FOLDER: path.join(appRoot.path, '.flipbox'),
  FLIPBOX_VERSION: process.env.FLIPBOX_VERSION || require(path.join(FLIPBOX_ROOT, 'package.json')).version,
  // FLIPBOX_MODULES: path.join(PROJECT_ROOT, 'modules'),
}
console.log(appRoot.path)

if (!isDir(Config.TEMP_FOLDER)) mkdirp(Config.TEMP_FOLDER)

module.exports = Config
