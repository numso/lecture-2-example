var index = function (req, res) {
  res.writeHead(200);
  res.end('Hello Index!');
};

var secret = function (req, res) {
  res.writeHead(200);
  res.end('SECRETS');
};

var other = function (req, res) {
  res.writeHead(200);
  res.write('Hello Other Thing!\n');
  res.end('You are ' + req.url);
};


var paths = {
  '/': index,
  '/secret': secret,
  '/other': other
};

module.exports = function (req, res, next) {
  if (paths[req.url]) {
    paths[req.url](req, res);
  } else {
    next();
  }
};
