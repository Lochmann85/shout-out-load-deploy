"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseShout = function () {
   function BaseShout(message, type) {
      _classCallCheck(this, BaseShout);

      this._message = message;
      this._type = type;
   }

   _createClass(BaseShout, [{
      key: "shouldBeShown",


      /**
       * @public
       * @function shouldBeShown
       * @description states if the shout should be shown
       * @returns {bool} true when shown
       */
      value: function shouldBeShown() {
         throw new Error("FATAL ERROR:  Shout of type \"" + this._type + "\" needs to implement the shouldBeShown function");
      }
   }, {
      key: "message",
      get: function get() {
         return this._message;
      }
   }, {
      key: "type",
      get: function get() {
         return this._type;
      }
   }, {
      key: "messsage",
      set: function set(message) {
         this._message = message;
      }
   }]);

   return BaseShout;
}();

;

exports.default = BaseShout;