'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.addResolversTo = exports.mutations = exports.queries = exports.types = undefined;

var _graphqlTools = require('graphql-tools');

var _roleDbService = require('./../../mongoDbApi/services/role/roleDbService');

var _authorizationService = require('./../../authorizationApi/authorizationService');

var readRole = new _authorizationService.ReadRoleChecker();
var createRoleRead = new _authorizationService.ReadRoleChecker();
var updateRoleRead = new _authorizationService.ReadRoleChecker();
var deleteRoleRead = new _authorizationService.ReadRoleChecker();

var types = '\ntype Role {\n   id: ID!\n   name: String!\n   createdAt: String!\n   isStatic: Boolean!\n   rules: [Rule!]\n}\ninput RoleData {\n   name: String\n   rules: [ID!]\n}';

var queries = '\n   getAllRoles: [Role!]\n   getRole(roleId: ID!): Role!\n';

var mutations = '\n   createRole(roleData: RoleData): Role!\n   updateRole(roleData: RoleData, roleId: ID!): Role!\n   deleteRole(roleId: ID!): Role!\n';

var _queriesResolver = {
   Query: {
      getAllRoles: (0, _authorizationService.authorizationMiddleware)(readRole)(function () {
         return (0, _roleDbService.findAllRoles)();
      }),
      getRole: (0, _authorizationService.authorizationMiddleware)(readRole)(function (_, _ref) {
         var roleId = _ref.roleId;

         return (0, _roleDbService.findRoleById)(roleId);
      })
   }
};

var _mutationsResolver = {
   Mutation: {
      createRole: (0, _authorizationService.authorizationMiddleware)(createRoleRead.and(_authorizationService.WriteRoleChecker))(function (_, _ref2) {
         var roleData = _ref2.roleData;

         return (0, _roleDbService.createRole)(roleData);
      }),
      updateRole: (0, _authorizationService.authorizationMiddleware)(updateRoleRead.and(_authorizationService.WriteRoleChecker).and(_authorizationService.NotOwnRoleChecker))(function (_, _ref3, _ref4) {
         var roleData = _ref3.roleData,
             roleId = _ref3.roleId;
         var viewer = _ref4.viewer;

         return (0, _roleDbService.updateRole)(roleData, roleId);
      }),
      deleteRole: (0, _authorizationService.authorizationMiddleware)(deleteRoleRead.and(_authorizationService.DeleteRoleChecker).and(_authorizationService.NotOwnRoleChecker))(function (_, _ref5) {
         var roleId = _ref5.roleId;

         return (0, _roleDbService.deleteRole)(roleId);
      })
   }
};

/**
 * @public
 * @function addResolversTo
 * @description adds the resolvers to the executable schema
 * @param {any} executableSchema - the executable schema
 */
var addResolversTo = function addResolversTo(executableSchema) {
   (0, _graphqlTools.addResolveFunctionsToSchema)(executableSchema, _queriesResolver);
   (0, _graphqlTools.addResolveFunctionsToSchema)(executableSchema, _mutationsResolver);
};

exports.types = types;
exports.queries = queries;
exports.mutations = mutations;
exports.addResolversTo = addResolversTo;