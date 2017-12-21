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
      IP: process.env.SMTP_SERVER || "localhost",
      PORT: process.env.SMTP_PORT || "8025",
      USER: process.env.SENDGRID_USERNAME || "smtpUser",
      PASSWORD: process.env.SENDGRID_PASSWORD || "pwd",
      API_KEY: process.env.SENDGRID_API_KEY || "api_key"
   }
};

exports.serverConfig = serverConfig;
exports.TIMER_INTERVAL = TIMER_INTERVAL;
exports.MAX_SHOWN_SHOUTS = MAX_SHOWN_SHOUTS;
exports.GRAPHQL_JWT_SECRET = GRAPHQL_JWT_SECRET;
exports.SIGNUP_JWT_SECRET = SIGNUP_JWT_SECRET;