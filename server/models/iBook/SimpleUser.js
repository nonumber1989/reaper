/**
 * Created by seven on 8/16/2015.
 */
/**
 * Created by seven on 8/16/2015.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SimpleUserSchema = new Schema({
    id: String,
    name: String,
    userId: String,
    alt: String,
    avatar: String
});
mongoose.model('SimpleUser', SimpleUserSchema);