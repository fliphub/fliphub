var apps = [
  {
    name: 'canadas',
    compile: true,
    compileEnd: () => require('../../src/canadas/run.js'),
    fusebox: true,
    // fuseboxAlias: true,
    presets: ['node'],
    entry: './src/canadas/index.js',
    outFile: './src/canadas/dist/canadasbundle.js',
  },
]

module.exports = apps
