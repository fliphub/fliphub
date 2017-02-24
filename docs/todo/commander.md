## package registry
- [x] add package registry that writes to disk on a command
- [x] then does version comparison with another command which shows which ones have changed
- [x] add package registry
- [x] package registry differ
- [ ] output to packagejson

## scripts
- [ ] then match script building with commander to each package or app
- [ ] and console log the commands
  - [ ] use the env to build commands too o.o
- [ ] write commands to package json for each app
- [ ] then run them for easy resolving!!!
- [ ] commander builder presets? they would like push argv before commander parses them
  - [ ] like
    - [ ] scripting
    - [ ] executing
    - [ ] testing
    - [ ] building
    - [ ] compiling
    - [ ] compiling:dev, compiling:prod
    - [ ] run:dev run:devprod run:prod (have to configure prod running if avail)
  ```js
  // if needed if they are not there
  .addPackageScripts({
    "auto:appname:test:nwb": "script"
  })
  ```

## com
- [x] add a commander
- [ ] commander as part of the package for full lerna alternative
  - [x] commander in example
  - [ ] commander docs
  - [ ] real commander
  - [ ] commander that can be used as an npm package without config aside from cli flags
  - [ ] commander that can be configured in their own commander file

## deployment
- [ ] deployment scripts for heroku
- [ ] deployment scripts for travis
- [ ] deployment scripts for s3
- [ ] plugins for deployment scripts
