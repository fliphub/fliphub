const FlipCache = require('flipcache')
const {orderByKeys} = require('./deps')

/**
 * @TODO:
 * - [ ] should be configurable
 *       if they want presets to be saved to pkgjson
 *       or to a file that is not gitignored
 *
 * add
 *   makes a config file for presets
 * load
 *   loads an existing presets from the config file
 *   executes it in a subprocess
 *   it should (be able to) reset argv, then re-run program
 */
class Presets {
  use(name) {
    const preset = FlipCache.file(name).json().load()
    const presets = preset.presets
    const scopes = preset.apps

    // @TODO: clean
    const benvs = (presets.build || []).map(build => '--' + build)
    const eenvs = (presets.env || []).filter(env => !benvs.includes('--' + env))
    const envs = benvs.concat(eenvs)

    // delete presets.env

    // @TODO:
    // should be able to use merge with chain
    //
    // should be able to run programs without a double subprogram
    // just edit flags, require program without cache
    //
    Object.keys(presets).forEach(cmd => envs.forEach(env => {
      const flags = presets[cmd].map(flag => {
        const f = '--' + flag
        // we only need it once
        if (envs.includes(f)) return ''
        return f
      }).join(' ')

      // @TODO:
      console.log(cmd, flags)
      if (env) this.parent.defineEnv('NODE_ENV', env.replace('--', ''))

      // @TODO:
      // const hasFlags = this.parent.cmdr.hasOption(cmd, flags)
      // const hasEnv = this.parent.cmdr.hasOption(cmd, env)
      // if (hasFlags && !hasEnv) env = ''
      // if (!hasFlags && hasEnv) flags = ''

      // console.log(this.parent.cmdr.optionsFor())
      this.parent.execSync(`node ${this.parent.flipper} ${cmd} ${scopes} ${flags} ${env}`.replace(/\n/gmi, ''))
    }))
  }

  add(preset, order) {
    let presets = {}
    const {name} = preset

    preset.presets.forEach((presetted) => {
      const split = presetted.split('.')
      const key = split.shift()
      const flag = split.pop()
      if (!presets[key]) presets[key] = []
      presets[key].push(flag)
    })

    preset.presets = orderByKeys(presets, order)

    console.log(preset)
  }
}

module.exports = Presets
