// directory to load all html from...
type DirObj = {
  dir: string,
}

type Asset = {
  // location of asset (path, file, or folder?)
  src: string,

  // where the asset ends up (folder)
  output: string,
}

type HTMLString = string
type SelectorString = string | '#selector'

// html string, array of pages,
type HTMLOpts = HTMLString | Array<HTMLString> | DirObj | SelectorString

type Arg = {
  // location of this html file?
  dir: string,

  // html to use
  html: HTMLOpts,

  // assets to copy
  assets: Array<Asset>
}
type Args = Array<Arg>


// then we want do like `.from()`
// include assets in files??
type From = (gom: GOM, files: Array<string>) => Args
