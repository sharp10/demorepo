var express = require('express');
var http = require('http');
var fs = require('fs');

var path = require('path');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var constants = require('./config/constants');
var commonFunctions = require('./config/CommonFunctions');
global.app = express();

var port = process.env.PORT || constants.envPort;
var server;

// mongodb mongoose
var mongoose = require("mongoose");
//mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://" + constants.mongo_uri + ":" + constants.mongo_port + "/" + constants.db_name);

// Connection URL
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
// app.use(expressValidator());

var appRoute = require('./routes');
appRoute(app);

server = http.createServer(app).listen(port, function () {
   console.log('Express http server listening on port ' ,port);
});

exports = module.exports = app;