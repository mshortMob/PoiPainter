var app = require('express')(),
	    server = require('http').createServer(app),
	        io = require('socket.io').listen(server),
		    fs = require('fs');

server.listen(3000);

app.get('/', function (req, res) {
	    res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
	    socket.on('render-frame', function (err, data) {
	       		if (err) return console.error(err);
   				console.log(data.toString());
		        data.file = data.file.split(',')[1]; // Get rid of the data:image/png;base64 at the beginning of the file data
			    var buffer = new Buffer(data.file, 'base64');
				fs.writeFile(__dirname + '/tmp/frame-' + data.frame + '.png', buffer.toString('binary'), 'binary');
		});
});
