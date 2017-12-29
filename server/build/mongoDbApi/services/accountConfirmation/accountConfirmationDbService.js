'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.createUserFromAccountConfirmation = exports.deleteAccountConfirmation = exports.createAccountConfirmation = exports.findAccountConfirmation = undefined;

var _models = require('./../../models');

var _roleDbService = require('./../role/roleDbService');

var _convertMongooseToReadableError = require('./../../convertMongooseToReadableError');

var _convertMongooseToReadableError2 = _interopRequireDefault(_convertMongooseToReadableError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @public
 * @function findAccountConfirmation
 * @description finds the account confirmation with the given id
 * @param {id} accountConfirmationId - id of account confirmation
 * @returns {Promise} of found account confirmation
 */
var findAccountConfirmation = function findAccountConfirmation(accountConfirmationId) {
   return _models.accountConfirmationModel.findById(accountConfirmationId).catch(_convertMongooseToReadableError2.default);
};

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

   if (newAccount.email) {
      newAccount.email = newAccount.email.toLowerCase();
   }

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
   return _models.accountConfirmationModel.findByIdAndRemove(accountConfirmationId).catch(_convertMongooseToReadableError2.default);
};

/**
 * @public
 * @function createUserFromAccountConfirmation
 * @description creates a user from the account confirmation data
 * @param {object} accountConfirmation - account confirmation
 * @returns {Promise} of user
 */
var createUserFromAccountConfirmation = function createUserFromAccountConfirmation(accountConfirmation) {
   return (0, _roleDbService.findDefaultRole)().then(function (defaultRole) {
      var email = accountConfirmation.email,
          name = accountConfirmation.name,
          password = accountConfirmation.password;

      var newUser = {
         email: email,
         name: name,
         password: password,
         role: defaultRole.id
      };
      return newUser;
   }).then(function (newUser) {
      return deleteAccountConfirmation(accountConfirmation.id).then(function () {
         return newUser;
      });
   }).then(function (newUser) {
      var user = new _models.userModel(newUser); // eslint-disable-line new-cap
      return user.save();
   }).catch(_convertMongooseToReadableError2.default);
};

exports.findAccountConfirmation = findAccountConfirmation;
exports.createAccountConfirmation = createAccountConfirmation;
exports.deleteAccountConfirmation = deleteAccountConfirmation;
exports.createUserFromAccountConfirmation = createUserFromAccountConfirmation;