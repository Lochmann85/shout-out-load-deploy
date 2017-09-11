'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.addResolversTo = exports.queries = exports.types = undefined;

var _graphqlTools = require('graphql-tools');

// import {
//    roleAdministration,
// } from './../../authorizationApi/authorizationService';

// import { possibleRules } from './../../authorizationApi/possibleRules';

var types = '\ntype Ruleset {\n   read: Boolean!\n   write: Boolean!\n   delete: Boolean!\n}\ntype Rule {\n   id: ID!\n   name: String!\n   ruleset: Ruleset!\n}\ninput RuleData {\n   name: String\n   ruleset: RulesetData\n}\ninput RulesetData {\n   read: Boolean\n   write: Boolean\n   delete: Boolean\n}';

var queries = '\ngetAllRuleNames: [String!]\n';

var _queriesResolver = {
   Query: {
      getAllRuleNames: /*roleAdministration("rw")*/function getAllRuleNames() {
         return null;
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
};

exports.types = types;
exports.queries = queries;
exports.addResolversTo = addResolversTo;