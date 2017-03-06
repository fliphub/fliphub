"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FileSystemUtilities = require("../FileSystemUtilities");

var _FileSystemUtilities2 = _interopRequireDefault(_FileSystemUtilities);

var _NpmUtilities = require("../NpmUtilities");

var _NpmUtilities2 = _interopRequireDefault(_NpmUtilities);

var _PackageUtilities = require("../PackageUtilities");

var _PackageUtilities2 = _interopRequireDefault(_PackageUtilities);

var _Command2 = require("../Command");

var _Command3 = _interopRequireDefault(_Command2);

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

var _find = require("lodash/find");

var _find2 = _interopRequireDefault(_find);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _semver = require("semver");

var _semver2 = _interopRequireDefault(_semver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BootstrapCommand = function (_Command) {
  _inherits(BootstrapCommand, _Command);

  function BootstrapCommand() {
    _classCallCheck(this, BootstrapCommand);

    return _possibleConstructorReturn(this, (BootstrapCommand.__proto__ || Object.getPrototypeOf(BootstrapCommand)).apply(this, arguments));
  }

  _createClass(BootstrapCommand, [{
    key: "initialize",
    value: function initialize(callback) {
      this.configFlags = this.repository.bootstrapConfig;
      this.npmConfig = {
        registry: this.npmRegistry,
        client: this.getOptions().npmClient
      };
      callback(null, true);
    }
  }, {
    key: "execute",
    value: function execute(callback) {
      var _this2 = this;

      this.bootstrapPackages(function (err) {
        if (err) {
          callback(err);
        } else {
          _this2.logger.success("Successfully bootstrapped " + _this2.filteredPackages.length + " packages.");
          callback(null, true);
        }
      });
    }

    /**
     * Bootstrap packages
     * @param {Function} callback
     */

  }, {
    key: "bootstrapPackages",
    value: function bootstrapPackages(callback) {
      var _this3 = this;

      this.logger.info("Bootstrapping " + this.filteredPackages.length + " packages");
      this.batchedPackages = this.toposort ? _PackageUtilities2.default.topologicallyBatchPackages(this.filteredPackages, { logger: this.logger }) : [this.filteredPackages];

      _async2.default.series([
      // preinstall bootstrapped packages
      function (cb) {
        return _this3.preinstallPackages(cb);
      },
      // install external dependencies
      function (cb) {
        return _this3.installExternalDependencies(cb);
      },
      // symlink packages and their binaries
      function (cb) {
        return _this3.symlinkPackages(cb);
      },
      // postinstall bootstrapped packages
      function (cb) {
        return _this3.postinstallPackages(cb);
      },
      // prepublish bootstrapped packages
      function (cb) {
        return _this3.prepublishPackages(cb);
      }], callback);
    }
  }, {
    key: "runScriptInPackages",
    value: function runScriptInPackages(scriptName, callback) {
      var _this4 = this;

      if (!this.filteredPackages.length) {
        return callback(null, true);
      }

      this.progressBar.init(this.filteredPackages.length);
      _PackageUtilities2.default.runParallelBatches(this.batchedPackages, function (pkg) {
        return function (done) {
          pkg.runScript(scriptName, function (err) {
            _this4.progressBar.tick(pkg.name);
            done(err);
          });
        };
      }, this.concurrency, function (err) {
        _this4.progressBar.terminate();
        callback(err);
      });
    }

    /**
     * Run the "preinstall" NPM script in all bootstrapped packages
     * @param callback
     */

  }, {
    key: "preinstallPackages",
    value: function preinstallPackages(callback) {
      this.logger.info("Preinstalling packages");
      this.runScriptInPackages("preinstall", callback);
    }

    /**
     * Run the "postinstall" NPM script in all bootstrapped packages
     * @param callback
     */

  }, {
    key: "postinstallPackages",
    value: function postinstallPackages(callback) {
      this.logger.info("Postinstalling packages");
      this.runScriptInPackages("postinstall", callback);
    }

    /**
     * Run the "prepublish" NPM script in all bootstrapped packages
     * @param callback
     */

  }, {
    key: "prepublishPackages",
    value: function prepublishPackages(callback) {
      this.logger.info("Prepublishing packages");
      this.runScriptInPackages("prepublish", callback);
    }

    /**
     * Create a symlink to a dependency's binary in the node_modules/.bin folder
     * @param {String} src
     * @param {String} dest
     * @param {String} name
     * @param {String|Object} bin
     * @param {Function} callback
     */

  }, {
    key: "createBinaryLink",
    value: function createBinaryLink(src, dest, name, bin, callback) {
      var destBinFolder = _path2.default.join(dest, ".bin");
      // The `bin` in a package.json may be either a string or an object.
      // Normalize to an object.
      var bins = typeof bin === "string" ? _defineProperty({}, name, bin) : bin;
      var srcBinFiles = [];
      var destBinFiles = [];
      Object.keys(bins).forEach(function (name) {
        srcBinFiles.push(_path2.default.join(src, bins[name]));
        destBinFiles.push(_path2.default.join(destBinFolder, name));
      });
      // make sure when have a destination folder (node_modules/.bin)
      var actions = [function (cb) {
        return _FileSystemUtilities2.default.mkdirp(destBinFolder, cb);
      }];
      // symlink each binary
      srcBinFiles.forEach(function (binFile, idx) {
        actions.push(function (cb) {
          return _FileSystemUtilities2.default.symlink(binFile, destBinFiles[idx], "exec", cb);
        });
      });
      _async2.default.series(actions, callback);
    }
  }, {
    key: "hoistedDirectory",
    value: function hoistedDirectory(dependency) {
      return _path2.default.join(this.repository.rootPath, "node_modules", dependency);
    }
  }, {
    key: "hoistedPackageJson",
    value: function hoistedPackageJson(dependency) {
      try {
        return require(_path2.default.join(this.hoistedDirectory(dependency), "package.json"));
      } catch (e) {
        // Pass.
      }
    }

    /**
     * Determine if a dependency installed at the root satifies the requirements of the passed packages
     * This helps to optimize the bootstrap process and skip dependencies that are already installed
     * @param {String} dependency
     * @param {Array.<String>} packages
     */

  }, {
    key: "dependencySatisfiesPackages",
    value: function dependencySatisfiesPackages(dependency, packages) {
      var _ref2 = this.hoistedPackageJson(dependency) || {},
          version = _ref2.version;

      return packages.every(function (pkg) {
        return _semver2.default.satisfies(version, pkg.allDependencies[dependency]);
      });
    }

    /**
     * Given an array of packages, return map of dependencies to install
     * @param {Array.<Package>} packages An array of packages
     * @returns {Object}
     */

  }, {
    key: "getDependenciesToInstall",
    value: function getDependenciesToInstall() {
      var _this5 = this;

      var packages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];


      // find package by name
      var findPackage = function findPackage(name, version) {
        return (0, _find2.default)(_this5.packages, function (pkg) {
          return pkg.name === name && (!version || _semver2.default.satisfies(pkg.version, version));
        });
      };

      var hasPackage = function hasPackage(name, version) {
        return Boolean(findPackage(name, version));
      };

      // Configuration for what packages to hoist may be in lerna.json or it may
      // come in as command line options.

      var _getOptions = this.getOptions(),
          scope = _getOptions.hoist,
          ignore = _getOptions.nohoist;

      // This will contain entries for each hoistable dependency.


      var root = [];

      // This will map packages to lists of unhoistable dependencies
      var leaves = {};

      /**
       * Map of dependencies to install
       * {
       *   <name>: {
       *     versions: {
       *       <version>: <# of dependents>
       *     },
       *     dependents: {
       *       <version>: [<dependent1>, <dependent2>, ...]
       *     }
       *   }
       * }
       *
       * Example:
       *
       * {
       *   react: {
       *     versions: {
       *       "15.x": 3,
       *       "^0.14.0": 1
       *     },
       *     dependents: {
       *       "15.x": ["my-component1", "my-component2", "my-component3"],
       *       "^0.14.0": ["my-component4"],
       *     }
       *   }
       * }
       */
      var depsToInstall = {};

      // get the map of external dependencies to install
      packages.forEach(function (pkg) {

        // for all package dependencies
        Object.keys(pkg.allDependencies)

        // map to package or normalized external dependency
        .map(function (name) {
          return findPackage(name, pkg.allDependencies[name]) || { name: name, version: pkg.allDependencies[name] };
        })

        // match external and version mismatched local packages
        .filter(function (dep) {
          return !hasPackage(dep.name, dep.version) || !pkg.hasMatchingDependency(dep);
        }).forEach(function (_ref3) {
          var name = _ref3.name,
              version = _ref3.version;


          // Get the object for this package, auto-vivifying.
          var dep = depsToInstall[name] || (depsToInstall[name] = {
            versions: {},
            dependents: {}
          });

          // Add this version if it's the first time we've seen it.
          if (!dep.versions[version]) {
            dep.versions[version] = 0;
            dep.dependents[version] = [];
          }

          // Record the dependency on this version.
          dep.versions[version]++;
          dep.dependents[version].push(pkg.name);
        });
      });

      // determine where each dependency will be installed
      Object.keys(depsToInstall).forEach(function (name) {
        var _depsToInstall$name = depsToInstall[name],
            versions = _depsToInstall$name.versions,
            dependents = _depsToInstall$name.dependents;


        var rootVersion = void 0;

        if (scope && _PackageUtilities2.default.getFilteredPackage({ name: name }, { scope: scope, ignore: ignore })) {

          // Get the most common version.
          var commonVersion = Object.keys(versions).reduce(function (a, b) {
            return versions[a] > versions[b] ? a : b;
          });

          // Get the version required by the repo root (if any).
          // If the root doesn't have a dependency on this package then we'll
          // install the most common dependency there.
          rootVersion = _this5.repository.package.allDependencies[name] || commonVersion;

          if (rootVersion !== commonVersion) {
            _this5.logger.warn("The repository root depends on " + name + "@" + rootVersion + ", " + ("which differs from the more common " + name + "@" + commonVersion + "."));
          }

          // Install the best version we can in the repo root.
          // Even if it's already installed there we still need to make sure any
          // binaries are linked to the packages that depend on them.
          root.push({
            name: name,
            dependents: (dependents[rootVersion] || []).map(function (dep) {
              return _this5.packageGraph.get(dep).package;
            }),
            dependency: _this5.repository.hasDependencyInstalled(name, rootVersion) ? null // Don't re-install if it's already there.
            : name + "@" + rootVersion
          });
        }

        // Add less common versions to package installs.
        Object.keys(versions).forEach(function (version) {

          // Only install deps that can't be hoisted in the leaves.
          if (version === rootVersion) return;

          dependents[version].forEach(function (pkg) {

            if (rootVersion) {
              _this5.logger.warn("\"" + pkg + "\" package depends on " + name + "@" + version + ", " + ("which differs from the hoisted " + name + "@" + rootVersion + "."));
            }

            // only install dependency if it's not already installed
            if (!findPackage(pkg).hasDependencyInstalled(name)) {
              (leaves[pkg] || (leaves[pkg] = [])).push(name + "@" + version);
            }
          });
        });
      });
      return { root: root, leaves: leaves };
    }

    /**
     * Install external dependencies for all packages
     * @param {Function} callback
     */

  }, {
    key: "installExternalDependencies",
    value: function installExternalDependencies(callback) {
      var _this6 = this;

      var _getDependenciesToIns = this.getDependenciesToInstall(this.filteredPackages),
          leaves = _getDependenciesToIns.leaves,
          root = _getDependenciesToIns.root;

      var actions = [];

      // Start root install first, if any, since it's likely to take the longest.
      if (Object.keys(root).length) {
        actions.push(function (cb) {
          return _NpmUtilities2.default.installInDir(_this6.repository.rootPath, root.map(function (_ref4) {
            var dependency = _ref4.dependency;
            return dependency;
          }).filter(function (dep) {
            return dep;
          }), _this6.npmConfig, function (err) {
            if (err) return cb(err);

            // Link binaries into dependent packages so npm scripts will have
            // access to them.
            _async2.default.series(root.map(function (_ref5) {
              var name = _ref5.name,
                  dependents = _ref5.dependents;
              return function (cb) {
                var _ref6 = _this6.hoistedPackageJson(name) || {},
                    bin = _ref6.bin;

                if (bin) {
                  _async2.default.series(dependents.map(function (pkg) {
                    return function (cb) {
                      var src = _this6.hoistedDirectory(name);
                      var dest = pkg.nodeModulesLocation;
                      _this6.createBinaryLink(src, dest, name, bin, cb);
                    };
                  }), cb);
                } else {
                  cb();
                }
              };
            }), function (err) {
              _this6.progressBar.tick("Install hoisted");
              cb(err);
            });
          });
        });

        // Remove any hoisted dependencies that may have previously been
        // installed in package directories.
        actions.push(function (cb) {
          _async2.default.series(root.map(function (_ref7) {
            var name = _ref7.name,
                dependents = _ref7.dependents;
            return function (cb) {
              _async2.default.series(dependents.map(function (_ref8) {
                var dir = _ref8.nodeModulesLocation;
                return function (cb) {
                  if (dir === _this6.repository.nodeModulesLocation) return cb();
                  _FileSystemUtilities2.default.rimraf(_path2.default.join(dir, name), cb);
                };
              }), cb);
            };
          }), function (err) {
            _this6.progressBar.tick("Prune hoisted");
            cb(err);
          });
        });
      }

      // Install anything that needs to go into the leaves.
      Object.keys(leaves).map(function (pkgName) {
        return { pkg: _this6.packageGraph.get(pkgName).package, deps: leaves[pkgName] };
      }).forEach(function (_ref9) {
        var pkg = _ref9.pkg,
            deps = _ref9.deps;
        return actions.push(function (cb) {
          return _NpmUtilities2.default.installInDir(pkg.location, deps, _this6.npmConfig, function (err) {
            _this6.progressBar.tick(pkg.name);
            cb(err);
          });
        });
      });

      if (actions.length) {

        this.logger.info("Installing external dependencies");

        this.progressBar.init(actions.length);
      }

      _async2.default.parallelLimit(actions, this.concurrency, function (err) {
        _this6.progressBar.terminate();
        callback(err);
      });
    }

    /**
     * Symlink all packages to the packages/node_modules directory
     * Symlink package binaries to dependent packages' node_modules/.bin directory
     * @param {Function} callback
     */

  }, {
    key: "symlinkPackages",
    value: function symlinkPackages(callback) {
      var _this7 = this;

      this.logger.info("Symlinking packages and binaries");
      this.progressBar.init(this.filteredPackages.length);
      var actions = [];
      this.filteredPackages.forEach(function (filteredPackage) {
        // actions to run for this package
        var packageActions = [];
        Object.keys(filteredPackage.allDependencies)
        // filter out external dependencies and incompatible packages
        .filter(function (dependency) {
          var match = _this7.packageGraph.get(dependency);
          return match && filteredPackage.hasMatchingDependency(match.package);
        }).forEach(function (dependency) {
          // get Package of dependency
          var dependencyPackage = _this7.packageGraph.get(dependency).package;
          // get path to dependency and its scope
          var dependencyLocation = dependencyPackage.location;

          var dependencyPackageJsonLocation = _path2.default.join(dependencyLocation, "package.json");
          // ignore dependencies without a package.json file
          if (!_FileSystemUtilities2.default.existsSync(dependencyPackageJsonLocation)) {
            _this7.logger.error("Unable to find package.json for " + dependency + " dependency of " + filteredPackage.name + ",  " + "Skipping...");
          } else {
            (function () {
              // get the destination directory name of the dependency
              var pkgDependencyLocation = _path2.default.join(filteredPackage.nodeModulesLocation, dependencyPackage.name);
              // check if dependency is already installed
              if (_FileSystemUtilities2.default.existsSync(pkgDependencyLocation)) {
                var isDepSymlink = _FileSystemUtilities2.default.isSymlink(pkgDependencyLocation);
                // installed dependency is a symlink pointing to a different location
                if (isDepSymlink !== false && isDepSymlink !== dependencyLocation) {
                  _this7.logger.warn("Symlink already exists for " + dependency + " dependency of " + filteredPackage.name + ", " + "but links to different location. Replacing with updated symlink...");
                  // installed dependency is not a symlink
                } else if (isDepSymlink === false) {
                  _this7.logger.warn(dependency + " is already installed for " + filteredPackage.name + ". " + "Replacing with symlink...");
                  // remove installed dependency
                  packageActions.push(function (cb) {
                    return _FileSystemUtilities2.default.rimraf(pkgDependencyLocation, cb);
                  });
                }
              }
              // ensure destination path
              packageActions.push(function (cb) {
                return _FileSystemUtilities2.default.mkdirp(pkgDependencyLocation.split(_path2.default.sep).slice(0, -1).join(_path2.default.sep), cb);
              });
              // create package symlink
              packageActions.push(function (cb) {
                return _FileSystemUtilities2.default.symlink(dependencyLocation, pkgDependencyLocation, "junction", cb);
              });
              var dependencyPackageJson = require(dependencyPackageJsonLocation);
              if (dependencyPackageJson.bin) {
                (function () {
                  var destFolder = filteredPackage.nodeModulesLocation;
                  packageActions.push(function (cb) {
                    _this7.createBinaryLink(dependencyLocation, destFolder, dependency, dependencyPackageJson.bin, cb);
                  });
                })();
              }
            })();
          }
        });
        actions.push(function (cb) {
          _async2.default.series(packageActions, function (err) {
            _this7.progressBar.tick(filteredPackage.name);
            cb(err);
          });
        });
      });
      _async2.default.series(actions, function (err) {
        _this7.progressBar.terminate();
        callback(err);
      });
    }
  }]);

  return BootstrapCommand;
}(_Command3.default);

exports.default = BootstrapCommand;
module.exports = exports["default"];