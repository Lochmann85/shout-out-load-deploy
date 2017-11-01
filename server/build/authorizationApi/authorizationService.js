'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.ReadRoleChecker = exports.authorizationMiddleware = undefined;

var _ReadRoleChecker = require('./checker/ReadRoleChecker');

Object.defineProperty(exports, 'ReadRoleChecker', {
   enumerable: true,
   get: function get() {
      return _interopRequireDefault(_ReadRoleChecker).default;
   }
});

var _errorsApi = require('./../errorsApi');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @public
 * @function authorizationMiddleware
 * @description middleware to check the authorization
 * @param {object} allowance - the needed allowance
 * @param {function} wrappedResolver - the wrapped resolver function
 * @returns {Promise} of executed graphQL resolver
 */
var authorizationMiddleware = function authorizationMiddleware(allowance) {
   return function (wrappedResolver) {
      return function (_, args, context, info) {
         if (context && context.viewer) {
            return context.viewer.check(allowance, args).then(function () {
               return wrappedResolver(_, args, context, info);
            });
         } else {
            return Promise.reject(new _errorsApi.UnauthorizedError());
         }
      };
   };
};

exports.authorizationMiddleware = authorizationMiddleware;