'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BaseError = require('./../BaseError');

var _BaseError2 = _interopRequireDefault(_BaseError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @public
 * @function constructor
 * @description the constructor for a custom error
 * @param {string} name - The name of the error.
 * @param {object} errors - The error object containing message and key.
 */
function CustomError(name, errors) {
  this.name = name;
  this.status = 500;

  _BaseError2.default.call(this, errors);
}
CustomError.prototype = Object.create(_BaseError2.default.prototype);

exports.default = CustomError;