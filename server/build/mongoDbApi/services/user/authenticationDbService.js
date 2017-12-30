'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.updatePasswordAndTokenInUser = exports.updateResetPwdTokenInUser = exports.authenticateUser = exports.findUserByEMail = undefined;

var _validator = require('validator');

var _convertMongooseToReadableError = require('./../../convertMongooseToReadableError');

var _convertMongooseToReadableError2 = _interopRequireDefault(_convertMongooseToReadableError);

var _errorsApi = require('./../../../errorsApi');

var _models = require('./../../models');

var _userDbService = require('./userDbService');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @public
 * @function findUserByEMail
 * @description looks for the user
 * @param {string} email - email
 * @returns {Promise} of send email
 */
var findUserByEMail = function findUserByEMail(email) {
   if ((0, _validator.isEmail)(email)) {
      var userQuery = _models.userModel.findOne({
         email: email.toLowerCase()
      });

      return (0, _userDbService.findUser)(userQuery);
   } else {
      return Promise.reject(new _errorsApi.CustomError("WrongEMail", {
         message: "Please provide a correct E-Mail.",
         key: "email"
      }));
   }
};

/**
 * @public
 * @function authenticateUser
 * @description looks for the user and compares the password
 * @param {object} credentials - login credentials
 * @returns {Promise} of authenticated user
 */
var authenticateUser = function authenticateUser(credentials) {
   return findUserByEMail(credentials.email).then(function (knownUser) {
      return knownUser.comparePassword(credentials.password);
   });
};

/**
 * @public
 * @function updateResetPwdTokenInUser
 * @description updates the reset password token for user with the given id
 * @param {string} resetPasswordToken - token for resetting the password
 * @param {id} userId - id of user
 * @returns {Promise} of updated user
 */
var updateResetPwdTokenInUser = function updateResetPwdTokenInUser(resetPasswordToken, userId) {
   var set = {
      resetPasswordToken: resetPasswordToken
   };
   return _models.userModel.findByIdAndUpdate(userId, { $set: set }).exec().catch(_convertMongooseToReadableError2.default);
};

/**
 * @public
 * @function updatePasswordAndTokenInUser
 * @description resets the reset password token and changes the password for user with the given id
 * @param {string} password - new password
 * @param {string} confirmation - password confirmation
 * @param {string} resetPasswordToken - token for resetting the password
 * @param {object} user - user to update
 * @returns {Promise} of updated user
 */
var updatePasswordAndTokenInUser = function updatePasswordAndTokenInUser(password, confirmation, resetPasswordToken, user) {
   if (user.resetPasswordToken === resetPasswordToken) {
      if (password === confirmation) {
         var set = {
            password: password,
            resetPasswordToken: ""
         };
         return _models.userModel.findByIdAndUpdate(user.id, { $set: set }).exec().catch(_convertMongooseToReadableError2.default);
      } else {
         return Promise.reject(new _errorsApi.CustomError("NoConfirmation", {
            message: "Your password is not correctly confirmed.",
            key: "confirm"
         }));
      }
   } else {
      return Promise.reject(new _errorsApi.CustomError("OneTimeJwt", {
         message: "You already changed your password from this E-Mail.",
         key: "email"
      }));
   }
};

exports.findUserByEMail = findUserByEMail;
exports.authenticateUser = authenticateUser;
exports.updateResetPwdTokenInUser = updateResetPwdTokenInUser;
exports.updatePasswordAndTokenInUser = updatePasswordAndTokenInUser;