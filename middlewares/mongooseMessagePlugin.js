var storeClient = require('../configurations/redisClient').storeClient;
var subClient = require('../configurations/redisClient').subscribeClient;
var pubClient = require('../configurations/redisClient').publishingClient;

var mongooseMessagePlugin = function(schema, options) {

    schema.post('save', function(document) {
        console.log('%s has been saved', document._id);
        console.log('%s has been saved', document.eventMessage);
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
