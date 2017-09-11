'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.initializeDbModels = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _schemas = {};

/**
 * @description initializes all models and saves them as .model-name
 */
var directories = _fs2.default.readdirSync(__dirname).filter(function (file) {
   return _fs2.default.statSync(_path2.default.join(__dirname, file)).isDirectory();
});

directories.forEach(function (modelDirectory) {
   var requirePath = _path2.default.join(__dirname, modelDirectory, modelDirectory + 'Model');
   _schemas[modelDirectory + 'Model'] = require(requirePath).default;
});

var initializeDbModels = function initializeDbModels(mongoDbConnection) {
   Object.keys(_schemas).forEach(function (key) {
      var model = mongoDbConnection.model(_schemas[key].name, _schemas[key].schema);

      if (model.instantiateInternalModels instanceof Function) {
         model.instantiateInternalModels(mongoDbConnection);
      }

      exports[key] = model;
   });
};

exports.initializeDbModels = initializeDbModels;