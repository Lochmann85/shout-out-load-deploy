'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _smtpServer = require('smtp-server');

/**
 * @public
 * @function initializeDebugSmtpServer
 * @description initializes the debug smtp server
  * @param {object} serverConfig - configuration of server
* @returns {Promise} of initialization
 */
var initializeDebugSmtpServer = function initializeDebugSmtpServer(serverConfig) {
   return new Promise(function (resolve, reject) {
      var server = new _smtpServer.SMTPServer({
         allowInsecureAuth: true,
         disabledCommands: ["STARTTLS"],
         onData: function onData(stream, session, callback) {
            stream.pipe(process.stdout);
            stream.on('end', callback);
         },
         onAuth: function onAuth(auth, session, callback) {
            return callback(null, { user: "debug" });
         }
      });
      server.listen(serverConfig.SMTP.PORT, function () {
         console.log('Debug Smtp Server is now running on ' + serverConfig.SMTP.IP + ':' + serverConfig.SMTP.PORT); // eslint-disable-line no-console
         resolve();
      });
   });
};

exports.default = initializeDebugSmtpServer;