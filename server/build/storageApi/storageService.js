'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.storeUpdater = exports.initializeStoreUpdater = undefined;

var _StoreUpdater = require('./StoreUpdater');

var _StoreUpdater2 = _interopRequireDefault(_StoreUpdater);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storeUpdater = void 0;

/**
 * @public
 * @function initializeStoreUpdater
 * @description store updater needs to be initialized after the models
 */
var initializeStoreUpdater = function initializeStoreUpdater() {
   exports.storeUpdater = storeUpdater = new _StoreUpdater2.default();
};

exports.initializeStoreUpdater = initializeStoreUpdater;
exports.storeUpdater = storeUpdater;