'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseAuthenticationMiddleware = require('./../BaseAuthenticationMiddleware');

var _BaseAuthenticationMiddleware2 = _interopRequireDefault(_BaseAuthenticationMiddleware);

var _jwtService = require('./../../jwtApi/jwtService');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SubscriptionAuthenticationMiddleware = function (_BaseAuthenticationMi) {
   _inherits(SubscriptionAuthenticationMiddleware, _BaseAuthenticationMi);

   /**
    * @public
    * @function constructor
    * @description constructor for the subscription authentication
    */
   function SubscriptionAuthenticationMiddleware() {
      _classCallCheck(this, SubscriptionAuthenticationMiddleware);

      var _this = _possibleConstructorReturn(this, (SubscriptionAuthenticationMiddleware.__proto__ || Object.getPrototypeOf(SubscriptionAuthenticationMiddleware)).call(this, {
         sendResetPasswordMutation: new _jwtService.GraphQLTokenHandler(), //TODO: needs different token handler
         resetPasswordMutation: new _jwtService.GraphQLTokenHandler(), //TODO: needs different token handler
         signupMutation: new _jwtService.SignupTokenHandler(),
         signupConfirmationQuery: new _jwtService.SignupTokenHandler(),
         default: new _jwtService.GraphQLTokenHandler()
      }));

      _this._notAuthenticatedRequests = [{
         operationName: "shoutsQueueQuery",
         searchString: "getShoutsQueue"
      }, {
         operationName: "currentShoutQuery",
         searchString: "getCurrentShout"
      }, {
         operationName: "shoutsQueueSubscription",
         searchString: "shoutsQueueChanged"
      }, {
         operationName: "loginMutation",
         searchString: "login"
      }, {
         operationName: "signupMutation",
         searchString: "signup"
      }, {
         operationName: "signupConfirmationQuery",
         searchString: "signupConfirmation"
      }, {
         operationName: "sendResetPasswordMutation",
         searchString: "sendResetPassword"
      }, {
         operationName: "resetPasswordMutation",
         searchString: "resetPassword"
      }];
      return _this;
   }

   /**
    * @protected
    * @function _allowedRequests
    * @description check for requests which are allowed when not logged in
    * @param {array} args the args array
    * @returns {bool} true when request is allowed
    */


   _createClass(SubscriptionAuthenticationMiddleware, [{
      key: '_allowedRequests',
      value: function _allowedRequests(args) {
         var _args = _slicedToArray(args, 6),
             schema = _args[0],
             document = _args[1],
             root = _args[2],
             context = _args[3],
             variables = _args[4],
             operation = _args[5]; // eslint-disable-line no-unused-vars

         var foundRequest = false;
         this._notAuthenticatedRequests.forEach(function (allowedRequest) {
            if (operation === allowedRequest.operationName && document.definitions[0].selectionSet.selections[0].name.value === allowedRequest.searchString) {
               foundRequest = true;
            }
         });
         return foundRequest;
      }

      /**
       * @protected
       * @function _getTokenHandlerFromRequest
       * @description gets the encrypted token from the input and the token mapping
       * @param {array} args the args array
       * @param {object} tokenHandlerMap the token handler mapping
       * @returns {bool} true when request is allowed
       */

   }, {
      key: '_getTokenHandlerFromRequest',
      value: function _getTokenHandlerFromRequest(args, tokenHandlerMap) {
         var _args2 = _slicedToArray(args, 6),
             schema = _args2[0],
             document = _args2[1],
             root = _args2[2],
             context = _args2[3],
             variables = _args2[4],
             operation = _args2[5]; // eslint-disable-line no-unused-vars

         var tokenHandler = tokenHandlerMap[operation];
         if (tokenHandler) {
            return tokenHandler;
         } else {
            return tokenHandlerMap.default;
         }
      }

      /**
       * @protected
       * @function _getEncryptedToken
       * @description gets the encrypted token from the input
       * @param {array} args the args array
       * @returns {string} jwt token
       */

   }, {
      key: '_getEncryptedToken',
      value: function _getEncryptedToken(args) {
         var _args3 = _slicedToArray(args, 6),
             schema = _args3[0],
             document = _args3[1],
             root = _args3[2],
             context = _args3[3],
             variables = _args3[4],
             operation = _args3[5]; // eslint-disable-line no-unused-vars


         return variables && variables.token ? variables.token : undefined;
      }

      /**
       * @protected
       * @function _addContext
       * @description adds the viewer to the args for the next steps
       * @param {array} args the args array
       * @param {object} additionalContext the context to add
       */

   }, {
      key: '_addContext',
      value: function _addContext(args, additionalContext) {
         var _args4 = _slicedToArray(args, 6),
             schema = _args4[0],
             document = _args4[1],
             root = _args4[2],
             context = _args4[3],
             variables = _args4[4],
             operation = _args4[5]; // eslint-disable-line no-unused-vars


         Object.assign(context, additionalContext);
      }
   }]);

   return SubscriptionAuthenticationMiddleware;
}(_BaseAuthenticationMiddleware2.default);

exports.default = SubscriptionAuthenticationMiddleware;