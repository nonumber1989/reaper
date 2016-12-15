var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true
    },
    categoryDescription: String,
    avatar: String,
    createdAt: Date,
    updatedAt: Date
});
mongoose.model('Category', CategorySchema);
