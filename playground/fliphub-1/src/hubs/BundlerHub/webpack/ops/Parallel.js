var run = require('parallel-webpack').run,
  configPath = require.resolve('./webpack.config.js')
run(configPath, {
  watch: false,
  maxRetries: 1,
  stats: true, // defaults to false
  maxConcurrentWorkers: 2, // use 2 workers
})
