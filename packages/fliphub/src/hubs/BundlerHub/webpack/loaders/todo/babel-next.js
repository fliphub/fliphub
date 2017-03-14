// @NOTE: works, but adds not needed overhead
//
// var aliased = Object.values(webpackAppConfig.resolve.alias)
// var filter = /(\.\/src\/.*\.js?)/
// var filtered = aliased.filter(alias => !filter.test(alias))
// var filtered = aliased
// webpackAppConfig.module.loaders[0].include.concat(filtered)





  // @TODO:
  // - [ ] much improve ------=======
  // ! but it does work
  // var path = require('path')
  //
  // var resolve = relativePath => path.resolve(__dirname, relativePath)
  //
  // function addPluginTo(loader) {
  //   console.log('\n\n\n\n\n\n\n', loader)
  //   var plugins = []
  //   plugins.push('transform-decorators-legacy')
  //   plugins.push('transform-function-bind')
  //   // throw new Error('ehhhhhh')
  //   return plugins
  //   // if (!Array.isArray(loader.include)) loader.include = [loader.include]
  //   // loader.include.push(resolve('node_modules/react-component-decorators'))
  // }
  //
  // // @TODO: add a loader builder based on needs of node modules that are not built?
  // webpackAppConfig.module.loaders.forEach((loader, i) => {
  //   if (!loader) {}
  //   else if (loader.loaders && loader.loaders.includes('babel')) {
  //     loader.query.plugins = loader.query.plugins.concat(addPluginTo(loader))
  //     // console.log('!!!!!!!!!!!')
  //     webpackAppConfig.module.loaders[i] = loader
  //     // console.log(loader)
  //     // console.log('!!!!!!!!!!!')
  //   }
  //   else if (loader.loader && loader.loader.includes('babel')) {
  //     console.log('_______________')
  //     loader.query.plugins = loader.query.plugins.concat(addPluginTo(loader))
  //     webpackAppConfig.module.loaders[i] = loader
  //     // console.log(loader)
  //     // console.log('_______________')
  //   } else {
  //     // console.log('~~~~~~~~~~~~``')
  //     console.log(loader)
  //     // console.log('~~~~~~~~~~~~``')
  //     // throw new Error(i)
  //   }
  // })
  // console.log('~~~~~~~~~~~~``')
  // console.log(webpackAppConfig.module.loaders)
  // console.log('~~~~~~~~~~~~``')



  var externals = {
    isexe: '{}',
    Buffer: '{}',
    fs: '{}',
    path: '{}',
    tls: '{}',
    net: '{}',
  }
