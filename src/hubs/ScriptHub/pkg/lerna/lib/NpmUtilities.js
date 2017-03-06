"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _desc, _value, _class;

var _ChildProcessUtilities = require("./ChildProcessUtilities");

var _ChildProcessUtilities2 = _interopRequireDefault(_ChildProcessUtilities);

var _FileSystemUtilities = require("./FileSystemUtilities");

var _FileSystemUtilities2 = _interopRequireDefault(_FileSystemUtilities);

var _signalExit = require("signal-exit");

var _signalExit2 = _interopRequireDefault(_signalExit);

var _logger = require("./logger");

var _logger2 = _interopRequireDefault(_logger);

var _commandJoin = require("command-join");

var _commandJoin2 = _interopRequireDefault(_commandJoin);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _semver = require("semver");

var _semver2 = _interopRequireDefault(_semver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var NpmUtilities = (_dec = _logger2.default.logifyAsync(), _dec2 = _logger2.default.logifySync(), _dec3 = _logger2.default.logifySync(), _dec4 = _logger2.default.logifySync(), _dec5 = _logger2.default.logifyAsync(), _dec6 = _logger2.default.logifyAsync(), _dec7 = _logger2.default.logifyAsync(), _dec8 = _logger2.default.logifyAsync(), _dec9 = _logger2.default.logifySync, (_class = function () {
  function NpmUtilities() {
    _classCallCheck(this, NpmUtilities);
  }

  _createClass(NpmUtilities, null, [{
    key: "installInDir",
    value: function installInDir(directory, dependencies, config, callback) {
      var registry = config.registry,
          client = config.client;

      // Nothing to do if we weren't given any deps.

      if (!(dependencies && dependencies.length)) return callback();

      var args = ["install"];

      var opts = {
        cwd: directory,
        stdio: ["ignore", "pipe", "pipe"]
      };

      if (registry) {
        opts.env = { npm_config_registry: registry };
      }

      var packageJson = _path2.default.join(directory, "package.json");
      var packageJsonBkp = packageJson + ".lerna_backup";

      _FileSystemUtilities2.default.rename(packageJson, packageJsonBkp, function (err) {
        if (err) return callback(err);

        var cleanup = function cleanup() {

          // Need to do this one synchronously because we might be doing it on exit.
          _FileSystemUtilities2.default.renameSync(packageJsonBkp, packageJson);
        };

        // If we die we need to be sure to put things back the way we found them.
        var unregister = (0, _signalExit2.default)(cleanup);

        // Construct a basic fake package.json with just the deps we need to install.
        var tempJson = JSON.stringify({
          dependencies: dependencies.reduce(function (deps, dep) {
            var _NpmUtilities$splitVe = NpmUtilities.splitVersion(dep),
                _NpmUtilities$splitVe2 = _slicedToArray(_NpmUtilities$splitVe, 2),
                pkg = _NpmUtilities$splitVe2[0],
                version = _NpmUtilities$splitVe2[1];

            deps[pkg] = version || "*";
            return deps;
          }, {})
        });

        // Write out our temporary cooked up package.json and then install.
        _FileSystemUtilities2.default.writeFile(packageJson, tempJson, function (err) {

          // We have a few housekeeping tasks to take care of whether we succeed or fail.
          var done = function done(err) {
            cleanup();
            unregister();
            callback(err);
          };

          if (err) {
            return done(err);
          } else {
            _ChildProcessUtilities2.default.spawn(client || "npm", args, opts, done);
          }
        });
      });
    }

    // Take a dep like "foo@^1.0.0".
    // Return a tuple like ["foo", "^1.0.0"].
    // Handles scoped packages.
    // Returns undefined for version if none specified.

  }, {
    key: "splitVersion",
    value: function splitVersion(dep) {
      return dep.match(/^(@?[^@]+)(?:@(.+))?/).slice(1, 3);
    }
  }, {
    key: "addDistTag",
    value: function addDistTag(packageName, version, tag, registry) {
      var opts = NpmUtilities.getTagOpts(registry);
      _ChildProcessUtilities2.default.execSync("npm dist-tag add " + packageName + "@" + version + " " + tag, opts);
    }
  }, {
    key: "removeDistTag",
    value: function removeDistTag(packageName, tag, registry) {
      var opts = NpmUtilities.getTagOpts(registry);
      _ChildProcessUtilities2.default.execSync("npm dist-tag rm " + packageName + " " + tag, opts);
    }
  }, {
    key: "checkDistTag",
    value: function checkDistTag(packageName, tag, registry) {
      var opts = NpmUtilities.getTagOpts(registry);
      return _ChildProcessUtilities2.default.execSync("npm dist-tag ls " + packageName, opts).indexOf(tag) >= 0;
    }
  }, {
    key: "execInDir",
    value: function execInDir(command, args, directory, callback) {
      _ChildProcessUtilities2.default.exec("npm " + command + " " + (0, _commandJoin2.default)(args), { cwd: directory, env: process.env }, callback);
    }
  }, {
    key: "runScriptInDir",
    value: function runScriptInDir(script, args, directory, callback) {
      NpmUtilities.execInDir("run " + script, args, directory, callback);
    }
  }, {
    key: "runScriptInPackageStreaming",
    value: function runScriptInPackageStreaming(script, args, pkg, callback) {
      _ChildProcessUtilities2.default.spawnStreaming("npm", ["run", script].concat(_toConsumableArray(args)), { cwd: pkg.location, env: process.env }, pkg.name + ": ", callback);
    }
  }, {
    key: "publishTaggedInDir",
    value: function publishTaggedInDir(tag, directory, registry, callback) {
      var command = ("npm publish --tag " + tag).trim();
      var opts = NpmUtilities.getTagOpts(registry);
      _ChildProcessUtilities2.default.exec("cd " + (0, _commandJoin2.default)(directory) + " && " + command, opts, callback);
    }
  }, {
    key: "dependencyIsSatisfied",
    value: function dependencyIsSatisfied(dir, dependency, needVersion) {
      var packageJson = _path2.default.join(dir, dependency, "package.json");
      try {
        return _semver2.default.satisfies(require(packageJson).version, needVersion);
      } catch (e) {
        return false;
      }
    }
  }, {
    key: "getTagOpts",
    value: function getTagOpts(registry) {
      return registry ? { env: { npm_config_registry: registry } } : null;
    }
  }]);

  return NpmUtilities;
}(), (_applyDecoratedDescriptor(_class, "installInDir", [_dec], Object.getOwnPropertyDescriptor(_class, "installInDir"), _class), _applyDecoratedDescriptor(_class, "addDistTag", [_dec2], Object.getOwnPropertyDescriptor(_class, "addDistTag"), _class), _applyDecoratedDescriptor(_class, "removeDistTag", [_dec3], Object.getOwnPropertyDescriptor(_class, "removeDistTag"), _class), _applyDecoratedDescriptor(_class, "checkDistTag", [_dec4], Object.getOwnPropertyDescriptor(_class, "checkDistTag"), _class), _applyDecoratedDescriptor(_class, "execInDir", [_dec5], Object.getOwnPropertyDescriptor(_class, "execInDir"), _class), _applyDecoratedDescriptor(_class, "runScriptInDir", [_dec6], Object.getOwnPropertyDescriptor(_class, "runScriptInDir"), _class), _applyDecoratedDescriptor(_class, "runScriptInPackageStreaming", [_dec7], Object.getOwnPropertyDescriptor(_class, "runScriptInPackageStreaming"), _class), _applyDecoratedDescriptor(_class, "publishTaggedInDir", [_dec8], Object.getOwnPropertyDescriptor(_class, "publishTaggedInDir"), _class), _applyDecoratedDescriptor(_class, "dependencyIsSatisfied", [_dec9], Object.getOwnPropertyDescriptor(_class, "dependencyIsSatisfied"), _class)), _class));
exports.default = NpmUtilities;
module.exports = exports["default"];