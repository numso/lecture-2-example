/* jshint node:true */
'use strict';

var express = require('express'),
       http = require('http'),
         fs = require('fs'),
       path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);

// all environments
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('6deo89i7u7eo9iue09i7de88a7ieq;k'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.middleware = {};

app.middleware.security = security;

fs.readdirSync('routes').forEach(function (file) {
  require('./routes/' + file)(app);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

function security(req, res, next) {
  if (!req.session.user) {
    res.writeHead(403);
    return res.end();
  }
  next();
}
