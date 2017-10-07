"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _errorsApi = require("./../errorsApi");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseAuthenticationMiddleware = function () {

   /**
    * @public
    * @function constructor
    * @description constructor for the base authentication
    * @param {object} tokenHandler - the token handler object
    */
   function BaseAuthenticationMiddleware(tokenHandler) {
      _classCallCheck(this, BaseAuthenticationMiddleware);

      this._tokenHandler = tokenHandler;
   }

   /**
    * @public
    * @function apply
    * @description checks for the token in the variable and executes the graphql call
    * if no token is present allows just allowed Requests
    * @param {array} args the args array
    * @returns {Promise} of executed graphql schema
    */


   _createClass(BaseAuthenticationMiddleware, [{
      key: "apply",
      value: function apply(args) {
         var _this = this;

         return new Promise(function (resolve, reject) {
            var encryptedToken = _this._getEncryptedToken(args);
            if (encryptedToken) {
               _this._tokenHandler.validate(encryptedToken).then(function (knownViewer) {
                  _this._addContext(args, {
                     viewer: knownViewer,
                     tokenHandler: _this._tokenHandler
                  });
                  resolve(args);
               }).catch(reject);
            } else {
               try {
                  if (_this._allowedRequests(args)) {
                     _this._addContext(args, {
                        tokenHandler: _this._tokenHandler
                     });
                     resolve(args);
                  } else {
                     reject(new _errorsApi.UnauthorizedError());
                  }
               } catch (error) {
                  reject(new _errorsApi.ForbiddenError());
               }
            }
         });
      }

      /**
       * @protected
       * @function _allowedRequests
       * @description check for requests which are allowed when not logged in
       * @param {array} args the args array
       * @returns {bool} true when request is allowed
       */

   }, {
      key: "_allowedRequests",
      value: function _allowedRequests(args) {
         throw new Error("FATAL ERROR: BaseAuthenticationMiddleware inherited class needs to implements _allowedRequests.");
      }

      /**
       * @protected
       * @function _getEncryptedToken
       * @description gets the encrypted token from the input
       * @param {array} args the args array
       * @returns {string} jwt token
       */

   }, {
      key: "_getEncryptedToken",
      value: function _getEncryptedToken(args) {
         throw new Error("FATAL ERROR: BaseAuthenticationMiddleware inherited class needs to implements _getEncryptedToken.");
      }

      /**
       * @protected
       * @function _addContext
       * @description adds the viewer to the args for the next steps
       * @param {array} args the args array
       * @param {object} context the context to add
       */

   }, {
      key: "_addContext",
      value: function _addContext(args, context) {
         throw new Error("FATAL ERROR: BaseAuthenticationMiddleware inherited class needs to implements _addContext.");
      }
   }]);

   return BaseAuthenticationMiddleware;
}();

;

exports.default = BaseAuthenticationMiddleware;