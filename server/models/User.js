var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    id: String,
    name: String,
    email: String,
    password: String,
    avatar: String,
    alt: String,
    created: Date,
    desc: String
});
mongoose.model('User', UserSchema);