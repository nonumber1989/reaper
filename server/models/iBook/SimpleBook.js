/**
 * Created by seven on 2015/9/22.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SimpleBookSchema = new Schema({
    id: String,
    alt:String,
    image:String,
    isbn10: String,
    isbn13: String,
    title:String,
    author:[String],
    translator:[String],
    status:String,
    startTime:Date,
    endTime:Date
});
mongoose.model('SimpleBook', SimpleBookSchema);
