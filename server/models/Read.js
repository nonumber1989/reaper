/**
 * Created by seven on 2015/9/25.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ReadSchema = new Schema({
    id: String,
    description: String,
    readBooks: [
        {
            id: String,
            title: String,
            description: String,
            access: String,
            updated: Date,
            created: Date,
            bookCount: Number,
            booksLastUpdated: Date,
            status: String
        }
    ]

});
mongoose.model('Read', ReadSchema);