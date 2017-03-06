"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _child_process = require("child_process");

var _child_process2 = _interopRequireDefault(_child_process);

var _crossSpawn = require("cross-spawn");

var _crossSpawn2 = _interopRequireDefault(_crossSpawn);

var _events = require("events");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Keep track of how many live children we have.
var children = 0;

// maxBuffer value for running exec
var MAX_BUFFER = 500 * 1024;

// This is used to alert listeners when all children have exited.
var emitter = new _events.EventEmitter();

var ChildProcessUtilities = function () {
  function ChildProcessUtilities() {
    _classCallCheck(this, ChildProcessUtilities);
  }

  _createClass(ChildProcessUtilities, null, [{
    key: "exec",
    value: function exec(command, opts, callback) {
      var mergedOpts = Object.assign({
        maxBuffer: MAX_BUFFER
      }, opts);
      return ChildProcessUtilities.registerChild(_child_process2.default.exec(command, mergedOpts, function (err, stdout, stderr) {
        if (err != null) {

          // If the error from `child.exec` is just that the child process
          // emitted too much on stderr, then that stderr output is likely to
          // be useful.
          if (/^stderr maxBuffer exceeded/.test(err.message)) {
            err = "Error: " + err.message + ".  Partial output follows:\n\n" + stderr;
          }

          callback(err || stderr, stdout);
        } else {
          callback(null, stdout);
        }
      }));
    }
  }, {
    key: "execSync",
    value: function execSync(command, opts) {
      var mergedOpts = Object.assign({
        encoding: "utf8",
        maxBuffer: MAX_BUFFER
      }, opts);
      return _child_process2.default.execSync(command, mergedOpts).trim();
    }
  }, {
    key: "spawn",
    value: function spawn(command, args, opts, callback) {
      var output = "";

      var childProcess = _spawn(command, args, opts, function (err) {
        return callback(err, output);
      });

      // By default stderr, stdout are inherited from us (just sent to _our_ output).
      // If the caller overrode that to "pipe", then we'll gather that up and
      // call back with it in case of failure.
      if (childProcess.stderr) {
        childProcess.stderr.setEncoding("utf8");
        childProcess.stderr.on("data", function (chunk) {
          return output += chunk;
        });
      }

      if (childProcess.stdout) {
        childProcess.stdout.setEncoding("utf8");
        childProcess.stdout.on("data", function (chunk) {
          return output += chunk;
        });
      }
    }
  }, {
    key: "spawnStreaming",
    value: function spawnStreaming(command, args, opts, prefix, callback) {
      opts = Object.assign({}, opts, {
        stdio: ["ignore", "pipe", "pipe"]
      });

      var childProcess = _spawn(command, args, opts, callback);

      ["stdout", "stderr"].forEach(function (stream) {
        var partialLine = "";
        childProcess[stream].setEncoding("utf8").on("data", function (chunk) {
          var lines = chunk.split("\n");
          lines[0] = partialLine + lines[0];
          partialLine = lines.pop();
          lines.forEach(function (line) {
            return process[stream].write(prefix + line + "\n");
          });
        }).on("end", function () {
          if (partialLine) {

            // If the child process ended its output with no final newline we
            // need to flush that out.  We'll add a newline ourselves so we
            // don't end up with output from multiple children on the same
            // line.
            process[stream].write(prefix + partialLine + "\n");
          }
        });
      });
    }
  }, {
    key: "registerChild",
    value: function registerChild(child) {
      children++;
      child.on("exit", function () {
        children--;
        if (children === 0) {
          emitter.emit("empty");
        }
      });
      return child;
    }
  }, {
    key: "getChildProcessCount",
    value: function getChildProcessCount() {
      return children;
    }
  }, {
    key: "onAllExited",
    value: function onAllExited(callback) {
      emitter.on("empty", callback);
    }
  }]);

  return ChildProcessUtilities;
}();

exports.default = ChildProcessUtilities;


function _spawn(command, args, opts, callback) {
  return ChildProcessUtilities.registerChild((0, _crossSpawn2.default)(command, args, Object.assign({
    stdio: "inherit"
  }, opts)).on("error", function () {}).on("close", function (code) {
    if (code) {
      callback("Command exited with status " + code + ": " + command + " " + args.join(" "));
    } else {
      callback(null);
    }
  }));
}
module.exports = exports["default"];