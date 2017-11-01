'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.NotSelfChecker = exports.SelfChecker = exports.NotOwnRoleChecker = exports.ShoutChecker = exports.DeleteUserChecker = exports.WriteUserChecker = exports.ReadUserChecker = exports.DeleteRoleChecker = exports.WriteRoleChecker = exports.ReadRoleChecker = exports.authorizationMiddleware = undefined;

var _ReadRoleChecker = require('./checker/ReadRoleChecker');

Object.defineProperty(exports, 'ReadRoleChecker', {
   enumerable: true,
   get: function get() {
      return _interopRequireDefault(_ReadRoleChecker).default;
   }
});

var _WriteRoleChecker = require('./checker/WriteRoleChecker');

Object.defineProperty(exports, 'WriteRoleChecker', {
   enumerable: true,
   get: function get() {
      return _interopRequireDefault(_WriteRoleChecker).default;
   }
});

var _DeleteRoleChecker = require('./checker/DeleteRoleChecker');

Object.defineProperty(exports, 'DeleteRoleChecker', {
   enumerable: true,
   get: function get() {
      return _interopRequireDefault(_DeleteRoleChecker).default;
   }
});

var _ReadUserChecker = require('./checker/ReadUserChecker');

Object.defineProperty(exports, 'ReadUserChecker', {
   enumerable: true,
   get: function get() {
      return _interopRequireDefault(_ReadUserChecker).default;
   }
});

var _WriteUserChecker = require('./checker/WriteUserChecker');

Object.defineProperty(exports, 'WriteUserChecker', {
   enumerable: true,
   get: function get() {
      return _interopRequireDefault(_WriteUserChecker).default;
   }
});

var _DeleteUserChecker = require('./checker/DeleteUserChecker');

Object.defineProperty(exports, 'DeleteUserChecker', {
   enumerable: true,
   get: function get() {
      return _interopRequireDefault(_DeleteUserChecker).default;
   }
});

var _ShoutChecker = require('./checker/ShoutChecker');

Object.defineProperty(exports, 'ShoutChecker', {
   enumerable: true,
   get: function get() {
      return _interopRequireDefault(_ShoutChecker).default;
   }
});

var _NotOwnRoleChecker = require('./checker/NotOwnRoleChecker');

Object.defineProperty(exports, 'NotOwnRoleChecker', {
   enumerable: true,
   get: function get() {
      return _interopRequireDefault(_NotOwnRoleChecker).default;
   }
});

var _SelfChecker = require('./checker/SelfChecker');

Object.defineProperty(exports, 'SelfChecker', {
   enumerable: true,
   get: function get() {
      return _interopRequireDefault(_SelfChecker).default;
   }
});

var _NotSelfChecker = require('./checker/NotSelfChecker');

Object.defineProperty(exports, 'NotSelfChecker', {
   enumerable: true,
   get: function get() {
      return _interopRequireDefault(_NotSelfChecker).default;
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