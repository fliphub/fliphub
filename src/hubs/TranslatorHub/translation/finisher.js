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

    const {
      // use or obj
      sourcemaps,
      sourceMaps,
      useSourceMaps,
      // tool
      sourcemaptool,
      sourceMapTool,
      sourcemaptype,
      // file
      sourceMapFile,
      sourcemapfile,
      sourceMapfile,
      // uglify
      uglify,
    } = app
    const hasAnySourceMaps = Object.keys({
      sourcemaps, sourceMaps, useSourceMaps,
      sourcemaptool, sourceMapTool, sourcemaptype,
      sourceMapFile, sourcemapfile, sourceMapfile,
    }).length

    if (false && typeof sourcemaps === 'object') builder.sourcemaps = sourcemaps
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
