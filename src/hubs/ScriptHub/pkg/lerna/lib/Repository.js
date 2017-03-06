"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GitUtilities = require("./GitUtilities");

var _GitUtilities2 = _interopRequireDefault(_GitUtilities);

var _FileSystemUtilities = require("./FileSystemUtilities");

var _FileSystemUtilities2 = _interopRequireDefault(_FileSystemUtilities);

var _PackageUtilities = require("./PackageUtilities");

var _PackageUtilities2 = _interopRequireDefault(_PackageUtilities);

var _Package = require("./Package");

var _Package2 = _interopRequireDefault(_Package);

var _NpmUtilities = require("./NpmUtilities");

var _NpmUtilities2 = _interopRequireDefault(_NpmUtilities);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _logger = require("./logger");

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_PACKAGE_GLOB = "packages/*";

var Repository = function () {
  function Repository() {
    _classCallCheck(this, Repository);

    if (!_GitUtilities2.default.isInitialized()) {
      _logger2.default.info("Initializing Git repository.");
      _GitUtilities2.default.init();
    }

    this.rootPath = _path2.default.resolve(_GitUtilities2.default.getTopLevelDirectory());
    this.lernaJsonLocation = _path2.default.join(this.rootPath, "lerna.json");
    this.packageJsonLocation = _path2.default.join(this.rootPath, "package.json");
    this.packagesLocation = _path2.default.join(this.rootPath, "packages"); // TODO: Kill this.

    // Legacy
    this.versionLocation = _path2.default.join(this.rootPath, "VERSION");

    if (_FileSystemUtilities2.default.existsSync(this.lernaJsonLocation)) {
      this.lernaJson = JSON.parse(_FileSystemUtilities2.default.readFileSync(this.lernaJsonLocation));
    } else {
      // No need to distinguish between missing and empty.
      // This saves us a lot of guards.
      this.lernaJson = {};
    }

    if (_FileSystemUtilities2.default.existsSync(this.packageJsonLocation)) {
      this.packageJson = JSON.parse(_FileSystemUtilities2.default.readFileSync(this.packageJsonLocation));
    }

    this.package = new _Package2.default(this.packageJson, this.rootPath);
  }

  _createClass(Repository, [{
    key: "isIndependent",
    value: function isIndependent() {
      return this.version === "independent";
    }
  }, {
    key: "buildPackageGraph",
    value: function buildPackageGraph() {
      this._packages = _PackageUtilities2.default.getPackages(this);
      this._packageGraph = _PackageUtilities2.default.getPackageGraph(this._packages);
    }
  }, {
    key: "hasDependencyInstalled",
    value: function hasDependencyInstalled(dependency, version) {
      return _NpmUtilities2.default.dependencyIsSatisfied(this.nodeModulesLocation, dependency, version);
    }
  }, {
    key: "lernaVersion",
    get: function get() {
      return this.lernaJson && this.lernaJson.lerna;
    }
  }, {
    key: "version",
    get: function get() {
      return this.lernaJson && this.lernaJson.version;
    }
  }, {
    key: "publishConfig",
    get: function get() {
      return this.lernaJson && this.lernaJson.publishConfig || {};
    }
  }, {
    key: "bootstrapConfig",
    get: function get() {
      return this.lernaJson && this.lernaJson.bootstrapConfig || {};
    }
  }, {
    key: "nodeModulesLocation",
    get: function get() {
      return _path2.default.join(this.rootPath, "node_modules");
    }
  }, {
    key: "packageConfigs",
    get: function get() {
      return (this.lernaJson || {}).packages || [DEFAULT_PACKAGE_GLOB];
    }
  }, {
    key: "packages",
    get: function get() {
      if (!this._packages) {
        this.buildPackageGraph();
      }
      return this._packages;
    }
  }, {
    key: "packageGraph",
    get: function get() {
      if (!this._packageGraph) {
        this.buildPackageGraph();
      }
      return this._packageGraph;
    }
  }]);

  return Repository;
}();

exports.default = Repository;
module.exports = exports["default"];