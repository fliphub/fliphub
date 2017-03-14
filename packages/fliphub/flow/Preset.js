type Args = {
  context: ContextType,
  helpers: HelpersType,
  app: AppType,
}

type PresetClassType = {
  name: String,
  // ...any valid property which needs to be written out here
}

type PresetObjType = {
  stringNameKey: {
    // ...any valid property which needs to be written out here
  }
}


type PresetType = PresetClassType | PresetObjType | Function(Args): any
