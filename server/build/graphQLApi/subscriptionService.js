'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.initializeSubscriptionService = exports.subscriptionServer = undefined;

var _graphql = require('graphql');

var _http = require('http');

var _subscriptionsTransportWs = require('subscriptions-transport-ws');

var _graphQLService = require('./graphQLService');

var _executableSchema = require('./schema/executableSchema');

var _executableSchema2 = _interopRequireDefault(_executableSchema);

var _authenticationService = require('./../authenticationApi/authenticationService');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var authenticationMiddleware = new _authenticationService.SubscriptionAuthenticationMiddleware();

var subscriptionServer = null;

/**
 * @public
 * @function initializeSubscriptionService
 * @description Initializes the Subscription server
 * @param {object} serverConfig - configuration of server
 * @returns {Promise} of initialization
 */
var initializeSubscriptionService = function initializeSubscriptionService(serverConfig) {
   return new Promise(function (resolve, reject) {

      var graphQlServer = (0, _http.createServer)(_graphQLService.appServer);

      exports.subscriptionServer = subscriptionServer = _subscriptionsTransportWs.SubscriptionServer.create({
         schema: _executableSchema2.default.schema,
         subscribe: _graphql.subscribe,
         execute: function execute() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
               args[_key] = arguments[_key];
            }

            return authenticationMiddleware.apply(args).then(function (args) {
               return _graphql.execute.apply(undefined, _toConsumableArray(args));
            });
         }
      }, {
         server: graphQlServer,
         path: "/graphql"
      });

      graphQlServer.listen(serverConfig.PORT, function () {
         console.log('WebSocket Server is now running on ws://0.0.0.0:' + serverConfig.PORT + '/graphql'); // eslint-disable-line no-console

         resolve();
      });
   });
};

exports.subscriptionServer = subscriptionServer;
exports.initializeSubscriptionService = initializeSubscriptionService;