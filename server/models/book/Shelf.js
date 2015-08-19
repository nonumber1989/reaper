/**
 * Created by seven on 8/19/2015.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ShelfSchema = new Schema({
    id: String,
    title: String,
    description:String,
    access: String,
    updated: Date,
    created: Date,
    bookCount: Number,
    booksLastUpdated: Date
});
mongoose.model('Shelf', ShelfSchema);