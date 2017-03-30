module.exports = neutrino => {
  // "neutrino": {
  //   "entry": {
  //     "testin": "src/index.js"
  //   }
  // },
  console.log(neutrino)
  process.exit()

  neutrino.config.entry(require('path').resolve(__dirname, 'src/index'))

  // console.log(neutrino)
  const getWebpackOptions = neutrino.getWebpackOptions
  neutrino.getWebpackOptions = () => {
    console.log('toconfig yo')
    const config = neutrino.config.toConfig()
    console.log(config)
    process.exit()

    return config
  }
  // neutrino.config.resolve.extensions.delete('.jsx')
}
