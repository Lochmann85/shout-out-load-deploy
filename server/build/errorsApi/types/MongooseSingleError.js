"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _InternalServerError = require("./InternalServerError");

var _InternalServerError2 = _interopRequireDefault(_InternalServerError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @public
 * @function constructor
 * @description the constructor for a single mongoose error
 * @param {object} error - The error object containing message.
 */
function MongooseSingleError(error) {
   _InternalServerError2.default.call(this, {
      message: error.message,
      key: "MONGOOSE_ERROR"
   });
}
MongooseSingleError.prototype = Object.create(_InternalServerError2.default.prototype);

exports.default = MongooseSingleError;