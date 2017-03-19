
// import from fusebox

type Undecided = 'settings | preferences | flipconfig | presets'

// package: version, deps, flow, author, scripts
export interface PkgMng {}

// on: (event: string, callback: EventCallback) => FlipHubAPI
export interface EventCallback {
  (event: Event): void
}

export interface Hub {
  boxInit?(args: any)
  defaults?(args: any)
  appInit?(args: any)
}

// would be for presets...
// ugh hard to mix object and array...
// could be chainable prop, but not passing in obj... :s

// port?: number,
// alias: Aliases,
// html?: HTMLType,
// builder?: BuilderType,


// --------- interfaces ---------


// --- basics / shared ---


export type BundlerNames = 'webpack' | 'fusebox' | 'rollup' | 'unified'
export type fromBundler = 'from' |& 'fromWebpack' |& 'fromFuseBox' |& 'fromRollup' |& 'fromUnified'
export type toBundler = 'to' |& 'toWebpack' |& 'toFuseBox' |& 'toRollup' |& 'toUnified'

export type PropertiesAndPresetsToInherit = string
export type PresetName = string
export type PresetArrOrObj = Preset[] | {
  (PresetName): Preset
}

export interface FuseBoxConfig {}
export interface RollupConfig {}
export interface WebpackConfig {}
export type BundlerConfig = FuseBoxConfig | RollupConfig | WebpackConfig | any
export type Operations = 'build' | 'devServer' | 'watch' | any


export interface SharedConfig {
  // whether each app inherits the base flip config
  // meaning: inherits the `flips`, and `presets`
  // each app can override this as needed
  inherit?: boolean | Array<PropertiesAndPresetsToInherit> = true

  // @example: ['env', 'defaults-rollup', 'resolve-aliases']
  presets?: PresetArrOrObj

  // @example: from: 'webpack', to: 'rollup'
  flips?: {
    from?: BundlerNames,
    to?: BundlerNames,
  },
}


// --- flipbox ---


export interface FlipConfig implements SharedConfig {
  // all paths are resolved if needed to this root
  //
  // defaults to find the current package
  //
  // if it is a number,
  // it will search that many directories higher for a possible pkgJSON
  root?: string | number = AppRootPath()
}
export interface FlipHubAPI {
  static init: (config: FlipConfig) => FlipHubAPI
  ops: (ops: Operations) => FlipHubAPI

  // filter the apps programatically (`.filter(['canada', 'eh'])`)
  // or by flags --filter=canada,eh
  filter: (whitelist: Array<AppContext.name>) => Array<AppContext.name>

  // builds all bundler configs
  // returns as an array of objects
  // performs no operations by default
  toConfig: () => BundlerConfig[]
}


// --- context ---


export interface AppContext {
  box: FlipHubAPI
  config: AppConfig
  presets: Presets

  // programatically determined
  // by flags and flips from AppConfig
  bundler: Bundler
  toConfig: () => {}

  // calls the operations on this context's BundlerAPI
  (Operations): () => any
}
export interface AppConfig implements SharedConfig  {
  name?: string,
}


// ---- bundlers ----


export interface Bundler {
  // name of the bundler
  name: BundlerNames

  // config being used
  config: BundlerConfig

  // functions for each of the operations
  // called programatically, or using flags
  // on each of the contexts - or all
  (Operations): () => any
}

// properties that can be merged into the BundlerConfig
export type MergeableBundlerConfig = null | BundlerConfig | {}


// --- presets ---


export interface Preset {
  name: string

  // args for the preset to use
  args: {}

  // presets are stateful
  // and can reset their state
  // per context when this is called
  //
  // preset inheritence is managed by flipbox,
  // ot presets so it is no issue
  init?: () => any

  // if user sets args for the preset
  setArgs?: (args: any) => any

  // @example: adding other presets from inside a preset
  // is called before initting each app,
  // so all required presets will be in place
  decorate?: (context: AppContext, config: BundlerConfig) => any

  // lifecycle methods to allow decorating the AppContext,
  // or changing the config
  appInit?: (context: AppContext, config: BundlerConfig) => any

  // allowing decoration of the FlipBoxAPI
  boxInit?: (box: FlipHubAPI) => any

  // @example: `fromWebpack`
  (fromBundler?): (config) => MergeableBundlerConfig

  // @example: `toRollup`
  (toBundler?): (config) => MergeableBundlerConfig
}
export interface Presets {
  // use presets in this context
  useAll: (presets: PresetArrOrObj) => AppContext
  use: (name: string, args?: any) => AppContext

  // add presets that can be used
  add: (name: string | Preset, preset?: Preset) => AppContext
  addAll: (presets: PresetArrOrObj) => AppContext
}


// --- flow ---


// export type Flow =
//   (apps, flipConfig) =>
//   FlipHubAPI.init().FlipConfig(flipConfig, apps)
//
// export type ForEachAppFlow =
//   (app, box) =>
//   new AppContext(app) =>
//   context.appConfig = new AppConfig(app)
//   context.bundlerConfig = new BundlerConfig(app)
//   context.presets = new Presets(context, box)
//
// const eh = ```
//   FlipHub ->
//     -> FlipConfig
//     -> all FlipHub operations
//     -> AppContext
//       -> AppConfig (has the flips and such, inherits from FlipConfig if allowed)
//       -> BundlerConfig
//       -> Bundler
// ```
