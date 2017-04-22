const JSONChain = require('json-chain')
const ConfigStore = require('configstore')
const flipfind = require('flipfind')
const fliphash = require('fliphash')
const File = require('./File')
const Files = require('./Files')
const Core = require('./Core')
const Cache = require('./Cache')

Core.File = File
Core.Files = Files
Core.Core = Core
Core.JSONChain = JSONChain
Core.ConfigStore = ConfigStore
Core.FlipFind = flipfind
Core.FlipCache = Core
Core.fliphash = fliphash
Core.Cache = Cache

module.exports = Core
