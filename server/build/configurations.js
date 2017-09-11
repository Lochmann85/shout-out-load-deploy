"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});
var TIMER_INTERVAL = 7000,
    MAX_SHOWN_SHOUTS = 100;

var serverConfig = {
   OPENSHIFT_PORT: process.env.OPENSHIFT_NODEJS_PORT || 8080,
   OPENSHIFT_IP: process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0",
   MONGO_DB_URI: process.env.OPENSHIFT_MONGODB_DB_URL || "0.0.0.0"
};

console.log(process.env.DATABASE_SERVICE_NAME);

if (process.env.DATABASE_SERVICE_NAME) {
   var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase();
   serverConfig.MONGO_DB_NAME = process.env[mongoServiceName + "_DATABASE"];
   serverConfig.MONGO_USER_NAME = process.env[mongoServiceName + "_USER"];
   serverConfig.MONGO_USER_PWD = process.env[mongoServiceName + "_PASSWORD"];
} else {
   serverConfig.MONGO_DB_NAME = "sotDb";
   serverConfig.MONGO_USER_NAME = "shout-out-loud";
   serverConfig.MONGO_USER_PWD = "storage";
}

exports.serverConfig = serverConfig;
exports.TIMER_INTERVAL = TIMER_INTERVAL;
exports.MAX_SHOWN_SHOUTS = MAX_SHOWN_SHOUTS;