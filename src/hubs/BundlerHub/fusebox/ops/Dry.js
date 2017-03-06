const Config = require('../config/config')
class DryOp {
  handle(args) {
    const {api} = args
    const config = Config.parse(args)
    this.api = api
    this.config = config
    console.verbose(args.box)
    console.verbose(api)
  }
}

module.exports = DryOp
