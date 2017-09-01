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
    */
   function ShownShoutsQueue() {
      _classCallCheck(this, ShownShoutsQueue);

      this._array = [];
      for (var index = 0; index < _configurations.MAX_SHOWN_SHOUTS; ++index) {
         this._array.push(null);
      }
   }

   /**
    * @public
    * @function cycle
    * @description cycles the fixed size shown shouts queue
    * @param {object} shout - new shout to push front
    */


   _createClass(ShownShoutsQueue, [{
      key: 'cycle',
      value: function cycle(shout) {
         this._array.unshift(shout);
         this._array.pop();
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