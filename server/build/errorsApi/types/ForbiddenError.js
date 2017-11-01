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
 * @description the constructor for a forbidden error
 */
function ForbiddenError() {
   this.name = "Forbidden";
   this.status = 403;

   _BaseError2.default.call(this, {
      message: "You have the wrong permissions.",
      key: "NOT_ALLOWED"
   });
}
ForbiddenError.prototype = Object.create(_BaseError2.default.prototype);

exports.default = ForbiddenError;