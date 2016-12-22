var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    namespace: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    avatar: String
}, { timestamps: true });
CategorySchema.timestamps = true;
CategorySchema.index({ namespace: 1, name: 1 }, { unique: true });

CategorySchema.post('save', function(category) {
    console.log('%s has been saved', category._id);
});

CategorySchema.post('remove', function(category) {
    console.log('%s has been removed', category._id);
});

CategorySchema.post('update', function(category) {
    console.log('%s has been updated', category._id);
});

CategorySchema.post('findOneAndUpdate', function(category) {
    console.log('%s has been updated', category._id);
});

CategorySchema.post('findOneAndRemove', function(category) {
    console.log('%s has been updated', category._id);
});

mongoose.model('Category', CategorySchema);
