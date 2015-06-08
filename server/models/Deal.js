/**
 * Created by steven.xu on 6/8/2015.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DealSchema = new Schema({
    dealName: String,
    password: String
});
mongoose.model('Deal', DealSchema);