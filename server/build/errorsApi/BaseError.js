"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

/**
 * @public
 * @function constructor
 * @description the constructor for the base error
 * @param {object} errors - The error object containing message and key.
 */
function BaseError(errors) {
   var error = {};
   error.status = this.status;

   var message = null;
   try {
      message = JSON.stringify(errors);
   } catch (error) {
      message = error;
   }
   error.message = message;

   this.message = JSON.stringify(error);
}
BaseError.prototype = Object.create(Error.prototype);

exports.default = BaseError;