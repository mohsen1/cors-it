var app = require('express')();
var request = require('request');
var port = process.env.PORT || 3000;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', function(req, res, next) {

  if (req.query.url) {
    request.get(req.query.url)
    .on('error', console.log)
    .on('response', function (response) {

      // delete 'access-control-allow-origin' header to make sure response doesn't have CORS limits
      delete response.headers['access-control-allow-origin'];
    })
    .pipe(res);

  } else {
    res.send('please specify url query param');
  }
});

app.listen(port, console.log);