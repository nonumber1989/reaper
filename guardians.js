var socketIo = require('socket.io')
var socketioJwt = require("socketio-jwt");
var configuration = require('./configurations/configuration');
var redisClient = require('./configurations/redisClient');
var io = socketIo(configuration.socketIoPort);

io.of('/chat').on('connection', function(socket) {
    console.log('someone connected');
    redisClient.storeClient.smembersAsync("steven").then(function(rooms) {
        rooms.forEach(function(room, index) {
            console.log("index " + index + "---" + room);
            socket.join(room);
            redisClient.subscribeClient.subscribe(room);
        });
    });


    redisClient.storeClient.smembersAsync("patterns").then(function(patterns) {
        patterns.forEach(function(pattern, index) {
            console.log("index " + index + "---" + pattern);
            socket.join(pattern);
            redisClient.subscribeClient.psubscribe(pattern);
        });
    });

    socket.on('room', function(room) {
        socket.join(room);
    });

    socket.on('disconnect', function(room) {
        console.log("here i am disconnect!!!")
    });

});

var room = "theRoom";

redisClient.subscribeClient.on("message", function(channel, message) {
    console.log("socket with redis subscribe" + channel + ": " + message);
    io.nsps['/chat'].in(channel).emit('message', message);
});


redisClient.subscribeClient.on("pmessage", function(pattern, channel, message) {
    console.log("socket with redis subscribe" + channel + ": " + message);
    io.nsps['/chat'].in(pattern).emit('message', channel + "----" + message);
});
