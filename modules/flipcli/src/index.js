const {ChainedMap, ChainedSet, log, vorpal, inquirer} = require('./deps')
const Program = require('./Program')
const Stepper = require('./Stepper')
const Steps = require('./Steps')
const Question = require('./Question')
const Choice = require('./Choice')
const Core = require('./Core')

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

module.exports = Core
