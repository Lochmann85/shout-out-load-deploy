'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _searchPath = _path2.default.join(__dirname, "types");

/**
 * @description initializes all errors and saves them as .Error-name
 */
var files = _fs2.default.readdirSync(_searchPath);

files.forEach(function (errorFile) {
  var moduleName = errorFile.split(".")[0];

  exports[moduleName] = require(_path2.default.join(_searchPath, errorFile)).default;
});