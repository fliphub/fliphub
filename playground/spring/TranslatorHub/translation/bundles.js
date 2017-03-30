const BundleTranslator = {
  name: 'bundle',
  // test: app => app.alias || !app._alias,
  translate: ({app, helpers, context}) => {
    // first let's do in out per bundle
    // then we do scripts, such as copy, clean
    // then ops (maybe not here) compile, run, exec etc

    // will replace arithmetics
    // will need to parse this -.- do this last
    // app.instructions

    // if (Array.isArray(app.entry)) {
    //   console.exit(app.entry)
    //   app.entry = helpers.arrToObj(app.entry)
    // }
    // @TODO: needs multi `out`
    // multi bundle
    if (typeof app.entry === 'object') {
      // key is output file (or chunk)
      // unless there is `output`
      //
      // eg: {demo: eh, canada: moose}
      const keys = Object.keys(app.entry)
      for (let i = 0; i < keys.length; i++) {
        const filename = keys[i]
        const entry = app.entry[filename]
        let bundle = {
          // @TODO:
          // needs to be specific for a bundle...
          // each app really can be a bundle tho...
          exclude: app.exclude || app.externals,
          include: app.include || app.includes,
          filename,
          entry,
          chunk: {
            [filename]: entry,
          },
        }

        if (app.output) {
          bundle.output = app.output
          if (app.output.path) bundle.path = app.output.path
          if (app.output.filename) bundle.filename = app.output.filename
        }
        if (app.filename && app.path) {
          bundle.path = app.path
          bundle.filename = app.filename
        }

        context.emit('bundles.add', bundle)
      }
      context.emit('bundles.addPackage', {
        in: app.entry || app.in,
        out: app.output || app.out,
      })
    }
    // else if (Array.isArray(app.entry)) {
    //
    // }
    // single bundle
    else {
      context.emit('bundles.add', app)
    }
  },
}

// @example:
// entry: './src/front',
// output: {
//   // files are accessible relatively with this path
//   publicPath: '/',
//
//   // name of file and sourcemap
//   filename: '[id].[name].bundle.js',
//   chunkFilename: '[id].[name].bundle.js',
//   sourceMapFilename: '[id][file].map',
// },
//
// entry: './src/front/index.js',
// configOut: './configs/dist/generated/basic.js',
// outFile: './dist/basic.js',
// entry: {
//   'eh': [
//     resolve('./src/game.js'),
//   ],
// },
// output: {
//   path: resolve('./dist'),
//   publicPath: '/',
//   filename: '[name].js',
// },
// externals: {
//   'pixijs': 'pixijs',
// },

module.exports = BundleTranslator
