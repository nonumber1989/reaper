/**
 * Created by seven on 8/16/2015.
 */
/**
 * Created by seven on 8/16/2015.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    id: String,
    loc_id: String,
    name: String,
    avatar: String,
    alt: String,
    relation: String,
    created: Date,
    loc_id: Number,
    loc_name: String,
    desc: String
});
mongoose.model('User', UserSchema);