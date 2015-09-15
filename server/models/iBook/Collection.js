/**
 * Created by seven on 8/16/2015.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CollectionSchema = new Schema({
    book: String,
    book_id: String,
    comment: String,
    id: String,
    rating: {
        max: Number,
        min:Number,
        value: Number
    },
    status: String,
    tags: [String],
    updated: Date,
    userId: String
});
mongoose.model('Collection', CollectionSchema);