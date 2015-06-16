/**
 * Created by steven.xu on 6/3/2015.
 */
var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var ConfigurationSchema = new Schema({
    id: String,
    language: String
});
mongoose.model('Configuration', ConfigurationSchema);