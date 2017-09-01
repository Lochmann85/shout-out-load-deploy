'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CustomShout = require('./shouts/CustomShout');

Object.defineProperty(exports, 'CustomShout', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_CustomShout).default;
  }
});

var _EmptyShout = require('./shouts/EmptyShout');

Object.defineProperty(exports, 'EmptyShout', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_EmptyShout).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }