import ChainedMap from './core/ChainedMap'

// https://webpack.js.org/guides/public-path/#components/sidebar/sidebar.jsx
class Output extends ChainedMap {
  constructor(parent: any) {
    super(parent)
    this.extend([
      'chunkFilename',
      'crossOriginLoading',
      'filename',
      'library',
      'libraryTarget',
      'devtoolFallbackModuleFilenameTemplate',
      'devtoolLineToLine',
      'devtoolModuleFilenameTemplate',
      'hashFunction',
      'hashDigest',
      'hashDigestLength',
      'hashSalt',
      'hotUpdateChunkFilename',
      'hotUpdateFunction',
      'hotUpdateMainFilename',
      'jsonpFunction',
      'path',
      'pathinfo',
      'publicPath',
      'sourceMapFilename',
      'sourcePrefix',
      'strictModuleExceptionHandling',
      'umdNamedDefine',
    ])
  }
}

export {Output}
export default Output
