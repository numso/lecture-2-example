module.exports = function (app) {
  app.data = app.data || {};
  app.data.users = {};

  app.post('/signup', signup(app));
  app.post('/login', login(app));
  app.get('/user', app.middleware.security, user);
  app.post('/logout', logout);
};

function signup(app) {
  var users = app.data.users;
  return function (req, res) {
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
  };
}

function login(app) {
  var users = app.data.users;
  return function (req, res) {
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
  };
}

function user(req, res) {
  res.send({
    success: true,
    user: req.session.user
  });
};

function logout(req, res) {
  req.session.destroy();
  res.send('ok');
};
