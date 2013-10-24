/* jshint node:true */
// This is an example on how to connect to a database to auth a user.
'use strict';

var express = require('express'),
       http = require('http'),
    request = require('request');

var app = express();

app.set('port', process.env.PORT || process.argv[2] || 3000);

// all environments
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('some-secret-key-goes-here'));
app.use(express.session());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



var couch = {
  host: 'localhost',
  port: 5984,
  db: 'users'
};

var couchPath = 'http://' + couch.host + ':' + couch.port + '/' + couch.db + '/';

app.post('/login', function (req, res) {
  var name = req.body.user;
  var pass = req.body.pass;

  request.get(couchPath + name, function (err, resp, body) {
    if (err) {
      return res.send({ success: false, err: 'user doesnt exist' });
    }

    var user = JSON.parse(body);

    if (pass !== user.pass) {
      return res.send({ success: false, err: 'wrong password' });
    }

    req.session.user = user;

    res.send({ success: true, user: user });
  });
});
