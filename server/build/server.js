'use strict';

var _configurations = require('./configurations');

console.log(_configurations);

var express = require('express'),
   app = express();

app.get('/', function (req, res) {
   res.send("test");
});

// error handling
app.use(function (err, req, res, next) {
   console.error(err.stack);
   res.status(500).send('Something bad happened!');
});

app.listen(_configurations.OPENSHIFT_PORT, _configurations.OPENSHIFT_IP);

module.exports = app;
