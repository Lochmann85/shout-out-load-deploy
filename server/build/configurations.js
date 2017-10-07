"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});
var TIMER_INTERVAL = process.env.TIMER_INTERVAL || 7000,
    MAX_SHOWN_SHOUTS = process.env.MAX_SHOWN_SHOUTS || 100,
    GRAPHQL_JWT_SECRET = process.env.GRAPHQL_JWT_SECRET || "development";

var serverConfig = {
   PORT: process.env.PORT || 8000,
   MONGODB_URI: process.env.MONGODB_URI || "mongodb://shout-out-loud:storage@127.0.0.1:27017/solDb"
};

exports.serverConfig = serverConfig;
exports.TIMER_INTERVAL = TIMER_INTERVAL;
exports.MAX_SHOWN_SHOUTS = MAX_SHOWN_SHOUTS;
exports.GRAPHQL_JWT_SECRET = GRAPHQL_JWT_SECRET;