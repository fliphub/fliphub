const {Sparky} = require('fsbx')
const execa = require('execa')

Sparky.task('babel', () => execa('babel', ['src', '--out-dir', 'public']))
Sparky.task('run', () => execa('node', ['v.js']))

Sparky.task('default', ['babel', 'run'], () => {})
