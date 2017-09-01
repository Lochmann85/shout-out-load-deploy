'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.storeUpdater = exports.pendingShoutsQueue = exports.shownShoutsQueue = exports.currentShownShout = undefined;

var _ShownShoutsQueue = require('./ShownShoutsQueue');

var _ShownShoutsQueue2 = _interopRequireDefault(_ShownShoutsQueue);

var _BaseQueue = require('./BaseQueue');

var _BaseQueue2 = _interopRequireDefault(_BaseQueue);

var _StoreUpdater = require('./StoreUpdater');

var _StoreUpdater2 = _interopRequireDefault(_StoreUpdater);

var _shoutApi = require('./../shoutApi');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pendingShoutsQueue = new _BaseQueue2.default();

var shownShoutsQueue = new _ShownShoutsQueue2.default();

var currentShownShout = new _shoutApi.EmptyShout();

var storeUpdater = new _StoreUpdater2.default(pendingShoutsQueue, shownShoutsQueue, currentShownShout);

exports.currentShownShout = currentShownShout;
exports.shownShoutsQueue = shownShoutsQueue;
exports.pendingShoutsQueue = pendingShoutsQueue;
exports.storeUpdater = storeUpdater;