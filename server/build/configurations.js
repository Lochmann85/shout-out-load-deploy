"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});
var TIMER_INTERVAL = process.env.TIMER_INTERVAL || 7000,
    MAX_SHOWN_SHOUTS = process.env.MAX_SHOWN_SHOUTS || 100,
    GRAPHQL_JWT_SECRET = process.env.GRAPHQL_JWT_SECRET || "development",
    SIGNUP_JWT_SECRET = process.env.SIGNUP_JWT_SECRET || "signup";

var serverConfig = {
   PORT: process.env.PORT || 8000,
   MONGODB_URI: process.env.MONGODB_URI || "mongodb://shout-out-loud:storage@127.0.0.1:27017/solDb",
   isInProductionMode: process.env.NODE_ENV === "production",
   SMTP: {
      IP: process.env.MAILGUN_SMTP_SERVER || "localhost",
      PORT: process.env.MAILGUN_SMTP_PORT || "8025",
      USER: process.env.MAILGUN_SMTP_LOGIN || "smtpUser",
      PASSWORD: process.env.MAILGUN_SMTP_PASSWORD || "pwd"
   }
};

exports.serverConfig = serverConfig;
exports.TIMER_INTERVAL = TIMER_INTERVAL;
exports.MAX_SHOWN_SHOUTS = MAX_SHOWN_SHOUTS;
exports.GRAPHQL_JWT_SECRET = GRAPHQL_JWT_SECRET;
exports.SIGNUP_JWT_SECRET = SIGNUP_JWT_SECRET;