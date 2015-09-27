var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = require("./User");

var CommentSchema = new Schema({
    text: {type: String, default: "Happy"},
    author: {type: String, default: "nonumber1989"}
});
mongoose.model('Comment', CommentSchema);