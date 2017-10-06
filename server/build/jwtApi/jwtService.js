'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.createNewToken = exports.validateToken = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _configurations = require('./../configurations');

var _configurations2 = _interopRequireDefault(_configurations);

var _errorsApi = require('./../errorsApi');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @public
 * @function validateToken
 * @description validates the jwt token
 * @param {string} jwtToken - the jwt token
 * @returns {Promise} of decrypted token
 */
var validateToken = function validateToken(jwtToken) {
   return new Promise(function (resolve, reject) {
      _jsonwebtoken2.default.verify(jwtToken, config.JWT_SECRET, function (error, decodedToken) {
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

/**
 * @public
 * @function createNewToken
 * @description creates a new jwt with the encrypted user id
 * @param {object} user - the authenticated user
 * @returns {Promise} of new token
 */
var createNewToken = function createNewToken(user) {
   return new Promise(function (resolve, reject) {
      var encryptedData = {
         userId: user.id
      };
      var options = {
         expiresIn: 60 * 60 * 24 // one day
      };
      _jsonwebtoken2.default.sign(encryptedData, config.JWT_SECRET, options, function (error, jwtToken) {
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

exports.validateToken = validateToken;
exports.createNewToken = createNewToken;