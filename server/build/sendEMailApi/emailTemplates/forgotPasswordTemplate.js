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
      subject: 'WiFli password reset',
      html: '<h3>Hallo ' + user.name + '</h3>\n      <p>Klicken Sie auf den folgenden Link um ihr Password zu \xE4ndern:</p>\n      <a href="' + link + '">Link to reset Password</a>\n      <br />\n      <p>Mit freundlichen Gr\xFC\xDFen,<br/>Ihr Software-Team</p>'
   };
};