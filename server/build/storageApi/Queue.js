"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @public
 * @function Queue
 * @description base class for a queue
 */
var Queue = function () {

  /**
   * @public
   * @function constructor
   * @description initializes the basic array
   */
  function Queue() {
    _classCallCheck(this, Queue);

    this._array = [];
  }

  /**
   * @public
   * @function enqueu
   * @description enqueues the next item
   * @param {object} item - item to enqueue
   * @returns {object} this
   */


  _createClass(Queue, [{
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
    key: "hasAnItem",


    /**
     * @public
     * @function hasAnItem
     * @description checks if the queue has a new item
     * @returns {bool} true when size is larger then 1
     */
    value: function hasAnItem() {
      return this.size > 0;
    }

    /**
     * @public
     * @function removeItems
     * @description removes all items from the filter function
     * @param {function} filter - filter function to delete shouts from user
     */

  }, {
    key: "removeItems",
    value: function removeItems(filter) {
      this._array = this._array.filter(filter);
    }
  }, {
    key: "size",
    get: function get() {
      return this._array.length;
    }
  }]);

  return Queue;
}();

;

exports.default = Queue;