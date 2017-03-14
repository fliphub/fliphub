// 1)
// this can be used by passing in COMPILE=true
// to compile with webpack on nodejs
//
// 2)
// or it can be used by webpack
// to pass in the name of your webpack preconfigured package
// and the module exports is the decorated webpack config
// mediator() {
//   if (!this.builtApps) this.build()
//   var exportee = this.builtApps
//
//   // if it is webpack cli,
//   if (AppsBuilder.isWebpackCli) {
//     if (this.builtApps && this.builtApps[0]) {
//       exportee = this.builtApps[0].webpack
//     }
//   }
//   if (this.builtApps && this.builtApps[0]) {
//     exportee = this.builtApps[0].webpack
//   }
//
//   return exportee
// }
