'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _configurations = require('./../../configurations');

/**
 * @public
 * @function singnupTemplate
 * @description html text for signup template
 * @param {object} accountConfirmation - account confirmation data to which email is send
 * @returns {function} generates html
 */
exports.default = function (accountConfirmation) {
   var link = 'http://' + _configurations.serverConfig.APP_URL + '/signup/' + accountConfirmation.confirmAccountToken;

   return {
      subject: 'Shout Out Loud signup',
      html: '<h3>Hello ' + accountConfirmation.name + '</h3>\n      <p>Begin to shout your thoughts to the world.</p>\n      <a href="' + link + '">Click the link to open your mind!</a>\n      <br />\n      <p>Best regards,<br/>the shout-out-loud-Team</p>'
   };
};