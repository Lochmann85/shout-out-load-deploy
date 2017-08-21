'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.initializeGraphQLService = exports.graphQLServer = undefined;

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

var OPENSHIFT_PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    OPENSHIFT_IP = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

var graphQLServer = null;

/**
 * @public
 * @function initializeGraphQLService
 * @description Initializes the GraphQL server on the given port port
 * with 2 urls "/graphql" and "/graphiql"
 * @returns {Promise} of initialization
 */
var initializeGraphQLService = function initializeGraphQLService() {
   return new Promise(function (resolve, reject) {

      exports.graphQLServer = graphQLServer = (0, _express2.default)();

      var GRAPHQL_PORT = void 0;

      // Express only serves static assets in production
      if (process.env.NODE_ENV === 'production') {
         GRAPHQL_PORT = OPENSHIFT_PORT;
         console.log("production");
         graphQLServer.use(_express2.default.static(reactAppDirectory));
      } else {
         console.log("develop");
         GRAPHQL_PORT = 3001;
      }

      graphQLServer.use('/graphql', _bodyParser2.default.json(), (0, _graphqlServerExpress.graphqlExpress)(function (request) {
         return {
            schema: _executableSchema2.default.schema,
            context: {}
         };
      }));

      graphQLServer.use('/graphiql', (0, _graphqlServerExpress.graphiqlExpress)({
         endpointURL: '/graphql'
      }));

      graphQLServer.listen(GRAPHQL_PORT, OPENSHIFT_IP, function () {
         console.log('GraphQL Server is now running on http://' + OPENSHIFT_IP + ':' + GRAPHQL_PORT + '/graphql'); // eslint-disable-line no-console
         resolve();
      });
   });
};

exports.graphQLServer = graphQLServer;
exports.initializeGraphQLService = initializeGraphQLService;