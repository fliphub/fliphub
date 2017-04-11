const JSONChain = require('json-chain')
const ConfigStore = require('configstore')
const flipfind = require('flipfind')
const File = require('./File')
const Files = require('./Files')
const Core = require('./Core')

Core.File = File
Core.Files = Files
Core.Core = Core
Core.JSONChain = JSONChain
Core.ConfigStore = ConfigStore
Core.FlipFind = flipfind
Core.FlipCache = Core

module.exports = Core
