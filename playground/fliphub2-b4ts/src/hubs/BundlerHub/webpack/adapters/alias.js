// is not really needed since it conforms with standard
// absolute paths
const Alias = {
  decorate({context}) {
    context.builder.config.alias = context.alias
  },
}

module.exports = Alias
