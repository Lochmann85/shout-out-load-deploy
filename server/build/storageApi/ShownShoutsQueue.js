'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Configurations = require('./../Configurations');

var _Configurations2 = _interopRequireDefault(_Configurations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @public
 * @function ShownShoutsQueue
 * @description class for shown shouts queue
 */
var ShownShoutsQueue = function () {
   function ShownShoutsQueue(pendingShoutsQueue) {
      _classCallCheck(this, ShownShoutsQueue);

      this._pendingShoutsQueue = pendingShoutsQueue;
      this._array = new Array(_Configurations2.default.MAX_SHOWN_SHOUTS);
   }

   _createClass(ShownShoutsQueue, [{
      key: 'cycle',
      value: function cycle() {
         var shout = this._pendingShoutsQueue.dequeue();
         this._baseCycle(shout);
      }
   }, {
      key: '_baseCycle',
      value: function _baseCycle(shout) {
         this._array.push(shout);
         this._array.shift();
      }
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