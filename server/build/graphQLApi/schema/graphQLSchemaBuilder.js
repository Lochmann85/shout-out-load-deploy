'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.buildSchema = exports.graphQLServices = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _graphqlTools = require('graphql-tools');

var _schema = require('./schema');

var _resolvers = require('./resolvers');

var _resolvers2 = _interopRequireDefault(_resolvers);

var _executableSchema = require('./executableSchema');

var _executableSchema2 = _interopRequireDefault(_executableSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @public
 * @member graphQLServices
 * @description all graphql services
 */
var graphQLServices = {};

/**
 * @private
 * @function _requireAllGraphQLServices
 * @description loops through directory and requires all folders
 */
var _requireAllGraphQLServices = function _requireAllGraphQLServices() {
   var searchPatch = __dirname + '/../services';

   var directories = _fs2.default.readdirSync(searchPatch).filter(function (file) {
      return _fs2.default.statSync(searchPatch + '/' + file).isDirectory();
   });

   directories.forEach(function (graphQLService) {
      graphQLServices[graphQLService] = require(searchPatch + '/' + graphQLService);
   });
};

/**
 * @private
 * @function _replaceNeedlesInSchema
 * @description replaces the needles in the schema string
 */
var _replaceNeedlesInSchema = function _replaceNeedlesInSchema() {
   var types = "",
       queries = "",
       mutations = "",
       subscriptions = "";
   Object.keys(graphQLServices).forEach(function (graphQLService) {
      if (graphQLServices[graphQLService].types) {
         types += graphQLServices[graphQLService].types;
      }
      if (graphQLServices[graphQLService].queries) {
         queries += graphQLServices[graphQLService].queries;
      }
      if (graphQLServices[graphQLService].mutations) {
         mutations += graphQLServices[graphQLService].mutations;
      }
      if (graphQLServices[graphQLService].subscriptions) {
         subscriptions += graphQLServices[graphQLService].subscriptions;
      }
   });

   var typeDefinitions = (0, _schema.typeDefinitionsTemplate)(types, queries, mutations, subscriptions);

   _schema.schema[0] = typeDefinitions;
};

/**
 * @private
 * @function _buildExecutableSchema
 * @description creates the executable schema
 */
var _buildExecutableSchema = function _buildExecutableSchema() {
   var executableSchema = (0, _graphqlTools.makeExecutableSchema)({
      typeDefs: _schema.schema,
      resolvers: _resolvers2.default
   });

   Object.keys(graphQLServices).forEach(function (graphQLService) {
      graphQLServices[graphQLService].addResolversTo(executableSchema);
   });

   _executableSchema2.default.schema = executableSchema;
};

/**
 * @public
 * @function buildSchema
 * @description builds the graphql schema
 */
var buildSchema = function buildSchema() {
   _requireAllGraphQLServices();

   _replaceNeedlesInSchema();

   _buildExecutableSchema();
};

exports.graphQLServices = graphQLServices;
exports.buildSchema = buildSchema;