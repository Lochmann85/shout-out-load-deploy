'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _configurations = require('./../configurations');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @public
 * @function ShownShoutsQueue
 * @description class for shown shouts queue
 */
var ShownShoutsQueue = function () {

  /**
   * @public
   * @function constructor
   * @description initializes the array
   * @param {object} pendingShoutsQueue - the queue for the pending shouts
   */
  function ShownShoutsQueue(pendingShoutsQueue) {
    _classCallCheck(this, ShownShoutsQueue);

    this._pendingShoutsQueue = pendingShoutsQueue;
    this._array = new Array(_configurations.MAX_SHOWN_SHOUTS);
  }

  /**
   * @public
   * @function cycle
   * @description cycles the fixed size shown shouts queue
   */


  _createClass(ShownShoutsQueue, [{
    key: 'cycle',
    value: function cycle() {
      var shout = this._pendingShoutsQueue.dequeue();
      this._baseCycle(shout);
    }

    /**
     * @private
     * @function _baseCycle
     * @description the basic cycle functionality
     * @param {object} shout - new entered shout
     */

  }, {
    key: '_baseCycle',
    value: function _baseCycle(shout) {
      this._array.push(shout);
      this._array.shift();
    }

    /**
     * @public
     * @function asArray
     * @description returns the shown shouts as array
     */

  }, {
    key: 'asArray',
    value: function asArray() {
      return this._array;
    }
  }]);

  return ShownShoutsQueue;
}();

;

exports.default = ShownShoutsQueue;