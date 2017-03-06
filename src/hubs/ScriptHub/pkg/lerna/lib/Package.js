"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _semver = require("semver");

var _semver2 = _interopRequireDefault(_semver);

var _NpmUtilities = require("./NpmUtilities");

var _NpmUtilities2 = _interopRequireDefault(_NpmUtilities);

var _logger = require("./logger");

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Package = function () {
  function Package(pkg, location) {
    _classCallCheck(this, Package);

    this._package = pkg;
    this._location = location;
  }

  _createClass(Package, [{
    key: "isPrivate",
    value: function isPrivate() {
      return !!this._package.private;
    }
  }, {
    key: "toJsonString",
    value: function toJsonString() {
      return JSON.stringify(this._package, null, 2) + "\n";
    }

    /**
     * Run a NPM script in this package's directory
     * @param {String} script NPM script to run
     * @param {Function} callback
     */

  }, {
    key: "runScript",
    value: function runScript(script, callback) {
      if (this.scripts[script]) {
        _NpmUtilities2.default.runScriptInDir(script, [], this.location, callback);
      } else {
        callback();
      }
    }

    /**
     * Determine if a dependency version satisfies the requirements of this package
     * @param {Package} dependency
     * @param {Boolean} showWarning
     * @returns {Boolean}
     */

  }, {
    key: "hasMatchingDependency",
    value: function hasMatchingDependency(dependency) {
      var showWarning = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var expectedVersion = this.allDependencies[dependency.name];
      var actualVersion = dependency.version;

      if (!expectedVersion) {
        return false;
      }

      // check if semantic versions are compatible
      if (_semver2.default.satisfies(actualVersion, expectedVersion)) {
        return true;
      }

      if (showWarning) {
        _logger2.default.warn("Version mismatch inside \"" + this.name + "\". " + ("Depends on \"" + dependency.name + "@" + expectedVersion + "\" ") + ("instead of \"" + dependency.name + "@" + actualVersion + "\"."));
      }

      return false;
    }

    /**
     * Determine if a dependency has already been installed for this package
     * @param {String} dependency Name of the dependency
     * @returns {Boolean}
     */

  }, {
    key: "hasDependencyInstalled",
    value: function hasDependencyInstalled(dependency) {
      return _NpmUtilities2.default.dependencyIsSatisfied(this.nodeModulesLocation, dependency, this.allDependencies[dependency]);
    }
  }, {
    key: "name",
    get: function get() {
      return this._package.name;
    }
  }, {
    key: "location",
    get: function get() {
      return this._location;
    }
  }, {
    key: "nodeModulesLocation",
    get: function get() {
      return _path2.default.join(this._location, "node_modules");
    }
  }, {
    key: "version",
    get: function get() {
      return this._package.version;
    },
    set: function set(version) {
      this._package.version = version;
    }
  }, {
    key: "bin",
    get: function get() {
      return this._package.bin;
    }
  }, {
    key: "dependencies",
    get: function get() {
      return this._package.dependencies;
    }
  }, {
    key: "devDependencies",
    get: function get() {
      return this._package.devDependencies;
    }
  }, {
    key: "peerDependencies",
    get: function get() {
      return this._package.peerDependencies;
    }
  }, {
    key: "allDependencies",
    get: function get() {
      return Object.assign({}, this.devDependencies, this.dependencies);
    }
  }, {
    key: "scripts",
    get: function get() {
      return this._package.scripts || {};
    }
  }]);

  return Package;
}();

exports.default = Package;
module.exports = exports["default"];