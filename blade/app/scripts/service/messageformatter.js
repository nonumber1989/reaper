'use strict';

angular.module('bladeApp')
    .value('messageFormatter', function(date, nick, message) {
        return date.toLocaleTimeString() + ' - ' +
            nick + ' - ' +
            message + '\n';

    });