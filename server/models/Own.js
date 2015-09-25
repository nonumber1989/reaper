/**
 * Created by seven on 2015/9/25.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var OwnSchema = new Schema({
    id:String,
    description:String,
    ownBooks:[{
        id:String,
        isbn10:String,
        isbn13:String,
        created:Date,
        updated:Date,
        status:String,
        userId:String,
        description:String,
        count:Number
    }]
});
mongoose.model('Own', OwnSchema);