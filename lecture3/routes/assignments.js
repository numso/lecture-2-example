module.exports = function (app) {
  app.data = app.data || {};
  app.data.hw = [];

  app.get('/hw', app.middleware.security, getHW(app));
  app.post('/hw', app.middleware.security, postHW(app));
  app.delete('/hw', app.middleware.security, deleteHW(app));
};

function getHW(app) {
  var hw = app.data.hw;
  return function (req, res) {
    // timeout to simulate async
    setTimeout(function () {
      res.send({
        success: true,
        hw: hw
      });
    }, 200);
  };
}

function postHW(app) {
  var hw = app.data.hw;
  return function (req, res) {
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
  };
}

function deleteHW(app) {
  var hw = app.data.hw;
  return function (req, res) {
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
  };
}
