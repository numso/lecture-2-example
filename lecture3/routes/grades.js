module.exports = function (app) {
  app.data = app.data || {};
  app.data.grades = {};

  app.get('/grades', app.middleware.security, getGrades(app));
  app.get('/grades/:name', app.middleware.security, getGrades(app));
  app.post('/grade', app.middleware.security, postGrade(app));
};

function postGrade(app) {
  var grades = app.data.grades;
  return function (req, res) {
    var name = req.session.user.user;
    grades[name] = grades[name] || {};
    grades[name][req.body.id] = req.body.complete == 'true';

    res.send({
      success: true
    });
  };
}

function getGrades(app) {
  var grades = app.data.grades;
  return function (req, res) {
    var name = req.params.name || req.session.user.user;

    res.send({
      success: true,
      grades: grades[name] || {}
    });
  };
}
