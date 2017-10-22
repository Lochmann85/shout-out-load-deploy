'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.addResolversTo = exports.queries = exports.types = undefined;

var _graphqlTools = require('graphql-tools');

var _ruleDbService = require('./../../mongoDbApi/services/rule/ruleDbService');

var types = '\ntype Rule {\n   id: ID!\n   name: String!\n}';

var queries = '\ngetAllRules: [Rule!]\n';

var _queriesResolver = {
   Query: {
      getAllRules: function getAllRules() {
         return (0, _ruleDbService.findAllRules)();
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