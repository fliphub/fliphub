"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Command2 = require("../Command");

var _Command3 = _interopRequireDefault(_Command2);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _columnify = require("columnify");

var _columnify2 = _interopRequireDefault(_columnify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LsCommand = function (_Command) {
  _inherits(LsCommand, _Command);

  function LsCommand() {
    _classCallCheck(this, LsCommand);

    return _possibleConstructorReturn(this, (LsCommand.__proto__ || Object.getPrototypeOf(LsCommand)).apply(this, arguments));
  }

  _createClass(LsCommand, [{
    key: "initialize",
    value: function initialize(callback) {
      // Nothing to do...
      callback(null, true);
    }
  }, {
    key: "execute",
    value: function execute(callback) {
      var formattedPackages = this.filteredPackages.map(function (pkg) {
        return {
          name: pkg.name,
          version: _chalk2.default.grey("v" + pkg.version),
          private: pkg.isPrivate() ? "(" + _chalk2.default.red("private") + ")" : ""
        };
      });

      this.logger.info((0, _columnify2.default)(formattedPackages, { showHeaders: false }));
      callback(null, true);
    }
  }]);

  return LsCommand;
}(_Command3.default);

exports.default = LsCommand;
module.exports = exports["default"];