'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Queue = require('./Queue');

var _Queue2 = _interopRequireDefault(_Queue);

var _subscriptionHandler = require('./../graphQLApi/subscription/subscriptionHandler');

var _subscriptionHandler2 = _interopRequireDefault(_subscriptionHandler);

var _models = require('./../mongoDbApi/models');

var _shoutDbService = require('./../mongoDbApi/services/shout/shoutDbService');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StoreUpdater = function () {
   function StoreUpdater(pendingShoutsQueue) {
      var _this = this;

      _classCallCheck(this, StoreUpdater);

      this.enqueue = function (shoutData) {
         return (0, _shoutDbService.createShout)(shoutData).then(function (createdShout) {
            return _this._pendingShoutsQueue.enqueue(createdShout);
         });
      };

      this.getCurrentShownShout = function () {
         return _this._currentShownShout;
      };

      this.removeShoutsOfUser = function (userId) {
         if (_this._currentShownShout.user == userId) {
            // eslint-disable-line eqeqeq
            _this._currentShownShout = _models.shoutModel.getEmptyShout();
         }
         _this._pendingShoutsQueue.removeItems(function (item) {
            return item.user != userId;
         }); // eslint-disable-line eqeqeq
      };

      this._pendingShoutsQueue = new _Queue2.default();
      this._currentShownShout = _models.shoutModel.getEmptyShout();
   }

   /**
    * @public
    * @function update
    * @description updates the store of the shouts. Looks for new shouts and adds them to the queue if possible
    * @returns {Promise} of updating
    */


   _createClass(StoreUpdater, [{
      key: 'update',
      value: function update() {
         var _this2 = this;

         return new Promise(function (resolve, reject) {
            if (_this2._pendingShoutsQueue.hasAnItem()) {
               if (_this2._currentShownShout.shouldBeShown) {
                  _subscriptionHandler2.default.publish("shoutsQueueChangedChannel", (0, _shoutDbService.cycle)(_this2._currentShownShout));
               }
               _this2._currentShownShout = _this2._pendingShoutsQueue.dequeue();
               _subscriptionHandler2.default.publish("currentShoutChangedChannel", _this2._currentShownShout);
            } else {
               if (_this2._currentShownShout.shouldBeShown) {
                  _subscriptionHandler2.default.publish("shoutsQueueChangedChannel", (0, _shoutDbService.cycle)(_this2._currentShownShout));

                  _this2._currentShownShout = _models.shoutModel.getEmptyShout();
               }
            }
            resolve();
         });
      }

      /**
       * @public
       * @function enqueue
       * @description enqueues the next shout
       * @param {object} shoutData - shout to enqueue
       * @returns {Promise} pending shout queue
       */


      /**
       * @public
       * @function getCurrentShownShout
       * @description getter for the current shown shout skeleton
       * @returns {object} current shown shout
       */


      /**
       * @public
       * @function removeShoutsOfUser
       * @description removes all pending shouts of user
       * @param {string} userId - user id
       */

   }]);

   return StoreUpdater;
}();

;

exports.default = StoreUpdater;