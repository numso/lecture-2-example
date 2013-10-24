/* jshint node:true */
'use strict';

var express = require('express'),
       http = require('http'),
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

// -+-+-+-+- Authentication -+-+-+-+-+-+-+-+-+-+-+-+-+-+-

var users = {};

app.post('/signup', function (req, res) {
  if (users[req.body.user]) {
    return res.send({
      success: false,
      err: 'Username is already taken.'
    });
  }

  users[req.body.user] = {
    user: req.body.user,
    pass: req.body.pass,
    isTeacher: req.body.isTeacher == 'true'
  };

  req.session.user = users[req.body.user];

  res.send({
    success: true,
    user: req.session.user
  });
});

app.post('/login', function (req, res) {
  if (!users[req.body.user]) {
    return res.send({
      success: false,
      err: 'Username does\'t exist.'
    });
  }

  if (users[req.body.user].pass !== req.body.pass) {
    return res.send({
      success: false,
      err: 'Invalid Password.'
    });
  }

  req.session.user = users[req.body.user];

  res.send({
    success: true,
    user: req.session.user
  });
});

app.get('/user', security, function (req, res) {
  res.send({
    success: true,
    user: req.session.user
  });
});

app.post('/logout', function (req, res) {
  req.session.destroy();
  res.send('ok');
});

// -+-+-+-+- Assignments -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

var hw = [];
var grades = {};

app.get('/hw', security, function (req, res) {
  setTimeout(function () {
    res.send({
      success: true,
      hw: hw
    });
  }, 200);
});

app.post('/hw', security, function (req, res) {
  var id = Math.floor(Math.random() * 999999);
  hw.push({
    name: req.body.name,
    dueDate: req.body.dueDate,
    id: id
  });

  res.send({
    success: true,
    id: id
  });
});

app.delete('/hw', security, function (req, res) {
  for (var i = 0; i < hw.length; ++i) {
    if (hw[i].id == req.body.id) {
      hw.splice(i, 1);
      return res.send({ success: true });
    }
  }
  res.send({
    success: false,
    err: 'Couldn\'t find that hw.'
  });
});

app.get('/students', security, function (req, res) {
  var arr = [];
  for (var i = 0; i < users.length; ++i) {
    if (!users[i].isTeacher) {
      arr.push(users[i]);
    }
  }
  res.send({
    success: true,
    students: arr
  });
});

app.get('/grades', security, getGrades);
app.get('/grades/:name', security, getGrades);

app.post('/grade', security, function (req, res) {
  var name = req.session.user.user;
  grades[name] = grades[name] || {};
  grades[name][req.body.id] = req.body.complete == 'true';

  res.send({
    success: true
  });
});

function getGrades(req, res) {
  var name = req.params.name || req.session.user.user;

  res.send({
    success: true,
    grades: grades[name] || {}
  });
}
