"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @public
 * @function BaseQueue
 * @description base class for a queue
 */
var BaseQueue = function () {

  /**
   * @public
   * @function constructor
   * @description initializes the basic array
   */
  function BaseQueue() {
    _classCallCheck(this, BaseQueue);

    this._array = [];
  }

  /**
   * @public
   * @function enqueu
   * @description enqueues the next item
   * @param {object} item - item to enqueue
   * @returns {object} this
   */


  _createClass(BaseQueue, [{
    key: "enqueue",
    value: function enqueue(item) {
      this._array.push(item);
      return this;
    }

    /**
     * @public
     * @function dequeue
     * @description dequeues the first item and shifts the rest
     * @returns {object} the dequeued item
     */

  }, {
    key: "dequeue",
    value: function dequeue() {
      return this._array.shift();
    }

    /**
     * @public
     * @function size
     * @returns {number} the length of the array
     */

  }, {
    key: "size",
    get: function get() {
      return this._array.length;
    }
  }]);

  return BaseQueue;
}();

;

exports.default = BaseQueue;