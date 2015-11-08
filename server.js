var express = require('express');
var http = require('http');

var server = express();
server.set('port', process.env.PORT || 3000);

server.get('/', function(req, res) {
	res.type('text/html');
	res.send('<h1> Hello World</h1>');
});

server.use(function(req, res) {
	res.type('text/html');
	res.status(404);
	res.send('<h1>404 - Not Found</h1>');
});

server.use(function(err, req, res, next) {
	console.log(err.stack);
	res.type('text/html');
	res.status(500);
	res.send('<h1>500 - SERVER ERROR</h1>');
});

server.listen(server.get('port'), function() {
	console.log('Server started on localhost:' + server.get('port') + '; press Ctrl-C to terminate.');
});