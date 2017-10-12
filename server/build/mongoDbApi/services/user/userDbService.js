'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.deleteUser = exports.changeUserPassword = exports.updateUsers = exports.updateUser = exports.createUser = exports.findAllUsers = exports.findUserById = exports.findUser = undefined;

var _models = require('./../../models');

var _convertMongooseToReadableError = require('./../../convertMongooseToReadableError');

var _convertMongooseToReadableError2 = _interopRequireDefault(_convertMongooseToReadableError);

var _errorsApi = require('./../../../errorsApi');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @private
 * @function _populated
 * @description adds the needed user population
 * @returns {Promise} of mongoose query
 */
var _populated = function _populated(query) {
   return query.populate("role").populate({ path: "role", populate: { path: "rules" } }).exec();
};

/**
 * @public
 * @function findUser
 * @description searches a user from the given mongoose query
 * @param {obejct} mongooseQuery - the query for the user
 * @returns {Promise} of known user
 */
var findUser = function findUser(mongooseQuery) {
   return new Promise(function (resolve, reject) {
      _populated(mongooseQuery).then(function (knownUser) {
         if (knownUser) {
            resolve(knownUser);
         } else {
            reject(new _errorsApi.CustomError("UnknownUser", {
               message: "User not known.",
               key: "name"
            }));
         }
      }).catch(function (error) {
         return reject(new _errorsApi.MongooseSingleError(error));
      });
   });
};

/**
 * @public
 * @function findUserById
 * @description looks for the user for the given id
 * @param {string} userId - user id
 * @returns {Promise} of user
 */
var findUserById = function findUserById(userId) {
   var userQuery = _models.userModel.findById(userId);

   return findUser(userQuery);
};

/**
 * @public
 * @function findAllUsers
 * @description looks for all users
 * @returns {Promise} of users
 */
var findAllUsers = function findAllUsers() {
   return _populated(_models.userModel.find()).catch(function (error) {
      return new _errorsApi.MongooseSingleError(error);
   });
};

/**
 * @public
 * @function createUser
 * @description creates a new user
 * @param {object} userData - data for the new user
 * @returns {Promise} of new user
 */
var createUser = function createUser(userData) {
   var user = new _models.userModel(userData); // eslint-disable-line new-cap

   return user.save().then(function (newUser) {
      return findUserById(newUser.id);
   }).catch(_convertMongooseToReadableError2.default);
};

/**
 * @public
 * @function updateUser
 * @description updates the user with the given id
 * @param {object} userData - data for the user
 * @param {id} userId - id of user
 * @returns {Promise} of updated user
 */
var updateUser = function updateUser(userData, userId) {
   var set = {
      email: userData.email,
      name: userData.name
   };
   if (userData.role) {
      set.role = userData.role;
   }
   return _populated(_models.userModel.findByIdAndUpdate(userId, { $set: set })).catch(_convertMongooseToReadableError2.default);
};

/**
 * @public
 * @function updateUsers
 * @description updates users with the given search object and sets the given set
 * @param {object} searchParams - params for the find
 * @param {object} set - the new set for the update
 * @returns {Promise} of updated user
 */
var updateUsers = function updateUsers(searchParams, set) {
   return _models.userModel.update(searchParams, { $set: set }, { multi: true }).exec();
};

/**
 * @public
 * @function changeUserPassword
 * @description updates users password with the given id
 * @param {object} passwordChangeData - data for the password change: oldPW, newPW and confirmPW
 * @param {id} userId - id of user
 * @returns {Boolean} if updated true
 */
var changeUserPassword = function changeUserPassword(passwordChangeData, userId) {
   return new Promise(function (resolve, reject) {
      findUserById(userId).then(function (user) {
         var errors = [];

         if (passwordChangeData.password === passwordChangeData.new) {
            errors.push({
               key: "new",
               message: 'The new password must not be the same as the old one.'
            });
         }

         if (passwordChangeData.new !== passwordChangeData.confirm) {
            errors.push({
               key: "confirm",
               message: 'New password is not confirmed.'
            });
         }

         user.comparePassword(passwordChangeData.password).then(function (validUser) {
            if (errors.length === 0) {
               _models.userModel.findByIdAndUpdate(userId, {
                  $set: {
                     password: passwordChangeData.new
                  }
               }).exec().then(function () {
                  return resolve(true);
               }).catch(function (error) {
                  return (0, _convertMongooseToReadableError2.default)(error).catch(reject);
               });
            } else {
               reject(new _errorsApi.CustomError("ChangePassword", errors));
            }
         }).catch(function () {
            errors.push({
               key: "password",
               message: "Please provide the correct password."
            });
            reject(new _errorsApi.CustomError("ChangePassword", errors));
         });
      });
   });
};

/**
 * @public
 * @function deleteUser
 * @description deletes the user with the given id
 * @param {id} userId - id of user
 * @returns {Promise} of deleted user
 */
var deleteUser = function deleteUser(userId) {
   return _populated(_models.userModel.findByIdAndRemove(userId)).then(function (user) {
      if (user) {
         return user;
      } else {
         return Promise.reject({
            errors: [{ message: 'Could not find user to delete' }]
         });
      }
   }).catch(function (error) {
      return (0, _convertMongooseToReadableError2.default)(error);
   });
};

exports.findUser = findUser;
exports.findUserById = findUserById;
exports.findAllUsers = findAllUsers;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.updateUsers = updateUsers;
exports.changeUserPassword = changeUserPassword;
exports.deleteUser = deleteUser;