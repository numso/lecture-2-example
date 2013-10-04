var http = require('http');

var dep = require('./dep.js');

var server = http.createServer(function (req, res) {
  dep(req, res, function () {
    res.writeHead(418);
    res.end(418 + ': ' + http.STATUS_CODES[418]);
  })
});

server.listen(3000);
