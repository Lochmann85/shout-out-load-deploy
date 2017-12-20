'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.continueWithHashedPassword = undefined;

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SALT_ROUNDS = 10;

/**
 * @public
 * @function continueWithHashedPassword
 * @description hashes the passwor dand continues
 * @param {function} next - next step in pre mongoose middleware
 * @param {object} user - user object
 * @returns {Promise} of hash action
 */
var continueWithHashedPassword = function continueWithHashedPassword(next, user) {
   return _bcrypt2.default.hash(user.password, SALT_ROUNDS).then(function (hashedPassword) {
      user.password = hashedPassword;
      next();
   }).catch(function (error) {
      next(error);
   });
};

exports.continueWithHashedPassword = continueWithHashedPassword;