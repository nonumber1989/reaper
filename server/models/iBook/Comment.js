var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    id: String,
    title: String,
    alt: String,
    author: User,
    book: Book,
    rating: {
        max: Number,
        value: Number,
        min: Number
    },
    votes: Number,
    useless: Number,
    comments: Number,
    summary: String,
    published: Date,
    updated: Date
});
mongoose.model('Comment', CommentSchema);