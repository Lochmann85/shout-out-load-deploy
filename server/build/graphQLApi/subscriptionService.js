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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
         execute: _graphql.execute,
         subscribe: _graphql.subscribe
      }, {
         server: graphQlServer,
         path: "/graphql"
      });

      graphQlServer.listen(serverConfig.OPENSHIFT_PORT, serverConfig.OPENSHIFT_IP, function () {
         console.log('WebSocket Server is now running on http://' + serverConfig.OPENSHIFT_IP + ':' + serverConfig.OPENSHIFT_PORT + '/graphql'); // eslint-disable-line no-console

         resolve();
      });
   });
};

exports.subscriptionServer = subscriptionServer;
exports.initializeSubscriptionService = initializeSubscriptionService;