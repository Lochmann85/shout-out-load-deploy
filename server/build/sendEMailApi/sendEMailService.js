'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.initializeEMailTransport = exports.sendEMail = undefined;

var _emailTemplates = require('./emailTemplates');

Object.keys(_emailTemplates).forEach(function (key) {
   if (key === "default" || key === "__esModule") return;
   Object.defineProperty(exports, key, {
      enumerable: true,
      get: function get() {
         return _emailTemplates[key];
      }
   });
});

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _initializeDebugSmtpServer = require('./initializeDebugSmtpServer');

var _initializeDebugSmtpServer2 = _interopRequireDefault(_initializeDebugSmtpServer);

var _errorsApi = require('./../errorsApi');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @private
 * @member _smtpTransporter
 * @description smtp server transporter
 */
var _smtpTransporter = void 0;

/**
 * @private
 * @function _setupSmtpTransporter
 * @description sets up the smtp transporter
 * @param {object} serverConfig - configuration of server
 * @returns {Promise} of setup
 */
var _setupSmtpTransporter = function _setupSmtpTransporter(serverConfig) {
   if (serverConfig.isInProductionMode) {
      _smtpTransporter = _nodemailer2.default.createTransport({
         service: "SendGrid",
         auth: {
            user: serverConfig.SMTP.USER,
            pass: serverConfig.SMTP.PASSWORD
         }
      });
   } else {
      _smtpTransporter = _nodemailer2.default.createTransport({
         service: "SMTP",
         host: serverConfig.SMTP.IP,
         port: serverConfig.SMTP.PORT,
         secure: false,
         auth: {
            user: serverConfig.SMTP.USER,
            pass: serverConfig.SMTP.PASSWORD
         }
      });
   }
};

/**
 * @public
 * @function initializeEMailTransport
 * @description initializes the email transport
 * @param {object} serverConfig - configuration of server
 * @returns {Promise} of initialization
 */
var initializeEMailTransport = function initializeEMailTransport(serverConfig) {
   return new Promise(function (resolve, reject) {
      _setupSmtpTransporter(serverConfig);

      if (!serverConfig.isInProductionMode) {
         (0, _initializeDebugSmtpServer2.default)(serverConfig).then(resolve).catch(reject);
      } else {
         resolve();
      }
   });
};

/**
 * @public
 * @function sendEMail
 * @description sends an email with given type to the user
 * @param {string} emailTemplate - e-mail template, defines the content
 * @param {object} user - user to which e-mail is send
 * @returns {Promise} of send email
 */
var sendEMail = function sendEMail(emailTemplate, user) {
   return new Promise(function (resolve, reject) {
      var email = emailTemplate(user);

      _smtpTransporter.sendMail({
         from: "no-reply@shout-out-loud.com",
         to: user.email,
         replyTo: "no-reply@shout-out-loud.com",
         subject: email.subject,
         text: email.html
      }, function (error, info) {
         if (error) {
            reject(new _errorsApi.InternalServerError({
               message: error.message,
               key: "sendEMail"
            }));
         } else {
            resolve(true);
         }
      });
   });
};

exports.sendEMail = sendEMail;
exports.initializeEMailTransport = initializeEMailTransport;