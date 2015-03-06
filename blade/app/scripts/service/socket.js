'use strict';
angular.module('bladeApp')
    .factory('chatSocket', function (socketFactory) {
        var socket = socketFactory();
        socket.forward('broadcast');
        return socket;
    });