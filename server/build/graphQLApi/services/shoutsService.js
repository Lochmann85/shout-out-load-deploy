'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.addResolversTo = exports.subscriptions = exports.mutations = exports.queries = exports.types = undefined;

var _graphqlTools = require('graphql-tools');

var _storageService = require('./../../storageApi/storageService');

var _shoutDbService = require('./../../mongoDbApi/services/shout/shoutDbService');

var _authorizationService = require('./../../authorizationApi/authorizationService');

var _subscriptionHandler = require('./../../graphQLApi/subscription/subscriptionHandler');

var _subscriptionHandler2 = _interopRequireDefault(_subscriptionHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shout = new _authorizationService.ShoutChecker();

var types = '\ntype Shout {\n   id: ID!\n   message: String!\n   type: String!\n   user: User!\n   createdAt: String!\n}\ninput ShoutInput {\n   message: String\n}\n';

var queries = '\ngetShoutsQueue: [Shout]!\ngetCurrentShout: Shout\n';

var _queriesResolver = {
   Query: {
      getShoutsQueue: function getShoutsQueue() {
         return (0, _shoutDbService.findAllShouts)();
      },
      getCurrentShout: function getCurrentShout() {
         return _storageService.storeUpdater.getCurrentShownShout();
      }
   }
};

var mutations = '\npushShout(shout: ShoutInput): Boolean\n';

var _mutationsResolver = {
   Mutation: {
      pushShout: (0, _authorizationService.authorizationMiddleware)(shout)(function (_, _ref, _ref2) {
         var shout = _ref.shout;
         var viewer = _ref2.viewer;

         shout.user = viewer.id;
         return _storageService.storeUpdater.enqueue(shout);
      })
   }
};

var subscriptions = '\nshoutsQueueChanged: [Shout]!\ncurrentShoutChanged: Shout\n';

var _subscriptionResolver = {
   Subscription: {
      shoutsQueueChanged: {
         resolve: function resolve(payload) {
            return payload;
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