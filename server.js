// loading modules
var ip = require('ip');
var express = require('express');
var http = require('http');
var jade = require('jade');

// initial server
var server = express();

server.set('port', process.env.PORT || 3000);
server.use(express.static(__dirname));
server.set('views', 'views');
server.set('view engine', 'jade');

var ip_tmp = "";
var req_counter = 0;

// http verbs
function testEnter(req) {
	req_counter += 1;
	if(ip_tmp != req.ip) {
		ip_tmp = req.ip;
		console.log(ip_tmp + " entered");
	}
}
server.get('/', function(req, res) {
	testEnter(req);
	res.send('Hello World from GET request.');
});

server.get('/index', function(req, res) {
	testEnter(req);
	res.render('index');
})

server.post('/', function(req, res) {
	testEnter(req);
	res.end('Hello World from POST request.');
});

server.put('/user', function(req, res) {
	res.send('Got a PUT request at /user.');
});
server.delete('/user', function(req, res) {
	res.send('Got a DELETE request at /user.');
});

// exception handling
server.use(function(req, res, next) {
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
	console.log('Server started on ' + ip.address() + ':' + server.get('port') + '; press Ctrl-C to terminate.');
	setInterval(function() {
		console.log(req_counter);
	}, 5000);
});