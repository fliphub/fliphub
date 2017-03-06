const Instructor = require('../config/instructions')
const Config = require('../config/config')

// @NOTE: might have issues if it requires outside of compiling?
class Compiler {
  handle({context, bundle, builder, api}) {
    const config = Config.parse({bundle, builder, context})
    const instance = api.FuseBox.init(config)
    const instructions = Instructor.parse({bundle, builder})
    instance.bundle(instructions)
  }
}

module.exports = Compiler
