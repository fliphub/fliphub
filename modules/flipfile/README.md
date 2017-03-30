# flipfile

- getFileAndPath `(file: stringPath) => {file: string, path: string}`
- getDirectories: array
- isDir `=> boolean`
- isFile `=> boolean`
- isRel `=> boolean`
- isFile `=> boolean`
- walk: sync, array
- read `(dir: stringPath) => string` synchronously reads a file as a string
- write `(fileLocation: stringPath, contents: string) => void`
- exists `(fileLocation: stringPath) => boolean`
- fileName: string
- isFileOrDir: bool
- mkdirp: void
