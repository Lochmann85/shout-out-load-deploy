"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.addResolversTo = exports.queries = exports.types = undefined;

var _graphqlTools = require("graphql-tools");

var types = "\n      type ShownData {\n         value: Float!\n      }\n   ";

var queries = "\n      getShownData: String\n ";

var _queriesResolver = {
   Query: {
      getShownData: function getShownData() {
         return "test";
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