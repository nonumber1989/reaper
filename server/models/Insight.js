/**
 * Created by seven on 2015/9/28.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = require("./User");

var InsightSchema = new Schema({
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
    }],
    readBooks: [
        {
            title: String,
            description: String,
            updated: Date,
            created: Date,
            bookCount: Number,
            booksLastUpdated: Date,
            status: String
        }
    ],
    borrowBooks:[{
        isbn10:String,
        isbn13:String,
        created:Date,
        updated:Date,
        status:String,
        description:String,
        count:Number,
        borrower:{type: Schema.Types.ObjectId, ref: 'User'}
    }]
});
mongoose.model('Insight', InsightSchema);