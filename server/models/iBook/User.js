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
    userId: String,
    name: String,
    avatar: String,
    alt: String,
    relation: contact,
    created: Date,
    locationId: Number,
    locationName: String,
    desc: String
});
mongoose.model('User', UserSchema);