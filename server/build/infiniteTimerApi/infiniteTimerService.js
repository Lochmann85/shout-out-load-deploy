'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.startTimer = undefined;

var _subscriptionHandler = require('./../graphQLApi/subscription/subscriptionHandler');

var _subscriptionHandler2 = _interopRequireDefault(_subscriptionHandler);

var _storageApi = require('./../storageApi');

var _configurations = require('./../configurations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @private
 * @function _timeStep
 * @description the time step in which the timer cycles the shown shouts
 */
var _timeStep = function _timeStep() {
   return new Promise(function (resolve, reject) {
      setTimeout(function () {
         _storageApi.shownShoutsQueue.cycle();

         _subscriptionHandler2.default.publish("shoutsQueueChangedChannel", _storageApi.shownShoutsQueue);

         resolve();
      }, _configurations.TIMER_INTERVAL);
   });
};

/**
 * @public
 * @function startTimer
 * @description starts the timer for reading the values
 */
var startTimer = function startTimer() {
   return _timeStep().then(function () {
      return startTimer();
   });
};

exports.startTimer = startTimer;