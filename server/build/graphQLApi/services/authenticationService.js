'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.addResolversTo = exports.mutations = exports.queries = exports.types = undefined;

var _graphqlTools = require('graphql-tools');

var _authenticationDbService = require('./../../mongoDbApi/services/user/authenticationDbService');

var _jwtService = require('./../../jwtApi/jwtService');

var types = '\ninterface IAuthorized {\n   id: ID!\n   name: String!\n   role: Role!\n}\ntype Viewer implements IUser, IAuthorized {\n   id: ID!\n   name: String!\n   token: String!\n   role: Role!\n}\ninput Credentials {\n   name: String\n   password: String\n}\n';

var queries = '\ngetViewer: Viewer!\n';

var _queriesResolver = {
   Query: {
      getViewer: function getViewer(_, args, context) {
         var knownViewer = context.viewer;

         return (0, _jwtService.createNewToken)(knownViewer).then(function (token) {
            return {
               id: knownViewer.id,
               name: knownViewer.name,
               role: knownViewer.role,
               token: token
            };
         });
      }
   }
};

var mutations = '\nlogin(credentials: Credentials): Viewer!\n';

var _mutationsResolver = {
   Mutation: {
      login: function login(_, _ref) {
         var credentials = _ref.credentials;

         var knownUser = null;
         return (0, _authenticationDbService.authenticateUser)(credentials).then(function (user) {
            knownUser = user;
            return (0, _jwtService.createNewToken)(knownUser);
         }).then(function (token) {
            return {
               id: knownUser.id,
               name: knownUser.name,
               token: token
            };
         });
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