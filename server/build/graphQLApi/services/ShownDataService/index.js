"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.addResolversTo = exports.queries = exports.types = undefined;

var _graphqlTools = require("graphql-tools");

var shouts = [{
   message: "In",
   type: "Custom"
}, {
   message: "Your",
   type: "Custom"
}, {
   message: "Face",
   type: "Custom"
}];

var types = "\n      type Shout {\n         message: String!\n         type: String!\n      }\n   ";

var queries = "\n      getShoutsQueue: [Shout!]!\n ";

var _queriesResolver = {
   Query: {
      getShoutsQueue: function getShoutsQueue() {
         return shouts;
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