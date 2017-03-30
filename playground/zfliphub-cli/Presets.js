const {tryJSON, read, write, orderByKeys} = require('./helpers')

let nobuild = false
class Presets {
  constructor(parent) {
    this.parent = parent
    parent.program
      .command('preset [name]')
      .option('-n,--nobuild', ' skip building')
      .action((name, options) => {
        if (options.nobuild) nobuild = true
        this.use(name)
      })
  }
  use(name) {
    const preset = this.read(name)
    const presets = preset.presets
    const scopes = preset.apps
    const envs = presets['build'].map(build => '--' + build)
    if (nobuild) {
      console.log('skipped building :-)')
      delete presets.build
    }
    Object.keys(presets).forEach(cmd => envs.forEach(env => {
      const flags = presets[cmd].map(flag => {
        const f = '--' + flag
        // we only need it once
        if (envs.includes(f)) return ''
        return f
      }).join(' ')
      console.log(cmd, flags)
      this.parent.execSync(`node ${this.parent.flipper} ${cmd} ${scopes} ${flags} ${env}`.replace(/\n/gmi, ''))
    }))
  }
  add(preset, order) {
    let presets = {}
    const {name} = preset
    preset.presets.forEach((preset) => {
      const split = preset.split('.')
      const key = split.shift()
      const flag = split.pop()
      if (!presets[key]) presets[key] = []
      presets[key].push(flag)
    })

    // console.log(presets)
    preset.presets = orderByKeys(presets, order)

    const str = JSON.stringify(preset, null, 2)
    console.log(preset)
    write('./.fliphub/' + name + '.json', str)
  }
  read(name) {
    const preset = tryJSON(read('./.fliphub/' + name + '.json'))
    console.log(preset)
    return preset
  }
  hydrate() {
    return this
  }
}

module.exports = Presets
