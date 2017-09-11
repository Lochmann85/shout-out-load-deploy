'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.authenticateUser = undefined;

var _models = require('./../../models');

var _userDbService = require('./userDbService');

/**
 * @public
 * @function authenticateUser
 * @description looks for the user and compares the password
 * @param {object} credentials - login credentials
 * @returns {Promise} of authenticated user
 */
var authenticateUser = function authenticateUser(credentials) {
   var userQuery = _models.userModel.findOne({ name: credentials.name });

   return (0, _userDbService.findUser)(userQuery).then(function (knownUser) {
      return knownUser.comparePassword(credentials.password);
   });
};

exports.authenticateUser = authenticateUser;