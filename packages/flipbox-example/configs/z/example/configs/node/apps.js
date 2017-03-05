var apps = [
  {
    name: 'nodes',
    compile: true,
    exec: true,

    // can easily switch with false
    fusebox: true,
    // fuseboxAlias: true,

    alias: ['moose', 'igloo'],
    presets: ['node'],
    entry: './src/back/index.js',
  },
]

module.exports = apps
