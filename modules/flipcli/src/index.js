const {
  ChainedMap,
  ChainedSet,
  log,
  vorpal,
  inquirer,
  orderByKeys,
  toarr,
  flipscript,
  flipcache,
} = require('./deps')
const Program = require('./Program')
const Stepper = require('./Stepper')
const Steps = require('./Steps')
const Question = require('./Question')
const Choice = require('./Choice')
const Core = require('./Core')

Core.flipcache = flipcache
Core.flipscript = flipscript
Core.orderByKeys = orderByKeys
Core.toarr = toarr
Core.vorpal = vorpal
Core.inquirer = inquirer
Core.log = log
Core.Program = Program
Core.Stepper = Stepper
Core.Steps = Steps
Core.Question = Question
Core.Choice = Choice
Core.Core = Core
Core.CLI = Core
Core.cli = Core

module.exports = Core
