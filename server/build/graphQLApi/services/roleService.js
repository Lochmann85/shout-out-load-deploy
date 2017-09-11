'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.addResolversTo = exports.mutations = exports.queries = exports.types = undefined;

var _graphqlTools = require('graphql-tools');

var _roleDbService = require('./../../mongoDbApi/services/role/roleDbService');

// import { and } from './../../helper/compositions';
// import { roleAdministration, notOwnRole } from './../../authorizationApi/authorizationService';

var types = '\ntype Role {\n   id: ID!\n   name: String!\n   createdAt: String!\n   isStatic: Boolean!\n   rules: [Rule!]\n}\ninput RoleData {\n   name: String\n   rules: [RuleData]\n}';

var queries = '\n   getAllRoles: [Role!]\n   getRole(roleId: ID!): Role!\n';

var mutations = '\n   createRole(roleData: RoleData!): Role!\n   updateRole(roleData: RoleData!, roleId: ID!): Role!\n   deleteRole(roleId: ID!): Role!\n';

var _queriesResolver = {
   Query: {
      getAllRoles: /*roleAdministration("r")*/function getAllRoles() {
         return (0, _roleDbService.findAllRoles)();
      },
      getRole: /*roleAdministration("r")*/function getRole(_, _ref) {
         var roleId = _ref.roleId;

         return (0, _roleDbService.findRoleById)(roleId);
      }
   }
};

var _mutationsResolver = {
   Mutation: {
      createRole: /*roleAdministration("rw")*/function createRole(_, _ref2) {
         var roleData = _ref2.roleData;

         return (0, _roleDbService.createRole)(roleData);
      },
      updateRole: /*and(roleAdministration("rw"), notOwnRole())*/function updateRole(_, _ref3, _ref4) {
         var roleData = _ref3.roleData,
             roleId = _ref3.roleId;
         var viewer = _ref4.viewer;

         return (0, _roleDbService.updateRole)(roleData, roleId);
      },
      deleteRole: /*and(roleAdministration("rd"), notOwnRole())*/function deleteRole(_, _ref5) {
         var roleId = _ref5.roleId;

         return (0, _roleDbService.deleteRole)(roleId);
      }
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