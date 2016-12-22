var mongooseMessagePlugin = function (schema, options) {

    schema.post('save', function(document) {
        console.log('%s has been saved', document._id);
    });

    schema.post('remove', function(document) {
        console.log('%s has been removed', document._id);
    });

    schema.post('update', function(document) {
        console.log('%s has been updated', document._id);
    });

    schema.post('findOneAndUpdate', function(document) {
        console.log('%s has been updated', document._id);
    });

    schema.post('findOneAndRemove', function(document) {
        console.log('%s has been updated', document._id);
    });

}

module.exports = mongooseMessagePlugin;