// if release
// interactive lerna-type tagging
// if name has , then npmlush for each
const {spawnSync} = require('child_process')
const paths = require('../../../paths')
require('../../../lib/log')

// https://github.com/lerna/lerna/tree/master/src
const lerna = require('lerna')
const prompt = require('./lerna/lib/PromptUtilities')
const semver = require('semver')

class Publisher {
  constructor() {
    this.p = new lerna.__commands__.publish()
    this.p.updates = []
  }

  // location: root
  addPackage(name, version, location) {
    // this.p.updates.push({
    //   package: {name, version, location},
    // })
  }

  // https://github.com/lerna/lerna/blob/62a8f2ae0c221c0557a1748def851659d414c381/src/commands/PublishCommand.js#L212
  promptVersion(name, currentVersion) {
    this.p.promptVersion(name, currentVersion, (err, version) => {
      console.exit(version)
    })
  }

  promtReleaseForNames(names) {

  }
  // publishPackagesToNpm
}

const p = new Publisher()
p.addPackage('flipbox', '0.0.1', '../')
p.promptVersion('flipbox', '0.0.1')

// prompt.input('message', {}, (ver) => {
//   console.log('wut', ver)
//   promptv(ver)
//   // const patch = semver.inc(ver, 'patch')
//   // console.exit(patch, ver, arguments)
// })

// PUBLISH
// run publish
// select version (optional flag for version and name, or use current pkgjson)
//
// optional release message (find in lerna?)
// option to publish to github and npm
//
// rename for npm, select a diff version for another
// (like fsbx, and then another for fusebox, fuse-box)
//
// confirm yes no to publish all names if there are multiple names
//
// -----
// later, allow it to update the deps of your other packages -
// which would internally use lerna like it does in bootstrap,
// but without bootstrap

// RESET CLEAN CACHE
// a reset command which does clean for cache and prefs
// and use this for cleaning cache with the cli for fusebox
//
// and fusebox should compare the previous config and the current config
// if it is a different hash, then clear cache!

// VENDORS
// later
// option to uglify vendors and keep normal source non gzipped
// may require scripts for on the fly bundling etc

// PREFS TO FILE
// store things to file
// so you can run the same command as previously
//
// which means I need to make an issue for storing things
// as local json or the like fs in my .flipbox
//
// then you can run `--apps=eh...`
// and then save presets of commands!!!
// (find a package on npm which allows doing this?!)

// PLUGIN
// regex replace plugin for fusebox
// extending the Alias plugin

// publish to github and npm commands
// confirmVersions

// https://github.com/lerna/lerna/blob/925c0a1b5faeab66d221bc9a6d6b51f10b99f185/test/PackageUtilities.js
// const paths = lerna.getPackagesPath('../../../../')
// console.log(paths)

// spawn('npm', ['publish'].concat(names), {
//   stdio: 'inherit',
// })
