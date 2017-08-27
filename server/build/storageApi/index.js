'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.pendingShoutsQueue = exports.shownShoutsQueue = undefined;

var _ShownShoutsQueue = require('./ShownShoutsQueue');

var _ShownShoutsQueue2 = _interopRequireDefault(_ShownShoutsQueue);

var _BaseQueue = require('./BaseQueue');

var _BaseQueue2 = _interopRequireDefault(_BaseQueue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pendingShoutsQueue = new _BaseQueue2.default();

var shownShoutsQueue = new _ShownShoutsQueue2.default(pendingShoutsQueue);

exports.shownShoutsQueue = shownShoutsQueue;
exports.pendingShoutsQueue = pendingShoutsQueue;