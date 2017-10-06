"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _BaseError = require("./../BaseError");

var _BaseError2 = _interopRequireDefault(_BaseError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @public
 * @function constructor
 * @description the constructor for a unauthorized error
 */
function UnauthorizedError() {
   this.name = "Unauthorized";
   this.status = 401;

   _BaseError2.default.call(this, {
      message: "Please log in.",
      key: "NOT_LOGGED_IN"
   });
}
UnauthorizedError.prototype = Object.create(_BaseError2.default.prototype);

exports.default = UnauthorizedError;