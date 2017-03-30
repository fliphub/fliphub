// handles exclude/include

// @TODO: uses this for ops
const Instructions = {
  // test: ({app}) => app.instructions,
  parse({bundle, builder}) {
    const {pm} = bundle
    let instructions = ''
    if (builder.instructions) return builder.instructions

    // @TODO:
    // - [ ] improve
    // - [ ] check if last is /
    // if it does not have a `.` it might not be a full entry point
    // if (typeof instructions === 'string' && !instructions.includes('.')) {
    //   instructions = instructions + '/index.js'
    // }

    // '>' + bundle.pm.in.entry
    // instructions = '>[' + pm.in.homeToEntry + ']'
    instructions = '>' + pm.in.homeToEntry + ''
    bundle.includeKeys().forEach(includes => instructions += ' +' + includes)
    bundle.excludeKeys().forEach(external => instructions += ' -' + external)
    console.verbose({instructions})
    return instructions
  },
}

module.exports = Instructions
