'use strict';

var _configurations = require('./configurations');

var _mongoDbService = require('./mongoDbApi/mongoDbService');

var _storageService = require('./storageApi/storageService');

var _graphQLSchemaBuilder = require('./graphQLApi/schema/graphQLSchemaBuilder');

var _graphQLService = require('./graphQLApi/graphQLService');

var _subscriptionService = require('./graphQLApi/subscriptionService');

var _infiniteTimerService = require('./infiniteTimerApi/infiniteTimerService');

//initializeMongoDb(serverConfig)
//  .then(initializeStoreUpdater)
(0, _graphQLSchemaBuilder.buildSchema)();

(0, _graphQLService.initializeGraphQLService)(_configurations.serverConfig).then(function () {
   return (0, _subscriptionService.initializeSubscriptionService)(_configurations.serverConfig);
}).then(function () {
   return null;
}).catch(function (error) {
   return console.log(error);
});