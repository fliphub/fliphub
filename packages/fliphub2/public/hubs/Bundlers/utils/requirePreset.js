'use strict';

// https://github.com/mozilla-neutrino/neutrino-dev/blob/master/packages/neutrino/src/requireMiddleware.js
/* eslint-disable global-require*/
const { join } = require('path');
const { execSync } = require('child_process');

const castToArray = val => Array.isArray(val) ? val : [val];

function tryCatchRequire(path) {
  try {
    const required = require(path);
    return required;
  } catch (exception) {
    return { exception };
  }
}

function tryToRequire(path, middleware, resolved, required = false) {
  if (!required) required = tryCatchRequire(path);
  if (required.exception) required = tryCatchRequire(middleware);
  if (required.exception) required = tryCatchRequire(resolved);
  return required;
}

function requirePath(path, middleware) {
  // console.log(require.resolve(middleware))
  // require('depflip/check')
  // execSync('npm install ' + middleware)
  const required = tryToRequire(path, middleware, require.resolve(middleware));
  const exception = required.exception;
  // if (exception)
  // if (exception && !/Cannot find module/.test(exception.message)) {
  //   // exception.message = `Neutrino was unable to load the module '${middleware}'. ` +
  //   //   `Ensure this module exports a function and is free from errors.\n${exception.message}`
  //   // throw exception
  // }
  return undefined;
}

module.exports = function requireMiddleware(middleware, options = {}) {
  const root = options.root || process.cwd();
  if (middleware.includes('happypack')) return [() => {}];
  return castToArray(middleware).map(middleware => {
    // const path = [
    //   join(root, middleware),
    //   join(root, 'node_modules', middleware),
    // ].find(path => requirePath(path, middleware))
    //
    // if (!path) {
    //   throw new Error(`Neutrino cannot find a module with the name or path '${middleware}'. ` +
    //     'Ensure this module can be found relative to the root of the project.')
    // }
    // return require(path)

    return require(middleware);
  });
};