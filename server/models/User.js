var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    id: String,
    name: String,
    email: String,
    password: String,
    avatar: {type: String, default: "http:\/\/img3.douban.com\/icon\/u66413679-3.jpg"},
    alt: {type: String, default: "http:\/\/www.douban.com\/people\/nonumber1989\/"},
    created: {type: Date, default: Date.now},
    desc: {type: String, default: "Happy"}
});
mongoose.model('User', UserSchema);