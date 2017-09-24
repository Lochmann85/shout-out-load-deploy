'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.startTimer = undefined;

var _storageService = require('./../storageApi/storageService');

var _configurations = require('./../configurations');

/**
 * @private
 * @function _timeStep
 * @description the time step in which the timer cycles the shown shouts
 */
var _timeStep = function _timeStep() {
   return new Promise(function (resolve, reject) {
      setTimeout(function () {
         _storageService.storeUpdater.update().then(resolve).catch(reject);
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