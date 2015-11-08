// loading modules
var express = require('express');
var http = require('http');

// initial server
var server = express();
server.set('port', process.env.PORT || 3000);
server.use(express.static('public'));

// http verbs
server.get('/', function(req, res) {
	res.send('Hello World from GET request.');
});
server.post('/', function(req, res) {
	res.send('Hello world from POST request.');
});
server.put('/user', function(req, res) {
	res.send('Got a PUT request at /user.');
});
server.delete('/user', function(req, res) {
	res.send('Got a DELETE request at /user.');
});

// exception handling
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

// server listen on...
server.listen(server.get('port'), function() {
	console.log('Server started on localhost:' + server.get('port') + '; press Ctrl-C to terminate.');
});