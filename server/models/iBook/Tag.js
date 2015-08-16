/**
 * Created by seven on 8/16/2015.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TagSchema = new Schema({
    count: Number,
    title: String
});
mongoose.model('Tag', TagSchema);