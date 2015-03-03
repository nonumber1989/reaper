var restify  = require('restify'),
    socketio = require('socket.io'),
    configuration = require('../configuration.json')

var server = restify.createServer();
var io = socketio.listen(server);

server.get('/', function indexHTML(req, res, next) {
    fs.readFile(__dirname + '/index.html', function (err, data) {
        if (err) {
            next(err);
            return;
        }

        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.end(data);
        next();
    });
});


io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

server.listen(configuration.socketIoPort, function () {
    console.log('socket.io server listening at %s', server.url);
});
