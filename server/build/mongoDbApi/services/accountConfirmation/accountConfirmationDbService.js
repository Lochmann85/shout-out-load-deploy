'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.deleteAccountConfirmation = exports.createAccountConfirmation = undefined;

var _models = require('./../../models');

var _convertMongooseToReadableError = require('./../../convertMongooseToReadableError');

var _convertMongooseToReadableError2 = _interopRequireDefault(_convertMongooseToReadableError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @private
 * @function _handleError
 * @description handles the validation error
 * @param {object} errors - the errors object mongoose conform
 * @returns {Promise} of rejected errors
 */
var _handleError = function _handleError(errors) {
   if (Object.keys(errors).length !== 0) {
      var error = { errors: errors };
      return Promise.reject(error);
   } else {
      return Promise.resolve(true);
   }
};

/**
 * @public
 * @function createAccountConfirmation
 * @description creates a new account that is not active
 * @param {object} newAccount - the new account data
 * @param {object} tokenHandler - the token handler
 * @returns {Promise} of created user
 */
var createAccountConfirmation = function createAccountConfirmation(newAccount, tokenHandler) {
   var errors = {};
   var accountConfirmation = null;

   return _models.userModel.find({ $or: [{ email: newAccount.email }, { name: newAccount.name }] }).then(function (users) {
      if (users.findIndex(function (user) {
         return user.email === newAccount.email;
      }) > -1) {
         errors.email = {
            message: "There already exists a user with the given email."
         };
      }
      if (users.findIndex(function (user) {
         return user.name === newAccount.name;
      }) > -1) {
         errors.name = {
            message: "There already exists a user with the given name."
         };
      }

      if (newAccount.email) {
         newAccount.email = newAccount.email.toLowerCase();
      }
      accountConfirmation = new _models.accountConfirmationModel(newAccount); // eslint-disable-line new-cap

      return tokenHandler.encrypt(accountConfirmation);
   }).then(function (jwtToken) {
      accountConfirmation.confirmAccountToken = jwtToken;

      return accountConfirmation.validate().catch(function (error) {
         Object.assign(errors, error.errors);
         return _handleError(errors);
      });
   }).then(function () {
      return _handleError(errors);
   }).then(function () {
      return accountConfirmation.save();
   }).catch(_convertMongooseToReadableError2.default);
};

/**
 * @public
 * @function deleteAccountConfirmation
 * @description deletes the account confirmation with the given id
 * @param {id} accountConfirmationId - id of account confirmation
 * @returns {Promise} of deleted account confirmation
 */
var deleteAccountConfirmation = function deleteAccountConfirmation(accountConfirmationId) {
   return _models.accountConfirmationModel.findByIdAndRemove(accountConfirmationId).catch(function (error) {
      return (0, _convertMongooseToReadableError2.default)(error);
   });
};

exports.createAccountConfirmation = createAccountConfirmation;
exports.deleteAccountConfirmation = deleteAccountConfirmation;