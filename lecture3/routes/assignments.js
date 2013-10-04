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
    // TODO:: Return a list of homework
  };
}

function postHW(app) {
  var hw = app.data.hw;
  return function (req, res) {
    // TODO:: Add homework to the hw array
  };
}

function deleteHW(app) {
  var hw = app.data.hw;
  return function (req, res) {
    // TODO:: Delete homework from the hw array
  };
}
