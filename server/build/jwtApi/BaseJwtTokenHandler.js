'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _errorsApi = require('./../errorsApi');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseJwtTokenHandler =

/**
 * @public
 * @function constructor
 * @description constructor of base jwt token handler
 * @param {String} secret 
 * @param {String} expirationTime 
 */
function BaseJwtTokenHandler(secret, expirationTime) {
   var _this = this;

   _classCallCheck(this, BaseJwtTokenHandler);

   this.validate = function (encryptedJwtToken) {
      return new Promise(function (resolve, reject) {
         _jsonwebtoken2.default.verify(encryptedJwtToken, _this._secret, function (error, decodedToken) {
            if (!error) {
               resolve(decodedToken);
            } else {
               if (error.name === "TokenExpiredError") {
                  reject(new _errorsApi.UnauthorizedError());
               } else {
                  reject(new _errorsApi.InternalServerError({
                     message: error.message,
                     key: "JWT_ERROR"
                  }));
               }
            }
         });
      });
   };

   this.encrypt = function (user) {
      return new Promise(function (resolve, reject) {
         var encryptedData = {
            userId: user.id
         };
         var options = {
            expiresIn: _this._expirationTime //60 * 60 * 24 // one day
         };
         _jsonwebtoken2.default.sign(encryptedData, _this._secret, options, function (error, jwtToken) {
            if (!error) {
               resolve(jwtToken);
            } else {
               reject(new _errorsApi.InternalServerError({
                  message: error.message,
                  key: "JWT_ERROR"
               }));
            }
         });
      });
   };

   this._secret = secret;
   this._expirationTime = expirationTime;
}

/**
 * @public
 * @function validate
 * @description validates the jwt token
 * @param {string} encryptedJwtToken - the encrypted jwt token
 * @returns {Promise} of decrypted token
 */


/**
 * @public
 * @function encrypt
 * @description encrypts the current jwt with the user id
 * @param {object} user - the authenticated user
 * @returns {Promise} of new token
 */
;

;

exports.default = BaseJwtTokenHandler;