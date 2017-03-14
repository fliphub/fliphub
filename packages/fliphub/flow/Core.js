const PathMasterSchema = {
  in: String,
  out: {
    config: String,
  },
}
const BundleContextSchema = {
  pm: PathMasterSchema,
}
const AppSchema = {
  bundles: [BundleContext],
}
