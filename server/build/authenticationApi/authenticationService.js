'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SubscriptionAuthenticationMiddleware = require('./middlewares/SubscriptionAuthenticationMiddleware');

Object.defineProperty(exports, 'SubscriptionAuthenticationMiddleware', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SubscriptionAuthenticationMiddleware).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }