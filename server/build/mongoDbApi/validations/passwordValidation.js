"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});
var PASSWORD_LENGTH = 6;

exports.default = {
   validator: function validator(newPassword) {
      return newPassword.length >= PASSWORD_LENGTH;
   },
   message: "The new password is not of the required length (6+)."
};