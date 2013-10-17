var request = require('request');
var config  = require('config');

var url = config.url + config.token;

module.exports = function (app) {
  app.post('/upload', uploadMap);
};

function uploadMap(req, res) {
  var map = req.body;

  request({
    method: 'POST',
    url: url,
    json: { map: map }
  }, function (err, resp, body) {
    res.send(body);
  });
}
