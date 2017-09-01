'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.addResolversTo = exports.subscriptions = exports.mutations = exports.queries = exports.types = undefined;

var _graphqlTools = require('graphql-tools');

var _storageApi = require('./../../../storageApi');

var _shoutApi = require('./../../../shoutApi');

var _subscriptionHandler = require('./../../../graphQLApi/subscription/subscriptionHandler');

var _subscriptionHandler2 = _interopRequireDefault(_subscriptionHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var types = '\ntype Shout {\n   message: String!\n   type: String!\n}\ninput ShoutInput {\n   message: String\n}\n';

var queries = '\ngetShoutsQueue: [Shout]!\ngetCurrentShout: Shout\n';

var _queriesResolver = {
   Query: {
      getShoutsQueue: function getShoutsQueue() {
         return _storageApi.shownShoutsQueue.asArray();
      },
      getCurrentShout: function getCurrentShout() {
         return _storageApi.currentShownShout;
      }
   }
};

var mutations = '\npushShout(shout: ShoutInput!): Boolean\n';

var _mutationsResolver = {
   Mutation: {
      pushShout: function pushShout(_, _ref) {
         var shout = _ref.shout;

         return new Promise(function (resolve, reject) {
            if (shout && shout.message) {
               _storageApi.pendingShoutsQueue.enqueue(new _shoutApi.CustomShout(shout));
               resolve(true);
            } else {
               reject('Please enter a message');
            }
         });
      }
   }
};

var subscriptions = '\nshoutsQueueChanged: [Shout]!\ncurrentShoutChanged: Shout\n';

var _subscriptionResolver = {
   Subscription: {
      shoutsQueueChanged: {
         resolve: function resolve(payload) {
            return payload.asArray();
         },
         subscribe: function subscribe() {
            return _subscriptionHandler2.default.asyncIterator("shoutsQueueChangedChannel");
         }
      },
      currentShoutChanged: {
         resolve: function resolve(payload) {
            return payload;
         },
         subscribe: function subscribe() {
            return _subscriptionHandler2.default.asyncIterator("currentShoutChangedChannel");
         }
      }
   }
};

/**
 * @public
 * @function addResolversTo
 * @description adds the resolvers to the executable schema
 * @param {any} executableSchema - the executable schema
 */
var addResolversTo = function addResolversTo(executableSchema) {
   (0, _graphqlTools.addResolveFunctionsToSchema)(executableSchema, _queriesResolver);
   (0, _graphqlTools.addResolveFunctionsToSchema)(executableSchema, _mutationsResolver);
   (0, _graphqlTools.addResolveFunctionsToSchema)(executableSchema, _subscriptionResolver);
};

exports.types = types;
exports.queries = queries;
exports.mutations = mutations;
exports.subscriptions = subscriptions;
exports.addResolversTo = addResolversTo;