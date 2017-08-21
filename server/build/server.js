'use strict';

var _graphQLSchemaBuilder = require('./graphQLApi/schema/graphQLSchemaBuilder');

var _graphQLService = require('./graphQLApi/graphQLService');

(0, _graphQLSchemaBuilder.buildSchema)();

(0, _graphQLService.initializeGraphQLService)().catch(function (error) {
  return console.log(error);
});