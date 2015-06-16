/**
 * Created by steven.xu on 6/8/2015.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DealSchema = new Schema({
    dealNo:String,
    name: String,
    amount:Number,
    checked:Boolean,
    time:Date,
    types:Array
});
mongoose.model('Deal', DealSchema);