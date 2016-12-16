var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    namespace: {
        type: String,
        required: true
    },
    categoryName: {
        type: String,
        required: true
    },
    description: String,
    avatar: String,
    createdAt: Date,
    updatedAt: Date
});

CategorySchema.index({ namespace: 1, categoryName: 1 }, { unique: true });

mongoose.model('Category', CategorySchema);
