"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _progressBar = require("./progressBar");

var _progressBar2 = _interopRequireDefault(_progressBar);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _padEnd = require("lodash/padEnd");

var _padEnd2 = _interopRequireDefault(_padEnd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cwd = process.cwd();

var DEFAULT_LOGLEVEL = "info";

var LEVELS = [["silly", "magenta"], ["verbose", "blue"], ["info", "reset"], ["success", "green"], ["warn", "yellow"], ["error", "red"], ["silent"]];

var TYPE_TO_LEVEL = LEVELS.reduce(function (map, _ref, index) {
  var _ref2 = _slicedToArray(_ref, 1),
      type = _ref2[0];

  return map[type] = index, map;
}, {});

var Logger = function () {
  function Logger() {
    _classCallCheck(this, Logger);

    this.setLogLevel();
    this.logs = [];
  }

  _createClass(Logger, [{
    key: "setLogLevel",
    value: function setLogLevel(type) {
      this.loglevel = TYPE_TO_LEVEL[type || DEFAULT_LOGLEVEL];
    }
  }, {
    key: "_log",
    value: function _log(type, style, level, message, error) {
      this.logs.push({
        type: type,
        message: message,
        error: error
      });

      if (level < this.loglevel) {
        return;
      }

      if (error) {
        message += "\n" + (error.stack || error);
      }

      if (style) {
        message = style(message);
      }

      _progressBar2.default.clear();
      this._emit(message);
      _progressBar2.default.restore();
    }
  }, {
    key: "_emit",
    value: function _emit(message) {
      if (process.env.NODE_ENV !== "lerna-test") {
        console.log(message);
      }
    }
  }, {
    key: "newLine",
    value: function newLine() {
      this._emit("");
    }
  }, {
    key: "logifyAsync",
    value: function logifyAsync() {
      var _this = this;

      return function (target, property, descriptor) {
        var message = target.name + "." + property;
        var method = descriptor.value;

        descriptor.value = function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var callback = args.pop();
          var msg = _this._formatMethod(message, args);

          _this.verbose(msg);

          // wrap final callback
          args.push(function (error, value) {
            if (error) {
              _this.error(msg, error);
              if (value) {
                _this.error(value);
              }
            } else {
              _this.verbose(msg + " => " + _this._formatValue(value));
            }

            callback(error, value);
          });

          method.apply(undefined, args);
        };
      };
    }
  }, {
    key: "logifySync",
    value: function logifySync() {
      var _this2 = this;

      return function (target, property, descriptor) {
        var message = target.name + "." + property;
        var method = descriptor.value;

        descriptor.value = function () {
          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          var msg = _this2._formatMethod(message, args);

          _this2.verbose(msg);

          try {
            var result = method.apply(undefined, args);
            _this2.verbose(msg + " => " + _this2._formatValue(result));
            return result;
          } catch (error) {
            _this2.error(msg, error);
            throw error;
          }
        };
      };
    }
  }, {
    key: "_formatMethod",
    value: function _formatMethod(method, args) {
      return (0, _padEnd2.default)(method, 30) + "(" + this._formatArguments(args) + ")";
    }
  }, {
    key: "_formatArguments",
    value: function _formatArguments(args) {
      var fullArgs = args.map(this._formatValue).join(", ");
      if (fullArgs.length > 100) {
        return fullArgs.slice(0, 100) + "...";
      } else {
        return fullArgs;
      }
    }
  }, {
    key: "_formatValue",
    value: function _formatValue(arg) {
      if (typeof arg === "function") {
        return "function " + arg.name + "() {...}";
      }

      return (JSON.stringify(arg) || "").replace(cwd, ".");
    }
  }]);

  return Logger;
}();

LEVELS.forEach(function (_ref3) {
  var _ref4 = _slicedToArray(_ref3, 2),
      type = _ref4[0],
      color = _ref4[1];

  if (!color) return; // "silent"
  var style = _chalk2.default[color];
  var level = TYPE_TO_LEVEL[type];
  Logger.prototype[type] = function (message, error) {
    this._log(type, style, level, message, error);
  };
});

exports.default = new Logger();
module.exports = exports["default"];