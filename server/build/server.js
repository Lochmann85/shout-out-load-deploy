'use strict';

var _configurations = require('./configurations');

var _mongoDbService = require('./mongoDbApi/mongoDbService');

var _graphQLSchemaBuilder = require('./graphQLApi/schema/graphQLSchemaBuilder');

var _graphQLService = require('./graphQLApi/graphQLService');

var _subscriptionService = require('./graphQLApi/subscriptionService');

var _infiniteTimerService = require('./infiniteTimerApi/infiniteTimerService');

try {
   (0, _mongoDbService.initializeMongoDb)(_configurations.serverConfig);
} catch (error) {
   console.log(error);
}
//    .then(
(0, _graphQLSchemaBuilder.buildSchema)();
// .then(() => {
(0, _graphQLService.initializeGraphQLService)(_configurations.serverConfig).then(function () {
   return (0, _subscriptionService.initializeSubscriptionService)(_configurations.serverConfig);
}).then(function () {
   return (0, _infiniteTimerService.startTimer)();
}).catch(function (error) {
   return console.log(error);
});