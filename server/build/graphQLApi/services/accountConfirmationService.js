'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.addResolversTo = exports.mutations = exports.types = undefined;

var _graphqlTools = require('graphql-tools');

var _accountConfirmationDbService = require('./../../mongoDbApi/services/accountConfirmation/accountConfirmationDbService');

var _sendEMailService = require('./../../sendEMailApi/sendEMailService');

var types = '\ninput NewAccount {\n   email: String\n   name: String\n   password: String\n}\n';

var mutations = '\nsignup(newAccount: NewAccount): Boolean!\n';

var _mutationsResolver = {
   Mutation: {
      signup: function signup(_, _ref, _ref2) {
         var newAccount = _ref.newAccount;
         var tokenHandler = _ref2.tokenHandler;

         return (0, _accountConfirmationDbService.createAccountConfirmation)(newAccount, tokenHandler).then(function (accoutnConfirmation) {
            return (0, _sendEMailService.sendEMail)(_sendEMailService.signupTemplate, accoutnConfirmation);
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
   (0, _graphqlTools.addResolveFunctionsToSchema)(executableSchema, _mutationsResolver);
};

exports.types = types;
exports.mutations = mutations;
exports.addResolversTo = addResolversTo;