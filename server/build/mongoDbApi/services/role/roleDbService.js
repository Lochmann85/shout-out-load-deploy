'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.findDefaultRole = exports.deleteRole = exports.updateRole = exports.createRole = exports.findRoleById = exports.findAllRoles = undefined;

var _models = require('./../../models');

var _convertMongooseToReadableError = require('./../../convertMongooseToReadableError');

var _convertMongooseToReadableError2 = _interopRequireDefault(_convertMongooseToReadableError);

var _errorsApi = require('./../../../errorsApi');

var _userDbService = require('./../user/userDbService');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @private
 * @member staticRoleError
 * @description error for static roles
 */
var staticRoleError = new _errorsApi.CustomError("StaticRole", {
   message: "The static role cannot be changed.",
   key: ""
});

/**
 * @private
 * @member staticDefaultRoleName
 * @description name of the default role
 */
var staticDefaultRoleName = "whisperer";

/**
 * @public
 * @function findAllRoles
 * @description looks for all roles
 * @returns {Promise} of roles
 */
var findAllRoles = function findAllRoles() {
   return _models.roleModel.find().populate("rules").exec().catch(function (error) {
      return new _errorsApi.MongooseSingleError(error);
   });
};

/**
 * @private
 * @function _findRole
 * @description searches a role from the given mongoose query
 * @param {obejct} mongooseQuery - the query for the user
 * @returns {Promise} of known user
 */
var _findRole = function _findRole(mongooseQuery) {
   return new Promise(function (resolve, reject) {
      mongooseQuery.populate("rules").exec().then(function (knownRole) {
         if (knownRole) {
            resolve(knownRole);
         } else {
            reject(new _errorsApi.CustomError("UnknownRole", {
               message: "Role not known.",
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
 * @function findRoleById
 * @description looks for the role for the given id
 * @param {string} roleId - role id
 * @returns {Promise} of role
 */
var findRoleById = function findRoleById(roleId) {
   var roleQuery = _models.roleModel.findById(roleId);

   return _findRole(roleQuery);
};

/**
 * @public
 * @function createRole
 * @description creates a new role
 * @param {object} roleData - data for the new role
 * @returns {Promise} of new role
 */
var createRole = function createRole(roleData) {
   roleData.isStatic = false;
   var role = new _models.roleModel(roleData); // eslint-disable-line new-cap

   return role.save().then(function (newRole) {
      return findRoleById(newRole.id);
   }).catch(_convertMongooseToReadableError2.default);
};

/**
 * @public
 * @function updateRole
 * @description update the rolename
 * @param {object} roleData - data, to update the role
 * @returns {Promise} of updated role
 */
var updateRole = function updateRole(roleData, roleId) {
   var set = {
      name: roleData.name,
      rules: roleData.rules
   };
   return findRoleById(roleId).then(function (role) {
      if (role.isStatic) {
         return Promise.reject(staticRoleError);
      } else {
         return _models.roleModel.findByIdAndUpdate(roleId, { $set: set }).populate("rules").exec().catch(_convertMongooseToReadableError2.default);
      }
   });
};

/**
 * @public
 * @function findDefaultRole
 * @description finds the default role for a user
 * @returns {Promise} of default role
 */
var findDefaultRole = function findDefaultRole() {
   var roleQuery = _models.roleModel.findOne({ name: staticDefaultRoleName });

   return _findRole(roleQuery);
};

/**
 * @private
 * @function _updateRelatedUser
 * @description changes the role of the users to the default one
 * @param {object} role - role
 * @returns {Promise} of default role
 */
var _updateRelatedUser = function _updateRelatedUser(role) {
   return findDefaultRole().then(function (defaultRole) {
      var searchParams = { role: role.id },
          set = { role: defaultRole.id };
      return (0, _userDbService.updateUsers)(searchParams, set).then(function () {
         return defaultRole;
      });
   });
};

/**
 * @public
 * @function deleteRole
 * @description deletes the role with the given id
 * @param {id} roleId - id of role
 * @returns {Promise} of default role
 */
var deleteRole = function deleteRole(roleId) {
   return findRoleById(roleId).then(function (role) {
      if (role.isStatic) {
         return Promise.reject(staticRoleError);
      } else {
         return _models.roleModel.findByIdAndRemove(roleId).exec().then(function (role) {
            if (role) {
               return _updateRelatedUser(role);
            } else {
               return Promise.reject({
                  errors: [{ message: 'Could not find role to delete' }]
               });
            }
         }).catch(function (error) {
            return (0, _convertMongooseToReadableError2.default)(error);
         });
      }
   });
};

exports.findAllRoles = findAllRoles;
exports.findRoleById = findRoleById;
exports.createRole = createRole;
exports.updateRole = updateRole;
exports.deleteRole = deleteRole;
exports.findDefaultRole = findDefaultRole;