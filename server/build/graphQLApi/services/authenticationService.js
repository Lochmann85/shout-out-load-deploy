'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.addResolversTo = exports.mutations = exports.queries = exports.types = undefined;

var _graphqlTools = require('graphql-tools');

var _authenticationDbService = require('./../../mongoDbApi/services/user/authenticationDbService');

var _jwtService = require('./../../jwtApi/jwtService');

var types = '\ninterface IAuthorized {\n   id: ID!\n   name: String!\n   role: Role!\n}\ntype Viewer implements IUser, IAuthorized {\n   id: ID!\n   name: String!\n   token: String!\n   role: Role!\n}\ninput Credentials {\n   email: String\n   password: String\n}\n';

var queries = '\ngetViewer: Viewer!\n';

var _queriesResolver = {
   Query: {
      getViewer: function getViewer(_, args, _ref) {
         var viewer = _ref.viewer,
             tokenHandler = _ref.tokenHandler;

         return tokenHandler.encrypt(viewer).then(function (token) {
            viewer.token = token;
            return viewer;
         });
      }
   }
};

var mutations = '\nlogin(credentials: Credentials): Viewer!\nsendResetPassword(email: String): Boolean!\nresetPassword(password: String, token: String): Boolean!\n';

var _mutationsResolver = {
   Mutation: {
      login: function login(_, _ref2, _ref3) {
         var credentials = _ref2.credentials;
         var tokenHandler = _ref3.tokenHandler;

         var knownUser = null;
         return (0, _authenticationDbService.authenticateUser)(credentials).then(function (user) {
            knownUser = user;
            return tokenHandler.encrypt(knownUser);
         }).then(function (token) {
            return {
               id: knownUser.id,
               token: token
            };
         });
      },
      sendResetPassword: function sendResetPassword(_, _ref4) {
         var email = _ref4.email;

         return (0, _authenticationDbService.findUserByEMail)(email).then(function (knownUser) {
            return (0, _jwtService.createNewResetPasswordToken)(knownUser).then(function (token) {
               return (0, _authenticationDbService.updateResetPwdTokenInUser)(token, knownUser.id).then(function (user) {
                  return true;
               });
            });
         });
      },
      resetPassword: function resetPassword(_, _ref5) {
         var password = _ref5.password,
             token = _ref5.token;

         return true;
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