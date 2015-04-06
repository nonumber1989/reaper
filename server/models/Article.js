var mongoose = require("mongoose");
var Schema   = mongoose.Schema;
var Comment = require("./Comment");

//var SongSchema = mongoose.model('Comment').schema;

var ArticleSchema = new Schema({
    title: String,
    slug: String,
    content: String,
    author: String,
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});
mongoose.model('Article', ArticleSchema);