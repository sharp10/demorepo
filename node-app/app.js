var express = require('express');
var http = require('http');
var fs = require('fs');

var path = require('path');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var constants = require('./config/constants');
global.app = express();

// mongodb mongoose
var mongoose = require("mongoose");
//mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://" + constants.mongo_uri + ":" + constants.mongo_port + "/" + constants.db_name);

app.use('/', express.static(path.join( __dirname,'./public')));
app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();

    // var NodeSession = require('node-session');
 
    // // init
    // session = new NodeSession({secret: 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD'});
    
    // // start session for an http request - response
    // // this will define a session property to the request object
    // session.startSession(req, res)

});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(expressValidator({
  customValidators: {
      notEquals: function (param, num) {
          return param != num;
      }
  }
}));

var appRoute = require('./routes');
appRoute(app);

app.all('/*', function(req, res) {
  res.sendFile(path.join( __dirname, './public/index.html'));
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log('App listening on port ' + port + '!'))