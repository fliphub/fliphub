'use strict';

const DefaultsEnv = require('./DefaultsEnv');
const PresetNeutrino = require('./PresetNeutrino');
const PresetDefaultsRollup = require('./DefaultsRollup');
const PresetDefaultsFuseBox = require('./DefaultsFuseBox');
const PresetDefineEnv = require('./PresetDefineEnv');

const PresetLibrary = require('./PresetLibrary');
const PresetTarget = require('./PresetTarget');
const PresetSourceMap = require('./PresetSourceMap');
const PresetUglify = require('./PresetUglify');
const PresetMinify = require('./PresetMinify');

const PresetVisualize = require('./PresetVisualize');
const PresetProgress = require('./PresetProgress');
const PresetReplace = require('./PresetReplace');
const PresetBabel = require('./PresetBabel');
const PresetTypeScript = require('./PresetTypeScript');
const PresetFlags = require('./PresetFlags');

const PresetAliasRequire = require('./PresetAliasRequire');
const PresetAliasResolve = require('./PresetAliasResolve');
const PresetEslint = require('./PresetEslint');
const PresetResolveAll = require('./PresetResolveAll');

module.exports = {
  DefaultsEnv,
  PresetNeutrino,
  PresetDefaultsRollup,
  PresetDefaultsFuseBox,
  PresetDefineEnv,
  PresetLibrary,
  PresetSourceMap,
  PresetTarget,
  PresetUglify,
  PresetMinify,
  PresetVisualize,
  PresetProgress,
  PresetReplace,
  PresetBabel,
  PresetTypeScript,
  PresetFlags,
  PresetAliasRequire,
  PresetAliasResolve,
  PresetEslint,
  PresetResolveAll
};