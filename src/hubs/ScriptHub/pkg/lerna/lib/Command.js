"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.commandNameFromClassName = commandNameFromClassName;
exports.exposeCommands = exposeCommands;

var _ChildProcessUtilities = require("./ChildProcessUtilities");

var _ChildProcessUtilities2 = _interopRequireDefault(_ChildProcessUtilities);

var _FileSystemUtilities = require("./FileSystemUtilities");

var _FileSystemUtilities2 = _interopRequireDefault(_FileSystemUtilities);

var _ExitHandler = require("./ExitHandler");

var _ExitHandler2 = _interopRequireDefault(_ExitHandler);

var _progressBar = require("./progressBar");

var _progressBar2 = _interopRequireDefault(_progressBar);

var _Repository = require("./Repository");

var _Repository2 = _interopRequireDefault(_Repository);

var _PackageUtilities = require("./PackageUtilities");

var _PackageUtilities2 = _interopRequireDefault(_PackageUtilities);

var _logger = require("./logger");

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_CONCURRENCY = 4;

var Command = function () {
  function Command(input, flags) {
    _classCallCheck(this, Command);

    this.input = input;
    this.flags = flags;

    this.lernaVersion = require("../package.json").version;
    this.logger = _logger2.default;
    this.repository = new _Repository2.default();
    this.progressBar = _progressBar2.default;
    this.concurrency = !flags || flags.concurrency === undefined ? DEFAULT_CONCURRENCY : Math.max(1, +flags.concurrency || DEFAULT_CONCURRENCY);

    var _getOptions = this.getOptions(),
        sort = _getOptions.sort;

    // If the option isn't present then the default is to sort.


    this.toposort = sort == null || sort;
  }

  _createClass(Command, [{
    key: "getOptions",
    value: function getOptions() {

      // Command config object is either "commands" or "command".
      var _repository$lernaJson = this.repository.lernaJson,
          commands = _repository$lernaJson.commands,
          command = _repository$lernaJson.command;

      // Items lower down override items higher up.

      for (var _len = arguments.length, objects = Array(_len), _key = 0; _key < _len; _key++) {
        objects[_key] = arguments[_key];
      }

      return Object.assign.apply(Object, [{},

      // Deprecated legacy options in `lerna.json`.
      this._legacyOptions(),

      // Global options from `lerna.json`.
      this.repository.lernaJson].concat(_toConsumableArray([].concat(_toConsumableArray(this.otherCommandConfigs), [this.name]).map(function (name) {
        return (commands || command || {})[name];
      })), objects, [

      // CLI flags always override everything.
      this.flags]));
    }
  }, {
    key: "run",
    value: function run() {
      this.logger.info("Lerna v" + this.lernaVersion);

      if (this.repository.isIndependent()) {
        this.logger.info("Independent Versioning Mode");
      }

      this.runValidations();
      this.runPreparations();
      this.runCommand();
    }
  }, {
    key: "runValidations",
    value: function runValidations() {
      if (this.concurrency < 1) {
        this.logger.warn("command must be run with at least one thread.");
        this._complete(null, 1);
        return;
      }

      if (!_FileSystemUtilities2.default.existsSync(this.repository.packageJsonLocation)) {
        this.logger.warn("`package.json` does not exist, have you run `lerna init`?");
        this._complete(null, 1);
        return;
      }

      if (!_FileSystemUtilities2.default.existsSync(this.repository.lernaJsonLocation)) {
        this.logger.warn("`lerna.json` does not exist, have you run `lerna init`?");
        this._complete(null, 1);
        return;
      }

      if (this.flags.independent && !this.repository.isIndependent()) {
        this.logger.warn("You ran lerna with `--independent` or `-i`, but the repository is not set to independent mode. " + "To use independent mode you need to set your `lerna.json` \"version\" to \"independent\". " + "Then you won't need to pass the `--independent` or `-i` flags.");
        this._complete(null, 1);
        return;
      }

      if (process.env.NODE_ENV !== "lerna-test" && this.lernaVersion !== this.repository.lernaVersion) {
        this.logger.warn("Lerna version mismatch: The current version of lerna is " + this.lernaVersion + ", " + ("but the Lerna version in `lerna.json` is " + this.repository.lernaVersion + ". ") + ("You can either run `lerna init` again or install `lerna@" + this.repository.lernaVersion + "`."));
        this._complete(null, 1);
        return;
      }

      if (_FileSystemUtilities2.default.existsSync(this.repository.versionLocation)) {
        this.logger.warn("You have a `VERSION` file in your repository, this is leftover from a previous ");
        this._complete(null, 1);
        return;
      }

      if (process.env.NPM_DIST_TAG !== undefined) {
        this.logger.warn("`NPM_DIST_TAG=[tagname] lerna publish` is deprecated, please use `lerna publish --tag [tagname]` instead.");
        this._complete(null, 1);
        return;
      }

      if (process.env.FORCE_VERSION !== undefined) {
        this.logger.warn("`FORCE_VERSION=[package/*] lerna updated/publish` is deprecated, please use `lerna updated/publish --force-publish [package/*]` instead.");
        this._complete(null, 1);
        return;
      }
    }
  }, {
    key: "runPreparations",
    value: function runPreparations() {
      var _getOptions2 = this.getOptions(),
          scope = _getOptions2.scope,
          ignore = _getOptions2.ignore,
          registry = _getOptions2.registry;

      if (scope) {
        this.logger.info("Scoping to packages that match '" + scope + "'");
      }
      if (ignore) {
        this.logger.info("Ignoring packages that match '" + ignore + "'");
      }
      if (registry) {
        this.npmRegistry = registry;
      }
      try {
        this.repository.buildPackageGraph();
        this.packages = this.repository.packages;
        this.packageGraph = this.repository.packageGraph;
        this.filteredPackages = _PackageUtilities2.default.filterPackages(this.packages, { scope: scope, ignore: ignore });
        if (this.getOptions().includeFilteredDependencies) {
          this.filteredPackages = _PackageUtilities2.default.addDependencies(this.filteredPackages, this.packageGraph);
        }
      } catch (err) {
        this.logger.error("Errored while collecting packages and package graph", err);
        this._complete(null, 1);
        throw err;
      }
    }
  }, {
    key: "runCommand",
    value: function runCommand(callback) {
      var _this = this;

      this._attempt("initialize", function () {
        _this._attempt("execute", function () {
          _this._complete(null, 0, callback);
        }, callback);
      }, callback);
    }
  }, {
    key: "_attempt",
    value: function _attempt(method, next, callback) {
      var _this2 = this;

      var methodName = this.constructor.name + "." + method;

      try {
        this.logger.verbose("Attempting running " + methodName);

        this[method](function (err, completed) {
          if (err) {
            _this2.logger.error("Errored while running " + methodName, err);
            _this2._complete(err, 1, callback);
          } else if (!completed) {
            _this2.logger.verbose("Exited early while running " + methodName);
            _this2._complete(null, 1, callback);
          } else {
            _this2.logger.verbose("Successfully ran " + methodName);
            next();
          }
        });
      } catch (err) {
        this.logger.error("Errored while running " + methodName, err);
        this._complete(err, 1, callback);
      }
    }
  }, {
    key: "_complete",
    value: function _complete(err, code, callback) {
      if (code !== 0) {
        var exitHandler = new _ExitHandler2.default();
        exitHandler.writeLogs();
      }

      var finish = function finish() {
        if (callback) {
          callback(err, code);
        }

        if (process.env.NODE_ENV !== "lerna-test") {
          process.exit(code);
        }
      };

      var childProcessCount = _ChildProcessUtilities2.default.getChildProcessCount();
      if (childProcessCount > 0) {
        _logger2.default.info("Waiting for " + childProcessCount + " child " + ("process" + (childProcessCount === 1 ? "" : "es") + " to exit. ") + "CTRL-C to exit immediately.");
        _ChildProcessUtilities2.default.onAllExited(finish);
      } else {
        finish();
      }
    }
  }, {
    key: "_legacyOptions",
    value: function _legacyOptions() {
      var _this3 = this;

      return ["bootstrap", "publish"].reduce(function (opts, command) {
        if (_this3.name === command && _this3.repository.lernaJson[command + "Config"]) {
          _logger2.default.warn("`" + command + "Config.ignore` is deprecated.  Use `commands." + command + ".ignore`.");
          opts.ignore = _this3.repository.lernaJson[command + "Config"].ignore;
        }
        return opts;
      }, {});
    }
  }, {
    key: "initialize",
    value: function initialize() {
      throw new Error("command.initialize() needs to be implemented.");
    }
  }, {
    key: "execute",
    value: function execute() {
      throw new Error("command.execute() needs to be implemented.");
    }
  }, {
    key: "name",
    get: function get() {
      // For a class named "FooCommand" this returns "foo".
      return commandNameFromClassName(this.className);
    }
  }, {
    key: "className",
    get: function get() {
      return this.constructor.name;
    }

    // Override this to inherit config from another command.
    // For example `updated` inherits config from `publish`.

  }, {
    key: "otherCommandConfigs",
    get: function get() {
      return [];
    }
  }]);

  return Command;
}();

exports.default = Command;
function commandNameFromClassName(className) {
  return className.replace(/Command$/, "").toLowerCase();
}

function exposeCommands(commands) {
  return commands.reduce(function (obj, cls) {
    var commandName = commandNameFromClassName(cls.name);
    if (!cls.name.match(/Command$/)) {
      throw new Error("Invalid command class name \"" + cls.name + "\".  Must end with \"Command\".");
    }
    if (obj[commandName]) {
      throw new Error("Duplicate command: \"" + commandName + "\"");
    }
    if (!Command.isPrototypeOf(cls)) {
      throw new Error("Command does not extend Command: \"" + cls.name + "\"");
    }
    obj[commandName] = cls;
    return obj;
  }, {});
}