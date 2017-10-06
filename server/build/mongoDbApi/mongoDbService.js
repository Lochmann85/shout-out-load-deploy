'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.initializeMongoDb = undefined;

var _models = require('./models');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

/**
 * @public
 * @function initializeMongoDb
 * @description Initializes the connection to the mongoDb
 * @param {object} config - server configuration
 * @returns {Promise} of initialization
 */
var initializeMongoDb = function initializeMongoDb(config) {
   return new Promise(function (resolve, reject) {
      _mongoose2.default.createConnection(config.MONGODB_URI, {
         useMongoClient: true
      }).then(function (connection) {
         (0, _models.initializeDbModels)(connection);
      }).then(function () {
         console.log('Connected to mongoDb on ' + config.MONGODB_URI); // eslint-disable-line no-console
         resolve();
      }).catch(reject);
   });
};

exports.initializeMongoDb = initializeMongoDb;