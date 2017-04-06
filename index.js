var app = require('express')();
var request = require('request');
var port = process.env.PORT || 3000;
var urlparam = process.env.URLPARAM || 'url';

app.use(function (req, res, next) {
	var data='';
	req.setEncoding('utf8');
	req.on('data', function(chunk) {
		data += chunk;
	});

	req.on('end', function() {
		req.body = data;
		next();
	});
});

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	if(req.header()) {
	} else {
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	}
	next();
});

app.options('*', function (req, res) {
	res.send();
});

app.use(function (req, res, next) {
	if (req.query[urlparam]) {
		var options = {
			url: req.query[urlparam],
			method: req.method,
			headers: req.headers,
			qs: req.query
		};
		if (['PUT', 'POST', 'PATCH'].indexOf(req.method) > -1) {
			options.body = req.body;
		}
		delete options.qs[urlparam];
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
