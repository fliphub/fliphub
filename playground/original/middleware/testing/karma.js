// var jsdom = require('jsdom').jsdom
// global.document = jsdom('')
// global.window = document.defaultView
// Object.keys(document.defaultView).forEach((property) => {
//   if (typeof global[property] === 'undefined') {
//     global[property] = document.defaultView[property]
//   }
// })
// global.navigator = {
//   userAgent: 'node.js',
// }
//
// console.log('args', process.argv)


// @TODO:
// http://karma-runner.github.io/1.0/config/configuration-file.html
// https://github.com/insin/nwb/blob/master/docs/Configuration.md#browsers-string--arrayplugin
//
// https://github.com/kgoggin/react-es6-webpack-karma-boilerplate
// https://github.com/webpack/docs/issues/58
// http://stackoverflow.com/questions/36194996/reactdom-is-not-defined-with-react-and-webpack
// https://github.com/airbnb/enzyme/issues/302
// https://moduscreate.com/webpack-2-tree-shaking-configuration/
// https://webpack.github.io/docs/library-and-externals.html
//
// https://github.com/webpack/karma-webpack/issues/123
// https://github.com/airbnb/enzyme/blob/master/docs/guides/karma.md#enzyme--karma--webpack
// http://mike-ward.net/2015/09/07/tips-on-setting-up-karma-testing-with-webpack/
// http://stackoverflow.com/questions/38461421/karma-webpack-babel-loader-es6-unexpected-token-import
//
// http://stackoverflow.com/questions/31428916/karma-auto-watch-no-longer-works
// http://stackoverflow.com/questions/21248461/tests-with-karma-not-finishing
// https://github.com/karma-runner/karma/issues/824
// https://github.com/karma-runner/karma/issues/2348
//
// Karma configuration
// http://karma-runner.github.io/1.0/dev/public-api.html
// http://stackoverflow.com/questions/20034256/big-js-app-testing-avoiding-multiple-karma-conf-js-files
// https://github.com/fvanwijk/testRunnerConfig
// https://github.com/karma-runner/gulp-karma
// http://stackoverflow.com/questions/16660670/how-to-test-nodejs-backend-code-with-karma-testacular
module.exports = function(outputPath, helpers) {
  var karmaConfigEh = {
    // testFiles: [
    //   'test/*.spec.js',
    // ],
    testFiles: outputPath,
    frameworks: ['mocha', 'sinon-chai'],
    plugins: [
      require('karma-sinon-chai'),
      require('karma-mocha-reporter'),
      require('karma-notify-reporter'),
      // require('karma-jsdom-launcher'),
    ],
    reporters: ['mocha', 'notify'],
    // browsers: [
    //   'jsdom',
    // ],

    // logLevel: 'debug',
    nocache: true,
    singleRun: false,
    autoWatch: false,
    // noInfo: true,
    // usePolling: true,
  }

  var configSettings = `
    {
      testFiles: ["${outputPath}"],
      frameworks: ['mocha', 'sinon-chai'],
      plugins: [
        require('karma-sinon-chai'),
        require('karma-mocha-reporter'),
        require('karma-notify-reporter'),
        // require('karma-jsdom-launcher'),
      ],
      reporters: ['mocha', 'notify'],
      nocache: true,
      singleRun: false,
      autoWatch: false,
    }
  `
  var configString = `
    module.exports = function(config) {
      console.log('___________f')
      config.set(${configSettings})
    }
  `

  var nwbConfig = `
    module.exports = {
      type: 'react-component',
      // babel: {},
      karma: ${configSettings},
      // webpack: {},
    }
  `
  //   testFiles: ['/Users/james/code/ds/back/webpack-env-builder/example/dist/frontend.js'],
  //   frameworks: ['mocha', 'sinon-chai'],
  //   plugins: [
  //     require('karma-sinon-chai'),
  //     require('karma-mocha-reporter'),
  //     require('karma-notify-reporter'),
  //     require('karma-jsdom-launcher'),
  //     require('karma-verbose-reporter'),
  //   ],
  //   reporters: ['verbose', 'mocha', 'notify'],
  //   browsers: ['phantom'],
  //   nocache: true,
  //   singleRun: false,
  //   autoWatch: false,
  // })



  var configPath = helpers.resolve.resolveTo('./karma.config.js', __dirname)
  helpers.file.write(configPath, configString, helpers)

  var nwbConfigPath = helpers.resolve.resolveTo('./nwb.config.js', __dirname)
  helpers.file.write(nwbConfigPath, nwbConfig, helpers)

  var karma = require('karma')
  // var path = require('path')
  // var cfg = karma.config
  // var karmaConfig = cfg.parseConfig(configPath, {port: 9876})
  var Server = karma.Server
  var server = new Server({port: 9876}, function(exitCode) {
    console.log('Karma has exited with ' + exitCode)
    process.exit(exitCode)
  })
  // server.start()

  var {execSync} = require('child_process')
  var bin = execSync('npm bin', {encoding: 'utf8'})
  console.log(bin)
  var cmd = `${bin}/karma`.replace('\n', '')
  var cmdn = `${bin}/nwb`.replace('\n', '')
  console.log(cmdn)
  console.log(cmdn)


  // karma.conf.js
  // var karmad = execSync(`${cmd} run --conf ${configPath}`, {encoding: 'utf8'})
  var nwbd = execSync(`${cmdn} test --config ${nwbConfigPath}`, {encoding: 'utf8'})
  helpers.log.verbose(nwbd)
  // helpers.log.verbose(karmad)

  // server.start({
  //   configFile: configPath,
  //   singleRun: true,
  // }, (dones) => {
  //   console.log('!!!!!!!!!', dones)
  // })

  // helpers.log.verbose(server)
}
