"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _desc, _value, _class;

var _pathExists = require("path-exists");

var _pathExists2 = _interopRequireDefault(_pathExists);

var _logger = require("./logger");

var _logger2 = _interopRequireDefault(_logger);

var _mkdirp2 = require("mkdirp");

var _mkdirp3 = _interopRequireDefault(_mkdirp2);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _cmdShim = require("cmd-shim");

var _cmdShim2 = _interopRequireDefault(_cmdShim);

var _readCmdShim = require("read-cmd-shim");

var _readCmdShim2 = _interopRequireDefault(_readCmdShim);

var _path = require("path");

var _ChildProcessUtilities = require("./ChildProcessUtilities");

var _ChildProcessUtilities2 = _interopRequireDefault(_ChildProcessUtilities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var ENDS_WITH_NEW_LINE = /\n$/;

function ensureEndsWithNewLine(string) {
  return ENDS_WITH_NEW_LINE.test(string) ? string : string + "\n";
}

var FileSystemUtilities = (_dec = _logger2.default.logifySync(), _dec2 = _logger2.default.logifyAsync(), _dec3 = _logger2.default.logifySync(), _dec4 = _logger2.default.logifySync(), _dec5 = _logger2.default.logifyAsync(), _dec6 = _logger2.default.logifyAsync(), _dec7 = _logger2.default.logifySync(), _dec8 = _logger2.default.logifySync(), _dec9 = _logger2.default.logifySync(), _dec10 = _logger2.default.logifyAsync(), _dec11 = _logger2.default.logifyAsync(), _dec12 = _logger2.default.logifySync(), _dec13 = _logger2.default.logifySync(), (_class = function () {
  function FileSystemUtilities() {
    _classCallCheck(this, FileSystemUtilities);
  }

  _createClass(FileSystemUtilities, null, [{
    key: "mkdirSync",
    value: function mkdirSync(filePath) {
      _fs2.default.mkdirSync(filePath);
    }
  }, {
    key: "mkdirp",
    value: function mkdirp(filePath, callback) {
      (0, _mkdirp3.default)(filePath, callback);
    }
  }, {
    key: "readdirSync",
    value: function readdirSync(filePath) {
      return _fs2.default.readdirSync(filePath);
    }
  }, {
    key: "existsSync",
    value: function existsSync(filePath) {
      return _pathExists2.default.sync(filePath);
    }
  }, {
    key: "writeFile",
    value: function writeFile(filePath, fileContents, callback) {
      _fs2.default.writeFile(filePath, ensureEndsWithNewLine(fileContents), callback);
    }
  }, {
    key: "rename",
    value: function rename(from, to, callback) {
      _fs2.default.rename(from, to, callback);
    }
  }, {
    key: "renameSync",
    value: function renameSync(from, to) {
      _fs2.default.renameSync(from, to);
    }
  }, {
    key: "writeFileSync",
    value: function writeFileSync(filePath, fileContents) {
      _fs2.default.writeFileSync(filePath, ensureEndsWithNewLine(fileContents));
    }
  }, {
    key: "readFileSync",
    value: function readFileSync(filePath) {
      return _fs2.default.readFileSync(filePath, "utf-8").toString().trim();
    }
  }, {
    key: "rimraf",
    value: function rimraf(filePath, callback) {

      // Shelling out to a child process for a noop is expensive.
      // Checking if `filePath` exists to be removed is cheap.
      // This lets us short-circuit if we don't have anything to do.
      (0, _pathExists2.default)(filePath).then(function (exists) {
        if (!exists) return callback();

        // Note: if rimraf moves the location of its executable, this will need to be updated
        _ChildProcessUtilities2.default.spawn(require.resolve("rimraf/bin"), [filePath], {}, callback);
      });
    }
  }, {
    key: "symlink",
    value: function symlink(src, dest, type, callback) {
      if (type === "exec") {
        if (process.platform === "win32") {
          (0, _cmdShim2.default)(src, dest, callback);
          return;
        }
        type = "file";
      }
      if (process.platform !== "win32") {
        src = (0, _path.relative)((0, _path.dirname)(dest), src);
      }
      _fs2.default.lstat(dest, function (err) {
        if (!err) {
          // Something exists at `dest`.  Need to remove it first.
          _fs2.default.unlink(dest, function () {
            return _fs2.default.symlink(src, dest, type, callback);
          });
        } else {
          _fs2.default.symlink(src, dest, type, callback);
        }
      });
    }
  }, {
    key: "unlinkSync",
    value: function unlinkSync(filePath) {
      _fs2.default.unlinkSync(filePath);
    }
  }, {
    key: "isSymlink",
    value: function isSymlink(path) {
      var lstat = _fs2.default.lstatSync(path);
      var isSymlink = lstat && lstat.isSymbolicLink() ? (0, _path.resolve)((0, _path.dirname)(path), _fs2.default.readlinkSync(path)) : false;
      if (process.platform === "win32" && lstat) {
        if (lstat.isFile() && !isSymlink) {
          try {
            return (0, _path.resolve)((0, _path.dirname)(path), _readCmdShim2.default.sync(path));
          } catch (e) {
            return false;
          }
        }
        isSymlink = isSymlink && (0, _path.resolve)(isSymlink);
      }
      return isSymlink;
    }
  }]);

  return FileSystemUtilities;
}(), (_applyDecoratedDescriptor(_class, "mkdirSync", [_dec], Object.getOwnPropertyDescriptor(_class, "mkdirSync"), _class), _applyDecoratedDescriptor(_class, "mkdirp", [_dec2], Object.getOwnPropertyDescriptor(_class, "mkdirp"), _class), _applyDecoratedDescriptor(_class, "readdirSync", [_dec3], Object.getOwnPropertyDescriptor(_class, "readdirSync"), _class), _applyDecoratedDescriptor(_class, "existsSync", [_dec4], Object.getOwnPropertyDescriptor(_class, "existsSync"), _class), _applyDecoratedDescriptor(_class, "writeFile", [_dec5], Object.getOwnPropertyDescriptor(_class, "writeFile"), _class), _applyDecoratedDescriptor(_class, "rename", [_dec6], Object.getOwnPropertyDescriptor(_class, "rename"), _class), _applyDecoratedDescriptor(_class, "renameSync", [_dec7], Object.getOwnPropertyDescriptor(_class, "renameSync"), _class), _applyDecoratedDescriptor(_class, "writeFileSync", [_dec8], Object.getOwnPropertyDescriptor(_class, "writeFileSync"), _class), _applyDecoratedDescriptor(_class, "readFileSync", [_dec9], Object.getOwnPropertyDescriptor(_class, "readFileSync"), _class), _applyDecoratedDescriptor(_class, "rimraf", [_dec10], Object.getOwnPropertyDescriptor(_class, "rimraf"), _class), _applyDecoratedDescriptor(_class, "symlink", [_dec11], Object.getOwnPropertyDescriptor(_class, "symlink"), _class), _applyDecoratedDescriptor(_class, "unlinkSync", [_dec12], Object.getOwnPropertyDescriptor(_class, "unlinkSync"), _class), _applyDecoratedDescriptor(_class, "isSymlink", [_dec13], Object.getOwnPropertyDescriptor(_class, "isSymlink"), _class)), _class));
exports.default = FileSystemUtilities;
module.exports = exports["default"];