var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    id: String,
    isbn10: String,
    isbn13: String,
    title: String,
    origin_title: String,
    alt_title: String,
    subtitle: String,
    url: String,
    alt: String,
    image: String,
    images: {
        small: String,
        large: String,
        medium: String
    },
    author: [String],
    translator: [String],
    publisher: String,
    pubdate: String,
    rating: {max: Number, numRaters: Number, average: Number, min: Number},
    tags: [
        {count: Number, name: String}
    ],
    binding: String,
    price: Number,
    series: {
        id: String,
        title: String
    },
    pages: Number,
    author_intro: String,
    summary: String,
    catalog: String,
    ebook_url: String,
    ebook_price: Number
});
mongoose.model('Book', BookSchema);
