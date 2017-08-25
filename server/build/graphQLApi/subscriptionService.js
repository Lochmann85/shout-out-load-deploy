'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.initializeSubscriptionService = exports.subscriptionServer = undefined;

var _graphql = require('graphql');

var _http = require('http');

var _subscriptionsTransportWs = require('subscriptions-transport-ws');

var _executableSchema = require('./schema/executableSchema');

var _executableSchema2 = _interopRequireDefault(_executableSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var subscriptionServer = null;

var initializeSubscriptionService = function initializeSubscriptionService() {
   return new Promise(function (resolve, reject) {

      var WS_IP = process.env.OPENSHIFT_WS_IP || "0.0.0.0",
          WS_PORT = process.OPENSHIFT_WS_PORT || 8000;

      var websocketServer = (0, _http.createServer)(function (request, response) {
         response.writeHead(404);
         response.end();
      });

      exports.subscriptionServer = subscriptionServer = _subscriptionsTransportWs.SubscriptionServer.create({
         schema: _executableSchema2.default.schema,
         execute: _graphql.execute,
         subscribe: _graphql.subscribe
      }, {
         server: websocketServer,
         path: '/graphql'
      });

      websocketServer.listen(WS_PORT, WS_IP, function () {
         console.log('Websocket Server is now running on ws://' + WS_IP + ':' + WS_PORT + '/graphql'); // eslint-disable-line no-console
         resolve();
      });
   });
};

exports.subscriptionServer = subscriptionServer;
exports.initializeSubscriptionService = initializeSubscriptionService;