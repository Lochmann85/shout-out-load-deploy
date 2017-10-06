'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.initializeGraphQLService = exports.appServer = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _graphqlServerExpress = require('graphql-server-express');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _executableSchema = require('./schema/executableSchema');

var _executableSchema2 = _interopRequireDefault(_executableSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reactAppDirectory = _path2.default.join(__dirname, "..", "..", "..", "client", "build");

var appServer = null;

/**
 * @public
 * @function initializeGraphQLService
 * @description Initializes the GraphQL server on the given port port
 * with 2 urls "/dev_graphql" and "/graphiql"
 * @param {object} serverConfig - configuration of server
 * @returns {Promise} of initialization
 */
var initializeGraphQLService = function initializeGraphQLService(serverConfig) {
   return new Promise(function (resolve, reject) {

      exports.appServer = appServer = (0, _express2.default)();

      // Express only serves static assets in production
      if (process.env.NODE_ENV === "production") {
         appServer.use(_express2.default.static(reactAppDirectory));
      } else {
         appServer.use("/graphiql", (0, _graphqlServerExpress.graphiqlExpress)({
            endpointURL: "/dev_graphql"
         }));

         appServer.use("/dev_graphql", _bodyParser2.default.json(), (0, _graphqlServerExpress.graphqlExpress)(function (request) {
            return {
               schema: _executableSchema2.default.schema,
               context: {}
            };
         }));

         console.log('GraphiQL is now running on http://0.0.0.0:' + serverConfig.PORT + '/graphiql'); // eslint-disable-line no-console
      }

      resolve();
   });
};

exports.appServer = appServer;
exports.initializeGraphQLService = initializeGraphQLService;