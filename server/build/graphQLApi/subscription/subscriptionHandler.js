'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlSubscriptions = require('graphql-subscriptions');

var subscriptionHandler = new _graphqlSubscriptions.PubSub();

exports.default = subscriptionHandler;