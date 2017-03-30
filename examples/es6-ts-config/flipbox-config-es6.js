export default {
  // root: './',
  aliasDir: './aliases/',
  apps: [{
    name: 'canadas',
    compile: true,
    fusebox: true,
    presets: ['babel-env'],
    entry: './src/canadas/index.js',
    outFile: './src/canadas/dist/canadasbundle.js',
  }],
}
