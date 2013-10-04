module.exports = function (app) {
  app.get('/students', app.middleware.security, students(app));
};

function students(app) {
  var users = app.data.users;
  return function (req, res) {
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
  };
}
