/**
 * Created by seven on 2015/9/25.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = require("./User");

var OwnBookSchema = new Schema({
    id:String,
    user:{ type: Schema.Types.ObjectId, ref: 'User' },
    description:String,
    ownBooks:[{
        isbn10:String,
        isbn13:String,
        created:Date,
        updated:Date,
        status:String,
        description:String,
        count:Number
    }]
});
mongoose.model('OwnBook', OwnBookSchema);