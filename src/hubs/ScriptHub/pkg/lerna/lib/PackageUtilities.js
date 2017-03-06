"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _FileSystemUtilities = require("./FileSystemUtilities");

var _FileSystemUtilities2 = _interopRequireDefault(_FileSystemUtilities);

var _PackageGraph = require("./PackageGraph");

var _PackageGraph2 = _interopRequireDefault(_PackageGraph);

var _Package = require("./Package");

var _Package2 = _interopRequireDefault(_Package);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _glob = require("glob");

var _minimatch = require("minimatch");

var _minimatch2 = _interopRequireDefault(_minimatch);

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PackageUtilities = function () {
  function PackageUtilities() {
    _classCallCheck(this, PackageUtilities);
  }

  _createClass(PackageUtilities, null, [{
    key: "getGlobalVersion",
    value: function getGlobalVersion(versionPath) {
      if (_FileSystemUtilities2.default.existsSync(versionPath)) {
        return _FileSystemUtilities2.default.readFileSync(versionPath);
      }
    }
  }, {
    key: "getPackagesPath",
    value: function getPackagesPath(rootPath) {
      return _path2.default.join(rootPath, "packages");
    }
  }, {
    key: "getPackagePath",
    value: function getPackagePath(packagesPath, name) {
      return _path2.default.join(packagesPath, name);
    }
  }, {
    key: "getPackageConfigPath",
    value: function getPackageConfigPath(packagesPath, name) {
      return _path2.default.join(PackageUtilities.getPackagePath(packagesPath, name), "package.json");
    }
  }, {
    key: "getPackageConfig",
    value: function getPackageConfig(packagesPath, name) {
      return require(PackageUtilities.getPackageConfigPath(packagesPath, name));
    }
  }, {
    key: "getPackages",
    value: function getPackages(repository) {
      var packages = [];

      repository.packageConfigs.forEach(function (globPath) {

        (0, _glob.sync)(_path2.default.join(repository.rootPath, globPath, "package.json")).map(function (fn) {
          return _path2.default.resolve(fn);
        }).forEach(function (packageConfigPath) {
          var packagePath = _path2.default.dirname(packageConfigPath);

          if (!_FileSystemUtilities2.default.existsSync(packageConfigPath)) {
            return;
          }

          var packageJson = require(packageConfigPath);
          var pkg = new _Package2.default(packageJson, packagePath);

          packages.push(pkg);
        });
      });

      return packages;
    }
  }, {
    key: "getPackageGraph",
    value: function getPackageGraph(packages) {
      var depsOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      return new _PackageGraph2.default(packages, depsOnly);
    }

    /**
    * Takes a list of Packages and returns a list of those same Packages with any Packages
    * they depend on. i.e if packageA depended on packageB
    * `PackageUtilities.addDependencies([packageA], this.packageGraph)`
    * would return [packageA, packageB]
    * @param {!Array.<Package>} packages The packages to include dependencies for.
    * @param {!<PackageGraph>} packageGraph The package graph for the whole repository.
    * @return {Array.<Package>} The packages with any dependencies that were't already included.
    */

  }, {
    key: "addDependencies",
    value: function addDependencies(packages, packageGraph) {
      var dependentPackages = [];
      // the current list of packages we are expanding using breadth-first-search
      var fringe = packages.slice();
      var packageExistsInRepository = function packageExistsInRepository(packageName) {
        return !!packageGraph.get(packageName);
      };
      var packageAlreadyFound = function packageAlreadyFound(packageName) {
        return dependentPackages.some(function (pkg) {
          return pkg.name === packageName;
        });
      };
      var packageInFringe = function packageInFringe(packageName) {
        return fringe.some(function (pkg) {
          return pkg.name === packageName;
        });
      };

      while (fringe.length !== 0) {
        var pkg = fringe.shift();
        var pkgDeps = Object.assign({}, pkg.dependencies, pkg.devDependencies);
        Object.keys(pkgDeps).forEach(function (dep) {
          if (packageExistsInRepository(dep) && !packageAlreadyFound(dep) && !packageInFringe(dep)) {
            fringe.push(packageGraph.get(dep).package);
          }
        });
        dependentPackages.push(pkg);
      }

      return dependentPackages;
    }

    /**
    * Filters a given set of packages and returns all packages that match the scope glob
    * and do not match the ignore glob
    *
    * @param {!Array.<Package>} packages The packages to filter
    * @param {Object} filters The scope and ignore filters.
    * @param {String} filters.scope glob The glob to match the package name against
    * @param {String} filters.ignore glob The glob to filter the package name against
    * @return {Array.<Package>} The packages with a name matching the glob
    */

  }, {
    key: "filterPackages",
    value: function filterPackages(packages, _ref) {
      var scope = _ref.scope,
          ignore = _ref.ignore;

      packages = packages.slice();
      if (scope) {
        packages = PackageUtilities._filterPackages(packages, scope);
      }
      if (ignore) {
        packages = PackageUtilities._filterPackages(packages, ignore, true);
      }
      return packages;
    }

    /**
    * Filters a given set of packages and returns all packages matching the given glob
    *
    * @param {!Array.<Package>} packages The packages to filter
    * @param {String} glob The glob to match the package name against
    * @param {Boolean} negate Negate glob pattern matches
    * @return {Array.<Package>} The packages with a name matching the glob
    * @throws in case a given glob would produce an empty list of packages
    */

  }, {
    key: "_filterPackages",
    value: function _filterPackages(packages, glob) {
      var negate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;


      packages = packages.filter(function (pkg) {
        return PackageUtilities.filterPackage(pkg, glob, negate);
      });

      if (!packages.length) {
        throw new Error("No packages found that match '" + glob + "'");
      }
      return packages;
    }
  }, {
    key: "filterPackage",
    value: function filterPackage(pkg, glob) {
      var negate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;


      // If there isn't a filter then we can just return the package.
      if (!glob) return true;

      // Include/exlude with no arguments implies splat.
      // For example: `--hoist` is equivalent to `--hoist=**`.
      // The double star here is to account for scoped packages.
      if (glob === true) glob = "**";

      if (!Array.isArray(glob)) glob = [glob];

      if (negate) {
        return glob.every(function (glob) {
          return !(0, _minimatch2.default)(pkg.name, glob);
        });
      } else {
        return glob.some(function (glob) {
          return (0, _minimatch2.default)(pkg.name, glob);
        });
      }
    }
  }, {
    key: "getFilteredPackage",
    value: function getFilteredPackage(pkg, _ref2) {
      var scope = _ref2.scope,
          ignore = _ref2.ignore;


      return PackageUtilities.filterPackage(pkg, scope) && PackageUtilities.filterPackage(pkg, ignore, true) && pkg;
    }
  }, {
    key: "topologicallyBatchPackages",
    value: function topologicallyBatchPackages(packagesToBatch) {
      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref3$depsOnly = _ref3.depsOnly,
          depsOnly = _ref3$depsOnly === undefined ? false : _ref3$depsOnly,
          _ref3$logger = _ref3.logger,
          logger = _ref3$logger === undefined ? null : _ref3$logger;

      // We're going to be chopping stuff out of this array, so copy it.
      var packages = packagesToBatch.slice();
      var packageGraph = PackageUtilities.getPackageGraph(packages, depsOnly);

      // This maps package names to the number of packages that depend on them.
      // As packages are completed their names will be removed from this object.
      var refCounts = {};
      packages.forEach(function (pkg) {
        return packageGraph.get(pkg.name).dependencies.forEach(function (dep) {
          if (!refCounts[dep]) refCounts[dep] = 0;
          refCounts[dep]++;
        });
      });

      var batches = [];
      while (packages.length) {
        // Get all packages that have no remaining dependencies within the repo
        // that haven't yet been picked.
        var batch = packages.filter(function (pkg) {
          var node = packageGraph.get(pkg.name);
          return node.dependencies.filter(function (dep) {
            return refCounts[dep];
          }).length == 0;
        });

        // If we weren't able to find a package with no remaining dependencies,
        // then we've encountered a cycle in the dependency graph.  Run a
        // single-package batch with the package that has the most dependents.
        if (packages.length && !batch.length) {
          if (logger) {
            logger.warn("Encountered a cycle in the dependency graph. This may cause instability!");
          }

          batch.push(packages.reduce(function (a, b) {
            return (refCounts[a.name] || 0) > (refCounts[b.name] || 0) ? a : b;
          }));
        }

        batches.push(batch);

        batch.forEach(function (pkg) {
          delete refCounts[pkg.name];
          packages.splice(packages.indexOf(pkg), 1);
        });
      }

      return batches;
    }
  }, {
    key: "runParallelBatches",
    value: function runParallelBatches(batches, makeTask, concurrency, callback) {
      _async2.default.series(batches.map(function (batch) {
        return function (cb) {
          _async2.default.parallelLimit(batch.map(makeTask), concurrency, cb);
        };
      }), callback);
    }
  }]);

  return PackageUtilities;
}();

exports.default = PackageUtilities;
module.exports = exports["default"];