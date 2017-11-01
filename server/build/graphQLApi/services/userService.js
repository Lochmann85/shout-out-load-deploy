'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.addResolversTo = exports.mutations = exports.queries = exports.types = undefined;

var _graphqlTools = require('graphql-tools');

var _errorsApi = require('./../../errorsApi');

var _userDbService = require('./../../mongoDbApi/services/user/userDbService');

var _authorizationService = require('./../../authorizationApi/authorizationService');

var readUser = new _authorizationService.ReadUserChecker();
var createUserRead = new _authorizationService.ReadUserChecker();
var updateUserRead = new _authorizationService.ReadUserChecker();
var updatePasswordRead = new _authorizationService.ReadUserChecker();
var deleteUserRead = new _authorizationService.ReadUserChecker();

var types = '\ninterface IUser {\n   id: ID!\n   name: String!\n   role: Role!\n}\ntype User implements IUser {\n   id: ID!\n   email: String!\n   name: String!\n   role: Role!\n   createdAt: String!\n}\ninput UserData {\n   email: String\n   name: String\n   role: ID\n   password: String\n}\ninput PasswordChangeData {\n   password: String\n   new: String\n   confirm: String\n}\n';

var queries = '\ngetAllUsers: [User!]\ngetUser(userId: ID!): User!\n';

var _queriesResolver = {
   Query: {
      getAllUsers: (0, _authorizationService.authorizationMiddleware)(readUser)(function () {
         return (0, _userDbService.findAllUsers)();
      }),
      getUser: (0, _authorizationService.authorizationMiddleware)(readUser.or(_authorizationService.SelfChecker))(function (_, _ref) {
         var userId = _ref.userId;

         return (0, _userDbService.findUserById)(userId);
      })
   }
};

var mutations = '\ncreateUser(userData: UserData): User!\nupdateUser(userData: UserData, userId: ID!): User!\nchangeUserPassword(passwordChangeData: PasswordChangeData, userId: ID!): Boolean!\ndeleteUser(userId: ID!): User!\n';

var _mutationsResolver = {
   Mutation: {
      createUser: (0, _authorizationService.authorizationMiddleware)(createUserRead.and(_authorizationService.WriteUserChecker).and(_authorizationService.ReadRoleChecker))(function (_, _ref2) {
         var userData = _ref2.userData;

         return (0, _userDbService.createUser)(userData);
      }),
      updateUser: (0, _authorizationService.authorizationMiddleware)(updateUserRead.and(_authorizationService.WriteUserChecker).and(_authorizationService.ReadRoleChecker).or(_authorizationService.SelfChecker))(function (_, _ref3, _ref4) {
         var userData = _ref3.userData,
             userId = _ref3.userId;
         var viewer = _ref4.viewer;

         var notSelf = new _authorizationService.NotSelfChecker();
         if (userData.role) {
            return notSelf.check({ userId: userId }, viewer).then(function () {
               return (0, _userDbService.updateUser)(userData, userId);
            }).catch(function (error) {
               if (error.name === "Forbidden") {
                  return new _errorsApi.CustomError("ChangeRoleNotAllowed", {
                     message: "You cannot change the role.",
                     key: "role"
                  });
               } else {
                  return error;
               }
            });
         } else {
            return (0, _userDbService.updateUser)(userData, userId);
         }
      }),
      changeUserPassword: (0, _authorizationService.authorizationMiddleware)(updatePasswordRead.and(_authorizationService.WriteUserChecker).or(_authorizationService.SelfChecker))(function (_, _ref5, context) {
         var passwordChangeData = _ref5.passwordChangeData,
             userId = _ref5.userId;

         return (0, _userDbService.changeUserPassword)(passwordChangeData, userId);
      }),
      deleteUser: (0, _authorizationService.authorizationMiddleware)(deleteUserRead.and(_authorizationService.DeleteUserChecker).and(_authorizationService.NotSelfChecker))(function (_, _ref6) {
         var userId = _ref6.userId;

         return (0, _userDbService.deleteUser)(userId);
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