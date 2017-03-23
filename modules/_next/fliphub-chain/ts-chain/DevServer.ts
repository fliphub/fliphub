import ChainedMap from './core/ChainedMap'

class DevServer extends ChainedMap {
  constructor(parent: any) {
    super(parent)
    this.extend([
      'clientLogLevel',
      'compress',
      'contentBase',
      'filename',
      'headers',
      'historyApiFallback',
      'host',
      'hot',
      'hotOnly',
      'https',
      'inline',
      'lazy',
      'noInfo',
      'overlay',
      'port',
      'proxy',
      'quiet',
      'setup',
      'stats',
      'watchContentBase',
    ])
  }
}

export {DevServer}
export default DevServer
