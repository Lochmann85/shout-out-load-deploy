"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseChecker = function () {
   function BaseChecker() {
      _classCallCheck(this, BaseChecker);

      this._next = null;
      this._relation = null;
   }

   /**
    * @private
    * @function _and
    * @description and combines two checker
    * @param {object} args - the args of the request
    * @param {object} viewer - the user model of the viewer
    * @returns {Promise} of permission
    */


   _createClass(BaseChecker, [{
      key: "_and",
      value: function _and(args, viewer) {
         var _this = this;

         return this._internalCheck(args, viewer).then(function () {
            return _this._next.check(args, viewer);
         });
      }

      /**
       * @public
       * @function and
       * @description and setter for the succeeding checker
       * @param {object} successor - the next checker
       */

   }, {
      key: "and",
      value: function and(successor) {
         this._next = successor;
         this._relation = this._and;
      }

      /**
       * @private
       * @function check
       * @description starts the check for the authorization
       * @param {object} args - the args of the request
       * @param {object} viewer - the user model of the viewer
       * @returns {Promise} of permission
       */

   }, {
      key: "check",
      value: function check(args, viewer) {
         if (this._next) {
            return this._relation(args, viewer);
         } else {
            return this._internalCheck(args, viewer);
         }
      }

      /**
       * @protected
       * @function _internalCheck
       * @description the internal check of the inherited class
       * @param {object} args - the args of the request
       * @param {object} viewer - the user model of the viewer
       * @returns {Promise} of permission
       */

   }, {
      key: "_internalCheck",
      value: function _internalCheck(args, viewer) {
         throw new Error("FATAL ERROR: inherited class needs to implement _internalCheck.");
      }
   }]);

   return BaseChecker;
}();

;

exports.default = BaseChecker;