const test = require('ava')
const {fosho, log} = require('fosho')
const sleepfor = require('sleepfor')
const timer = require('../')

test('multiple', t => {
  timer.start('eh')
  timer.start('canada')

  sleepfor(100)
  timer.lap('canada')
  timer.stop('eh')
  sleepfor(100)
  timer.lap('canada')

  timer.stop('canada')
  const ms = timer.msTook('canada')
  fosho(ms > 100, t).true()
  // console.log(timer.parsedTook('canada'))

  // timer
  // .stop('canada')
  // .log('eh')
  // .log('canada')
  // .logLaps('canada')
})

test('formats', t => {
  t.plan(3)
  timer.start('eh')
  sleepfor(100)
  timer.stop('eh')

  const microseconds = timer.took('eh')
  const ms = timer.msTook('eh')
  const parsed = timer.parsedTook('eh')
  fosho(microseconds, t).num()
  fosho(ms, t).num()
  fosho(parsed, t).str()
})

test('laps', async t => {
  timer.start('canada')
  let resolve
  const done = new Promise(r => resolve = r)

  const lapper = setInterval(() => {
    console.log('lap')
    timer.lap('canada')
  }, 1000)
  setTimeout(() => {
    console.log('done')
    clearInterval(lapper)
    resolve()
  }, 10000)

  await done
  timer.logLaps('canada')
  fosho(timer.msTook('canada', true), t).isAbove(9000)
})


test('tilNow', t => {
  const now = Date.now()

  // const obj = timer.parse(now)
  sleepfor(1000)
  const diff = timer.tillNow(now)

  fosho(diff.s, t).num()
  fosho(diff.h, t).num()
  fosho(diff.m, t).num()
  fosho(diff.d, t).num()
  t.true(diff.ms >= 1000)
  // fosho(diff.ms, t).between(900, 1100)
  t.pass()
})

test('tillNowSatisfies', t => {
  const now = Date.now()
  sleepfor(1000)
  t.true(timer.tillNowSatisfies(now, {seconds: 1}))
})
