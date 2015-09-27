/**
 * Created by seven on 2015/9/25.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = require("./User");

var ReadBookSchema = new Schema({
    id: String,
    user:{ type: Schema.Types.ObjectId, ref: 'User' },
    description: String,
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
    ]

});
mongoose.model('ReadBook', ReadBookSchema);