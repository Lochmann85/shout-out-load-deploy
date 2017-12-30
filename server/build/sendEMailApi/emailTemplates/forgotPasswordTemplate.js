'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _configurations = require('./../../configurations');

/**
 * @public
 * @function forgotPasswordTemplate
 * @description html text for forgot password e-mail template
 * @param {object} user - user to which email is send
 * @returns {function} generates html
 */
exports.default = function (user) {
   var link = _configurations.serverConfig.URL + '/resetPassword/' + user.resetPasswordToken;

   return {
      subject: 'Shout Out Loud forgot password',
      html: '<h3>Hello ' + user.name + '</h3>\n      <p>Reenter the world of thoughts with a new password.</p>\n      <a href="' + link + '">Click the link to change yours!</a>\n      <br />\n      <p>Best regards,<br/>the shout-out-loud-Team</p>'
   };
};