/**
 * Created by steven.xu on 6/3/2015.
 */
var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var ProductDetailSchema = new Schema({
    title: String,
    slug: String,
    content: String,
    author: String
});
mongoose.model('ProductDetail', ProductDetailSchema);