var app = require('express')();
var bodyParser = require('body-parser');
var request = require('request');
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
});

app.options('*', function (req, res) {
	res.send();
});

app.use(function (req, res, next) {
	if (req.query.url) {
		var options = {
			url: req.query.url,
			method: req.method,
			headers: req.headers,
			qs: req.query
		};
		if (['PUT', 'POST', 'PATCH'].indexOf(req.method) > -1) {
			options.body = JSON.stringify(req.body);
		}
		delete options.qs.url;
		delete options.headers.host;
		delete options.headers.origin;
		request(options)
			.on('error', console.log)
			.on('response', function (response) {
				console.log('----------------');
				console.log('HEADERS');
				console.log('----------------');
				console.log(response.headers);
				console.log('----------------');
				console.log('STATUS CODE: ', response.statusCode);
				console.log('----------------');
				console.log('STATUS MESSAGE', response.statusMessage);
				console.log('----------------');
			})
			.pipe(res);
	}
});

app.listen(port, console.log);
