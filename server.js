var express = require('express'),
	app = express(),
	http = require('http').Server(app),
	io = require('socket.io')(http),
	path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/node', express.static(path.join(__dirname, '/node_modules')));

/*app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/views/index.html');
});*/

app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

io.on('connection', function (socket) {
	console.log('a user connected');
	socket.on('disconnect', function () {
		console.log('user disconnected');
	});
	socket.on('chat message', function (userName, msg) {
		console.log('message: ' + msg);
		var wordArray = msg.split(' ');
		socket.broadcast.emit('chat message', userName, msg, wordArray);
	});
});

http.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});



