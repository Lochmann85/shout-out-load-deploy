'use strict';

var _graphQLSchemaBuilder = require('./graphQLApi/schema/graphQLSchemaBuilder');

var _graphQLService = require('./graphQLApi/graphQLService');

var _subscriptionService = require('./graphQLApi/subscriptionService');

var serverConfig = {
   OPENSHIFT_PORT: process.env.OPENSHIFT_NODEJS_PORT || 8080,
   OPENSHIFT_IP: process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0"
};

(0, _graphQLSchemaBuilder.buildSchema)().then(function () {
   return (0, _graphQLService.initializeGraphQLService)(serverConfig);
}).then(function () {
   return (0, _subscriptionService.initializeSubscriptionService)(serverConfig);
}).catch(function (error) {
   return console.log(error);
});