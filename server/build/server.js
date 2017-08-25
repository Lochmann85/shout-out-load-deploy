'use strict';

var _graphQLSchemaBuilder = require('./graphQLApi/schema/graphQLSchemaBuilder');

var _graphQLService = require('./graphQLApi/graphQLService');

var _subscriptionService = require('./graphQLApi/subscriptionService');

(0, _graphQLSchemaBuilder.buildSchema)().then(function () {
   return (0, _graphQLService.initializeGraphQLService)();
}).then(function () {
   return (0, _subscriptionService.initializeSubscriptionService)();
}).catch(function (error) {
   return console.log(error);
});