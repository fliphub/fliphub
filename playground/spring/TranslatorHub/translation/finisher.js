// TODO:
// things like name and such
// need to use this earlier in the lifecycle for compat with name?
// or have an app factory to do that?
const GeneralTranslator = {
  name: 'finisher',
  translate({app, helpers, context}) {
    const {instructions, name} = app
    const {builder} = context
    context.name = name

    if (instructions) context.builder.config.instructions = instructions
    if (instructions) context.builder.instructions = instructions

    let {
      // use obj
      sourceMaps,
      sourceMap,
      // uglify
      uglify,
    } = app
    if (sourceMap && !sourceMaps) sourceMaps = sourceMap

    if (typeof sourceMaps === 'object') config.sourceMaps(sourceMaps)
    else if (hasAnySourceMaps) {
      builder.sourcemaps.use =
        useSourceMaps || sourceMaps || sourcemaps || context.useSourceMaps

      builder.sourcemaps.tool =
        sourceMapTool || sourcemaptool || sourcemaptype || context.sourceMapsTool
      builder.sourcemaps.file =
        sourceMapFile || sourcemapfile || sourceMapfile || context.sourceMapFile


      // declutter app since we have an obj for it
      delete context.useSourceMaps
      delete context.sourceMapsTool
      delete context.sourceMapFile
    }

    if (uglify && (uglify.sourceMap || uglify.sourcemaps)) {
      builder.sourcemaps.uglify = uglify.sourceMap
    }
  },
}

module.exports = GeneralTranslator
