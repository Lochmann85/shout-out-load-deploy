'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.addResolversTo = exports.mutations = exports.queries = exports.types = undefined;

var _graphqlTools = require('graphql-tools');

var _errorsApi = require('./../../errorsApi');

var _jwtService = require('./../../jwtApi/jwtService');

var _accountConfirmationDbService = require('./../../mongoDbApi/services/accountConfirmation/accountConfirmationDbService');

var _sendEMailService = require('./../../sendEMailApi/sendEMailService');

var types = '\ninput NewAccount {\n   email: String\n   name: String\n   password: String\n}\n';

var queries = '\nsignupConfirmation(signupToken: String!): String!\n';

var mutations = '\nsignup(newAccount: NewAccount): Boolean!\n';

var _queriesResolver = {
   Query: {
      signupConfirmation: function signupConfirmation(_, _ref, _ref2) {
         var signupToken = _ref.signupToken;
         var tokenHandler = _ref2.tokenHandler;

         return tokenHandler.validate(signupToken).then(function (tokenData) {
            return (0, _accountConfirmationDbService.findAccountConfirmation)(tokenData.userId);
         }).then(function (accountConfirmation) {
            if (accountConfirmation) {
               return (0, _accountConfirmationDbService.createUserFromAccountConfirmation)(accountConfirmation);
            } else {
               return Promise.reject(new _errorsApi.CustomError("SignupConfirmation", {
                  message: "The signup E-Mail is expired. Please try again.",
                  key: "token"
               }));
            }
         }).then(function (user) {
            var tokenHandler = new _jwtService.GraphQLTokenHandler();
            return tokenHandler.encrypt(user);
         });
      }
   }
};

var _mutationsResolver = {
   Mutation: {
      signup: function signup(_, _ref3, _ref4) {
         var newAccount = _ref3.newAccount;
         var tokenHandler = _ref4.tokenHandler;

         return (0, _accountConfirmationDbService.createAccountConfirmation)(newAccount, tokenHandler).then(function (accountConfirmation) {
            return (0, _sendEMailService.sendEMail)(_sendEMailService.signupTemplate, accountConfirmation);
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