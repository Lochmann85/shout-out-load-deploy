'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _subscriptionHandler = require('./../graphQLApi/subscription/subscriptionHandler');

var _subscriptionHandler2 = _interopRequireDefault(_subscriptionHandler);

var _shoutApi = require('./../shoutApi');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StoreUpdater = function () {
   function StoreUpdater(pendingShoutsQueue, shownShoutsQueue, currentShownShout) {
      _classCallCheck(this, StoreUpdater);

      this._pendingShoutsQueue = pendingShoutsQueue;
      this._shownShoutsQueue = shownShoutsQueue;
      this._currentShownShout = currentShownShout;
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
         var _this = this;

         return new Promise(function (resolve, reject) {
            if (_this._pendingShoutsQueue.hasAnItem()) {
               if (_this._currentShownShout.shouldBeShown()) {
                  _this._shownShoutsQueue.cycle(_this._currentShownShout);
                  _subscriptionHandler2.default.publish("shoutsQueueChangedChannel", _this._shownShoutsQueue);
               }
               _this._currentShownShout = _this._pendingShoutsQueue.dequeue();
               _subscriptionHandler2.default.publish("currentShoutChangedChannel", _this._currentShownShout);
            } else {
               if (_this._currentShownShout.shouldBeShown()) {
                  _this._shownShoutsQueue.cycle(_this._currentShownShout);
                  _subscriptionHandler2.default.publish("shoutsQueueChangedChannel", _this._shownShoutsQueue);

                  _this._currentShownShout = new _shoutApi.EmptyShout();
                  _subscriptionHandler2.default.publish("currentShoutChangedChannel", _this._currentShownShout);
               }
            }
            resolve();
         });
      }
   }]);

   return StoreUpdater;
}();

;

exports.default = StoreUpdater;