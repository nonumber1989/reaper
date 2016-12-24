var storeClient = require('../configurations/redisClient').storeClient;
var subClient = require('../configurations/redisClient').subscribeClient;
var pubClient = require('../configurations/redisClient').publishingClient;

var mongooseMessagePlugin = function(schema, options) {
    function getEvenetMessage(document) {
        var collectionName = document.collection.name;
        var eventMessage = {};
        switch (collectionName) {
            case 'categories':
                eventMessage.namespace = document.namespace;
                eventMessage.content = document.eventIdentifier;
                break;
            case 'channels':
                eventMessage.namespace = document.namespace;
                eventMessage.content = document.eventIdentifier;
                break;
            case 'topics':
                eventMessage.namespace = document.namespace;
                eventMessage.content = document.eventIdentifier;
                break;
            default:
                break;
        }
        return eventMessage;

    }
    schema.post('save', function(document) {
        console.log('%s has been saved', document._id);
        var eventMessage = getEvenetMessage(document);

        storeClient.saddAsync(eventMessage.namespace, eventMessage.content).then(function(count) {
            pubClient.publish(eventMessage.namespace, eventMessage.content + " has been created!");
        });

    });

    schema.post('remove', function(document) {
        if (document) {
            console.log('%s has been removed', document._id);
        }
    });

    schema.post('update', function(document) {
        console.log('%s has been updated', document._id);
    });

    schema.post('findOneAndUpdate', function(document) {
        if (document) {
            console.log('%s has been updated', document._id);
        }
    });

    schema.post('findOneAndRemove', function(document) {
        if (document) {
            console.log('%s has been finded and removed', document._id);
        }
    });

}

module.exports = mongooseMessagePlugin;
