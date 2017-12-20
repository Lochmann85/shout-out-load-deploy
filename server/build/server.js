'use strict';

var _configurations = require('./configurations');

var _mongoDbService = require('./mongoDbApi/mongoDbService');

var _storageService = require('./storageApi/storageService');

var _graphQLSchemaBuilder = require('./graphQLApi/schema/graphQLSchemaBuilder');

var _graphQLService = require('./graphQLApi/graphQLService');

var _subscriptionService = require('./graphQLApi/subscriptionService');

var _sendEMailService = require('./sendEMailApi/sendEMailService');

var _infiniteTimerService = require('./infiniteTimerApi/infiniteTimerService');

(0, _mongoDbService.initializeMongoDb)(_configurations.serverConfig).then(_storageService.initializeStoreUpdater).then(_graphQLSchemaBuilder.buildSchema).then(function () {
   return (0, _graphQLService.initializeGraphQLService)(_configurations.serverConfig);
}).then(function () {
   return (0, _subscriptionService.initializeSubscriptionService)(_configurations.serverConfig);
}).then(function () {
   return (0, _sendEMailService.initializeEMailTransport)(_configurations.serverConfig);
}).then(function () {
   return (0, _infiniteTimerService.startTimer)();
}).catch(function (error) {
   return console.log(error);
});