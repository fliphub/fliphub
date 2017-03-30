const Config = require('../config/config')
class DryOp {
  handle(args) {
    const {api} = args
    const config = Config.parse(args)
    this.api = api
    this.config = config
  }
}

module.exports = DryOp
