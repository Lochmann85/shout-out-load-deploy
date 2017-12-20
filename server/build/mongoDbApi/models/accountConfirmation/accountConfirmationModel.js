'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _validations = require('./../../validations');

var _passwordEncription = require('./../../passwordEncription');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var accountConfirmationSchema = new _mongoose2.default.Schema({
   email: {
      type: String,
      required: true,
      validate: _validations.emailValidation
   },
   name: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true,
      validate: _validations.passwordValidation
   },
   confirmAccountToken: {
      type: String,
      required: true
   }
});

/**
 * @private
 * @function pre("save")
 * @description pre save middleware, hashes the password of each new accountConfirmation
 */
accountConfirmationSchema.pre("save", function (next) {
   var newAccountConfirmation = this;

   // only hash the password if it has been modified (or is new)
   if (!newAccountConfirmation.isModified("password")) return next();

   (0, _passwordEncription.continueWithHashedPassword)(next, newAccountConfirmation);
});

exports.default = {
   schema: accountConfirmationSchema,
   name: "AccountConfirmation"
};